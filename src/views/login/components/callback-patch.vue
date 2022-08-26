<template>
  <Form
    ref="formCom"
    :validation-schema="mySchema"
    v-slot="{ errors }"
    class="dianshang-form"
    autocomplete="off"
  >
    <div class="dianshang-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field
          v-model="form.account"
          name="account"
          :class="{ err: errors.account }"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div v-if="errors.account" class="error">{{ errors.account }}</div>
    </div>
    <div class="dianshang-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          v-model="form.mobile"
          name="mobile"
          :class="{ err: errors.mobile }"
          class="input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="dianshang-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          v-model="form.code"
          name="code"
          class="input"
          type="text"
          :class="{ err: errors.code }"
          placeholder="短信验证码"
        />
        <span @click="send" class="code">{{
          time === 0 ? "发送验证码" : `${time}几秒后发送`
        }}</span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <div class="dianshang-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          v-model="form.password"
          name="password"
          :class="{ err: errors.password }"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
    </div>
    <div class="dianshang-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          v-model="form.rePassword"
          name="rePassword"
          :class="{ err: errors.rePassword }"
          class="input"
          type="password"
          placeholder="请确认密码"
        />
      </div>
      <div v-if="errors.rePassword" class="error">{{ errors.rePassword }}</div>
    </div>
    <a href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate';
import { ref, reactive, onUnmounted } from 'vue';
import schema from '@/utils/vee-validate-schema';
import { userQQPatchCode, userQQPatchLogin } from '@/api/user';
import { useIntervalFn } from '@vueuse/core';
import Message from '@/components/library/Message';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  name: 'CallbackPatch',
  props: {
    unionId: {
      type: String,
      default: '',
    },
  },
  components: { Form, Field },
  setup(props) {
    // 1. 表单校验 多两个校验：用户名是否存在，再次输入密码是否一致
    // 表单数据对象
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null,
    });
    // 表单校验规则
    const mySchema = {
      account: schema.accountApi,
      mobile: schema.mobile,
      code: schema.code,
      password: schema.password,
      rePassword: schema.rePassword,
    };
    // formCom 绑定表单数据
    const formCom = ref(null);
    // 2. 发送短信验证码：接口API定义
    // pause 暂停 resume 开始
    // useIntervalFn(回调函数,执行间隔,是否立即开启)
    const time = ref(0);
    const { pause, resume } = useIntervalFn(
      () => {
        if (time.value > 0) {
          time.value--;
        }
        if (time.value <= 0) {
          pause();
        }
      },
      1000,
      false
    );
    onUnmounted(() => {
      pause();
    });
    // 1. 发送验证码
    // 1.1 验证码按钮绑定事件
    // 1.2 校验手机号如果成功发送短信，请求成功 60s 倒计时，不可再次点击，倒计时结束后再次点击
    // 1.3 如果失败，显示校验失败
    const send = async () => {
      const valid = mySchema.mobile(form.mobile);
      if (valid === true) {
        console.log(time.value);
        // 通过
        if (time.value === 0) {
          // 没有倒计时才可以发送
          await userQQPatchCode(form.mobile);
          Message({ type: 'success', text: '发送成功' });
          time.value = 60;
          resume();
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid);
      }
    };
    // 3. 完善信息
    const store = useStore();
    const router = useRouter();
    const submit = async () => {
      const valid = await formCom.value.validate();
      if (valid) {
        try {
          let data = null;
          data = await userQQPatchLogin({
            unionId: props.unionId,
            mobile: form.mobile,
            code: form.code,
            account: form.account,
            password: form.password,
            rePassword: form.rePassword,
          });
          console.log(data);
          // 实现和之前登录一样的逻辑
          // 1. 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result;
          store.commit('user/setUser', {
            id,
            account,
            avatar,
            mobile,
            nickname,
            token,
          });
          // 2. 跳转到来源页或者首页
          store.dispatch('cart/mergeCart').then(() => {
            // 2. 跳转到来源页或者首页
            router.push(store.state.user.redirectUrl);
            // 3. 成功提示
            Message({ type: 'success', text: 'QQ完善信息成功' });
          });
        } catch (e) {
          // 失败提示
          if (e.response.data) {
            Message({
              type: 'error',
              text: e.response.data.message || '登录失败',
            });
          }
        }

        //   userQQPatchLogin({
        //     unionId: props.unionId,
        //     ...form,
        //   })
        //     .then((data) => {
        //       // 实现和之前登录一样的逻辑
        //       // 1. 存储用户信息
        //       const { id, account, avatar, mobile, nickname, token } =
        //         data.result;
        //       store.commit("user/setUser", {
        //         id,
        //         account,
        //         avatar,
        //         mobile,
        //         nickname,
        //         token,
        //       });
        //       store.dispatch("cart/mergeCart").then(() => {
        //         // 2. 跳转到来源页或者首页
        //         router.push(store.state.user.redirectUrl);
        //         // 3. 成功提示
        //         Message({ type: "success", text: "QQ完善信息成功" });
        //       });
        //     })
        //     .catch((e) => {
        //       Message({ type: "error", text: "完善信息失败" });
        //     });
      }
    };
    return { form, mySchema, formCom, time, send, submit };
  },
};
</script>

<style scoped lang='less'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 100px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
