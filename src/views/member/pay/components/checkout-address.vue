<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-if="showAddress">
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{
            showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
          }}
        </li>
        <li>
          <span>收货地址：</span>{{ showAddress.fullLocation.replace(/ /g, "")
          }}{{ showAddress.address }}
        </li>
      </ul>
      <a
        v-if="showAddress"
        @click="openAddressEdit(showAddress)"
        href="javascript:;"
        >修改地址</a
      >
    </div>
    <div class="action">
      <DianshangButton @click="openDialog" class="btn"
        >切换地址</DianshangButton
      >
      <DianshangButton @click="openAddressEdit({})" class="btn"
        >添加地址</DianshangButton
      >
    </div>
    <!-- 对话框组件 -->
    <DianshangDialog title="切换收货地址" v-model:visible="visibleDialog">
      <div
        @click="selectedAddress = item"
        class="text item"
        :class="{ active: selectedAddress && selectedAddress.id === item.id }"
        v-for="item in list"
        :key="item.id"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li>
            <span>联系方式：</span
            >{{ item.contact.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") }}
          </li>
          <li>
            <span>收货地址：</span
            >{{ item.fullLocation.replace(/ /g, "") + item.address }}
          </li>
        </ul>
      </div>
      <template v-slot:footer>
        <DianshangButton
          @click="visibleDialog = false"
          type="gray"
          style="margin-right: 20px"
          >取消</DianshangButton
        >
        <DianshangButton @click="confirmAddressFn" type="primary"
          >确认</DianshangButton
        >
      </template>
    </DianshangDialog>
    <!-- 收货地址添加编辑组件 -->
    <AddressEdit
      @on-success="successHandler"
      ref="addressEditCom"
    ></AddressEdit>
  </div>
</template>
<script>
import { ref } from 'vue';
import AddressEdit from './address-edit';
export default {
  name: 'CheckoutAddress',
  components: { AddressEdit },
  props: {
    // 收货地址列表
    list: {
      type: Array,
      default: () => [],
    },
  },
  // 1. 在拥有根元素的组件中，触发自定义事件，有没有emits选项无所谓
  // 2. 如果你的组件渲染的代码片段，vue3.0规范，需要在emits中申明你所触发的自定义事件
  // 3. 提倡：你发了自定义事件，需要在emits选项申明下，代码可读性很高
  // emits: ["addressId"],
  setup(props, { emit }) {
    // 解构出 list 防止 eslint 报错
    const { list } = { ...props };
    const showAddress = ref(null);
    // 1. 找到默认收货地址
    const defaultAddres = list.find((item) => {
      return item.isDefault === 0;
    });
    if (defaultAddres) {
      showAddress.value = defaultAddres;
      // 对话框默认选中地址
    } else if (!defaultAddres && list.length) {
      // 2. 没有默认收货地址，使用第一条收货地址
      // eslint-disable-next-line vue/no-setup-props-destructure
      showAddress.value = list[0];
    }
    // 3. 没有收货地址，显示请添加收货地址
    // 切换地址对话框显示隐藏
    const visibleDialog = ref(false);
    // 点击切换地址显示对话框
    const openDialog = () => {
      visibleDialog.value = true;
    };
    // 默认选中地址
    // const addressStatus = ref(0);
    // const changeAddressActive = (index) => {
    //   addressStatus.value = index;
    // };
    // 通知父组件一个收货地址 ID ,判断不为 null 则返回 id
    // emit("change", showAddress.value && showAddress.value.id);
    emit('change', showAddress.value?.id);
    // 记录当前你选中的地址的 ID
    const selectedAddress = ref(showAddress);
    const confirmAddressFn = () => {
      // 显示的地址换成呢选中的地址
      showAddress.value = selectedAddress.value;
      // 把选中的地址ID通知结算组件
      // ？ 如果有值就继续返回 selectedAddress.value.id ，没有就停止不报错返回 selectedAddress.value为undefined
      emit('change', selectedAddress.value?.id);
      visibleDialog.value = false;
    };
    // 打开添加收货地址
    const addressEditCom = ref(null);
    const openAddressEdit = (address) => {
      // 添加 {}  修改 {数据}
      addressEditCom.value.open(address);
    };
    // 地址
    const successHandler = (formData) => {
      // 根据formData中的ID去当前地址列表中查找，有就是修改，否则是添加
      const address = props.list.find((item) => {
        return (item.id = formData.id);
      });
      console.log(address);
      // 如果是修改，则进行修改数据更新
      if (address) {
        for (const key in address) {
          address[key] = formData[key];
        }
      } else {
        // 如果是添加：往list中追加一条
        // 当你在修改formData的时候，数组中的数据也会更新，因为是同一引用地址。
        // 在修改formData，当你打开对话框需要清空之前的输入信息
        // 克隆formData数据
        const jsonStr = JSON.stringify(formData);
        // eslint-disable-next-line vue/no-mutating-props
        props.list.unshift(JSON.parse(jsonStr));
      }
    };
    return {
      successHandler,
      addressEditCom,
      openAddressEdit,
      confirmAddressFn,
      selectedAddress,
      showAddress,
      visibleDialog,
      openDialog,
      // addressStatus,
      // changeAddressActive,
    };
  },
};
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @blueColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  .dianshang-dialog {
    .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;
      &.item {
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;
        &.active {
          color: #fff;
          background: @blueColor;
          span {
            color: #fff;
          }
        }
        &.active :hover {
          span {
            color: @textColor;
          }
        }
        &:hover {
          color: @textColor;
          border-color: @blueColor;
          background: @transparentBlueColor;
        }
        > ul {
          padding: 10px;
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
