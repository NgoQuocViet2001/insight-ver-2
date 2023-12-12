<template>
    <a-modal title="Đánh giá" @ok="handleOk" @cancel="handleCancel" :visible="visible" :ok-text="okText" :cancel-text="cancelText">
      <template #default>
        <a-rate centered v-model:value="rating" />
        <a-input v-model:value="description" placeholder="Mô tả" />
      </template>
    </a-modal>
</template>

  <script setup lang="ts">
  import { ref, defineProps, watch } from 'vue';
  
  const props = defineProps(['visible','closeModal'])
  
  const rating = ref<number>(0);
  const description = ref<string>("");
  const okText = 'Đánh giá';
  const cancelText = 'Hủy';
  
  const handleOk = () => {
    console.log(props);
    props.closeModal();
  };
  
  const handleCancel = () => {
    props.closeModal();
  };
</script>

<style scoped>
  :global(body > div:nth-child(10) > div > div.ant-modal-wrap > div) {
    width: 400px !important;
  }
  :global(body > div:nth-child(10) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > ul) {
    margin-bottom: 14px !important;
  }
  :global(body > div:nth-child(10) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body) {
    text-align: center ;
  }
</style>