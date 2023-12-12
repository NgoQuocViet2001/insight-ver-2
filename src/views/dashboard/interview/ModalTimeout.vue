<template>
    <a-modal title="Thông báo" @ok="handleOk" :footer="null" :header="null" :closable="false" :mask-closable="true"  :visible="visibleModalTimeout" :ok-text="okText">
      <template #default>
        <p>Kết thúc !</p>
        <button id="btnOK" @click="handleOk">OK</button>
      </template>
    </a-modal>
</template>
  
<script setup lang="ts">
  import router from '@/router';
  import { defineProps } from 'vue';

  const props = defineProps(['visibleModalTimeout','closeModalTimeOut'])
  const okText = 'OK';
  
  const handleOk = () => {
    props.closeModalTimeOut();
    //router.push('/interview');
  };
  const handleCancel = () => {
    props.closeModalTimeOut();
  };
</script>

<style scoped>
:global(body > div > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body) {
  text-align: center !important;
}
:global(body > div > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > p) {
  font-size: 28px;
  font-weight: 500;
  color: #21498c;
}
:global(#vcDialogTitle1) {
  color: #21498c;
}
#btnOK {
  padding: 8px 40px;
  color: #fff;
  background-color: #E65A2B;
  border: none;
  border-radius: 130px;
}
#btnOK:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
  