<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i>{{ profile.account }}</a
            >
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><router-link to="/login">请先登录</router-link></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a @click="submit">解除绑定</a></li>
        <li><a @click="chakanxinxi">查看绑定手机号</a></li>
        <li>
          <a @click="submit2" href="javascript:;"
            ><i class="iconfont icon-phone"></i>手机版</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { ref } from 'vue';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { userDelete, userQQLogin } from '@/api/user';
import Message from '@/components/library/Message';
import QC from 'qc';
export default {
  name: 'AppTopnav',
  setup() {
    // 获取用户的登录信息才能控制切换导航菜单
    const store = useStore();
    // vuex 中的 state 需要设置计算属性才可以完成响应式
    const profile = computed(() => {
      return store.state.user.profile;
    });
    // 退出登录
    // 1. 清空本地存储信息和 vuex 的用户信息
    // 2. 跳转到登录页面
    const router = useRouter();
    const logout = () => {
      store.commit('user/setUser', {});
      router.push('/login');
    };
    // 查看绑定信息
    const unionId = ref(null);
    const chakanxinxi = () => {
      if (QC.Login.check()) {
        // 第三方唯一标识
        QC.Login.getMe((openId) => {
          unionId.value = openId;
          // 请求后台做QQ登录
          userQQLogin(openId).then((data) => {
            // 登录成功：data.result 用户信息
            // 1. 存储用户信息
            const { id, account, avatar, mobile, nickname, token } =
              data.result;
            console.log(mobile);
            store.commit('user/setUser', {
              id,
              account,
              avatar,
              mobile,
              nickname,
              token,
            });
            Message({ type: 'success', text: `手机号:${mobile}` });
          });
        });
      }
    };
    // 解除绑定
    const submit2 = () => {
      const mobile = '13666666666';
      userDelete({ mobile });
    };
    return { profile, logout, submit2, chakanxinxi };
  },
};
</script>
<style scoped lang="less">
.app-topnav {
  background: #f5f5f5;
  box-shadow: 0 0 0.125rem 0 rgba(0, 0, 0, 0.6);
  ul {
    display: flex;
    height: 3.3rem;
    justify-content: flex-end;
    align-items: center;
    width: 54%;
    li {
      margin: 0;
      a {
        padding: 0 0.9rem;
        color: @textColor;
        line-height: 1.3rem;
        text-align: center;
        display: inline-block;
        i {
          font-size: 0.875rem;
          margin-right: 0.125rem;
        }
        &:hover {
          color: @blueColor;
        }
      }
      ~ li {
        a {
          border-left: 0.1rem solid rgb(228, 228, 228);
        }
      }
    }
  }
}
</style>
