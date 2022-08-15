// 定义校验规则给 vee-validate
export default {
    // 校验函数规则：返回true就是校验成功，返回一个字符串就是失败，字符串就是错误提示
    account(value) {
        if (!value) {
            return '请输入用户名';
        } else if (!/^[a-zA-Z]\w{5,19}$/.test(value)) {
            return '字母开头且6-20个字';
        } else {
            return true;
        }
    },
    // 密码校验
    password(value) {
        if (!value) {
            return '请输入密码';
        } else if (!/^\w{6,24}$/.test(value)) {
            return '密码6-24个字符';
        } else {
            return true;
        }
    },
    // 手机号校验
    mobile(value) {
        if (!value) {
            return '请输入手机号';
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
            // 规则：1开头 3-9 之间  9个数字
            return '手机号格式不对';
        }
        return true;
    },
    code(value) {
        if (!value) {
            return '请输入短信验证码';
        } else if (!/^\d{6}$/.test(value)) {
            // 规则： 6个数字
            return '短信验证码6个数字';
        }
        return true
    },
    isAgree(value) {
        if (value === false) {
            return '请勾选登录协议';
        }
        return true;
    }
}
