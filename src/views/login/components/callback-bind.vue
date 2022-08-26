<template>
  <Form
    ref="formCom"
    :validation-schema="mySchema"
    autocomplete="off"
    class="dianshang-form"
    v-slot="{ errors }"
  >
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="dianshang-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          v-model="form.mobile"
          name="mobile"
          class="input"
          type="text"
          :class="{ err: errors.mobile }"
          placeholder="绑定的手机号"
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
    <a @click="submit" href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from 'qc';
import { reactive, ref, onUnmounted } from 'vue';
import { Form, Field } from 'vee-validate';
import schema from '@/utils/vee-validate-schema';
import { useIntervalFn } from '@vueuse/core';
import { userQQBindCode, userQQBindLogin } from '@/api/user';
import Message from '@/components/library/Message';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  name: 'CallbackBind',
  components: { Form, Field },
  props: {
    unionId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // 1. 准备下信息：unionId(openId) qq头像 昵称
    // 2. 完成表单校验
    // 3. 发送验证吗（校验，定义api，调用，完成倒计时）
    // 4. 进行绑定（绑定成功就是登录成功）
    const nickname = ref('null');
    const avatar = ref('null');
    if (QC.Login.check()) {
      QC.api('get_user_info').success((res) => {
        avatar.value = res.data.figureurl_qq_1;
        nickname.value = res.data.nickname;
      });
    }
    // 表单数据对象
    const form = reactive({
      mobile: null,
      code: null,
    });
    // 校验规则对象
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code,
    };
    // 发送短信验证码
    // pause 暂停 resume 开始
    // useIntervalFn(回调函数,执行间隔,是否立即开启)
    // formCom 绑定表单数据
    const formCom = ref(null);
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
    // 1.1 绑定发送验证码按钮点击事件
    // 1.2 校验手机号，如果成功才去发送短信（定义API），请求成功开启60s的倒计时，不能再次点击，倒计时结束恢复
    // 1.3 如果失败，失败的校验样式显示出来
    const send = async () => {
      const valid = mySchema.mobile(form.mobile);
      if (valid === true) {
        // 通过
        if (time.value === 0) {
          // 没有倒计时才可以发送
          await userQQBindCode(form.mobile);
          Message({ type: 'success', text: '发送成功' });
          time.value = 60;
          resume();
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid);
      }
    };
    // 立即绑定
    const store = useStore();
    const router = useRouter();
    const submit = async () => {
      const valid = await formCom.value.validate();
      if (valid) {
        // 实现和之前登录一样的逻辑
        // 1. 存储用户信息
        try {
          let data = null;
          data = await userQQBindLogin({
            unionId: props.unionId,
            mobile: form.mobile,
            code: form.code,
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
          store.dispatch('cart/mergeCart').then(() => {
            // 2. 跳转到来源页或者首页
            router.push(store.state.user.redirectUrl);
            // 3. 成功提示
            Message({ type: 'success', text: 'QQ绑定成功' });
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
        // userQQBindLogin({
        //   unionId: props.unionId,
        //   mobile,
        //   code,
        // })
        //   .then((data) => {
        //     // 实现和之前登录一样的逻辑
        //     // 1. 存储用户信息
        //     const { id, account, avatar, mobile, nickname, token } =
        //       data.result;
        //     store.commit("user/setUser", {
        //       id,
        //       account,
        //       avatar,
        //       mobile,
        //       nickname,
        //       token,
        //     });
        //     router.push(store.state.user.redirectUrl);
        //     // 3. 成功提示
        //     Message({ type: "success", text: "QQ绑定成功" });
        //   })
        //   .catch((e) => {
        //     Message({ type: "error", text: "绑定失败" });
        //   });
      }
    };
    return { nickname, avatar, form, mySchema, formCom, send, time, submit };
  },
};
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
