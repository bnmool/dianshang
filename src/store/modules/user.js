// 用户模块
export default {
    namespaced: true,
    state: () => {
        return {
            // 用户信息
            profile: {
                id: '',
                avatar: '',
                nickname: '',
                account: '',
                mobile: '',
                token: ''
            },
            // 登录后回跳路径
            redirectUrl: '/'
        }
    },
    mutations: {
        // 修改用户信息 payload 就是用户信息对象
        setUser(state, userDate) {
            state.profile = userDate;
        },
        setRedirectUrl(state, url) {
            state.redirectUrl = url
        }
    }
};
