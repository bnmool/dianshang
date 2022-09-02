<template>
  <DianshangDialog title="添加收货地址" v-model:visible="visibleDialog">
    <div class="address-edit">
      <div class="dianshang-form">
        <div class="dianshang-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              v-model="formData.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="dianshang-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="dianshang-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <dianshangCity
              :fullLocation="formData.fullLocation"
              @change="changeCity"
              placeholder="请选择所在地区"
            />
          </div>
        </div>
        <div class="dianshang-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="dianshang-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="formData.postalCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="dianshang-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <DianshangButton
        @click="visibleDialog = false"
        type="gray"
        style="margin-right: 20px"
        >取消</DianshangButton
      >
      <DianshangButton @click="subAddress" type="primary">确认</DianshangButton>
    </template>
  </DianshangDialog>
</template>
  <script>
import { ref, reactive } from 'vue';
import Message from '@/components/library/Message';
import { addAddress, editAddress } from '@/api/order';
export default {
  name: 'AddressEdit',
  setup(props, { emit }) {
    const visibleDialog = ref(false);
    // 打开函数
    const open = (address) => {
      visibleDialog.value = true;
      if (address.id) {
        // 如果修改 填充表单
        for (const key in address) {
          formData[key] = address[key];
        }
      } else {
        // 如果添加 清空表单
        for (const key in formData) {
          if (key === 'isDefault') {
            formData[key] = 1;
          } else {
            formData[key] = null;
          }
        }
      }
    };
    // 定义表单数据对象
    const formData = reactive({
      receiver: null,
      contact: null,
      provinceCode: null,
      cityCode: null,
      countyCode: null,
      address: null,
      postalCode: null,
      addressTags: null,
      isDefault: 1,
      // 城市组件显示文字（完整行政区地址）
      fullLocation: null,
    });
    // 城市选中
    const changeCity = (result) => {
      formData.provinceCode = result.provinceCode;
      formData.cityCode = result.cityCode;
      formData.countyCode = result.countyCode;
      formData.fullLocation = result.fullLocation;
    };
    // 提交地址
    const subAddress = () => {
      // 1. 省略了校验
      // 简单的表单校验
      let subAddressPass = true;
      if (!formData.receiver) {
        Message({ type: 'warn', text: '收货人不能为空' });
        subAddressPass = false;
        return subAddressPass;
      }
      if (!formData.contact) {
        Message({ type: 'warn', text: '手机号不能为空' });
        subAddressPass = false;
        return subAddressPass;
      }
      if (!formData.fullLocation) {
        Message({ type: 'warn', text: '请选择所在地区' });
        subAddressPass = false;
        return subAddressPass;
      }
      if (!formData.address) {
        Message({ type: 'warn', text: '详细地址不能为空' });
        subAddressPass = false;
        return subAddressPass;
      }
      if (!formData.postalCode) {
        Message({ type: 'warn', text: '请输入邮政编码' });
        subAddressPass = false;
        return subAddressPass;
      }
      if (!formData.addressTags) {
        Message({ type: 'warn', text: '地址标签不能为空' });
        subAddressPass = false;
        return subAddressPass;
      }
      // 2. 发送请求了
      console.log(formData.id);
      if (subAddressPass) {
        if (formData.id) {
          // 修改请求
          editAddress(formData).then((data) => {
            // 提示
            Message({ type: 'success', text: '修改收货地址成功' });
            // 关闭
            visibleDialog.value = false;
            // 触发自定义事件
            emit('on-success', formData);
          });
        } else {
          addAddress(formData).then((data) => {
            // 需要设置ID
            formData.id = data.result.id;
            // 提示
            Message({ type: 'success', text: '添加收货地址成功' });
            // 关闭
            visibleDialog.value = false;
            // 触发自定义事件，把当前收货地址给结算地址列表
            emit('on-success', formData);
          });
        }
      }
    };
    return { visibleDialog, open, formData, changeCity, subAddress };
  },
};
</script>
  <style scoped lang="less">
.dianshang-dialog {
  :deep(.wrapper) {
    width: 880px !important;
    .body {
      font-size: 14px;
    }
  }
}
.dianshang-form {
  .dianshang-form-item {
    margin: 0;
  }
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.dianshang-city {
  width: 320px;
  /deep/.select {
    height: 50px !important;
    line-height: 48px !important;
    // display: flex;
    padding: 0 10px !important;
    // justify-content: space-between;
    .placeholder {
      color: #ccc !important;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
