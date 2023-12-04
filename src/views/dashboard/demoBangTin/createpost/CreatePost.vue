<template>
  <sdCreatePost>
    <sdCards title="Tạo bài viết">
      <div @click="" class="postBody">
        <img class="post-author"
          :src="currentUser.avatarUrl"
          alt="avatar" />
        <a-textarea @click="showModalCreatePost" readonly placeholder="Bạn đang nghĩ gì thế" />
      </div>
      <div @click="" class="postFooter">
        <div class="postFooter_left">
          <sdButton shape="circle" type="light" size="lg" @click="showModalCreatePost">
            <img :src="'/src/assets/img/icon/image.png'" alt="" />
            <span>Photo/Video</span>
          </sdButton>
          <sdButton shape="circle" type="light" size="lg" @click="showModalCreatePost">
            <img
              src="https://static-00.iconduck.com/assets.00/smiling-face-with-hearts-emoji-emoji-2026x2048-a7w8b5yr.png"
              alt="" style="width: 1.2rem; height: 1.2rem;" />
            <span>Cảm xúc</span>
          </sdButton>
        </div>
      </div>
    </sdCards>
    <ModalCreatePost :visible="modalCreatePostState.visible" :subjects="subjects" :form-state="modalCreatePostFormState"
      :on-cancel="handleModalCreatePostCancel" :on-ok="handleModalCreatePostOk" />
  </sdCreatePost>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import ModalCreatePost from './ModalCreatePost.vue';
const props = defineProps([
  'currentUser',
  'subjects',
])
const modalCreatePostState = reactive({
  visible: false,
  type: 'primary',
})
const modalCreatePostFormState = reactive({
  title: '',
  subject: 'write-post',
  notification: false,
  remarkable: false,
  description: '',
})
const showModalCreatePost = () => {
  modalCreatePostState.visible = true;
};

const handleModalCreatePostCancel = () => {
  modalCreatePostState.visible = false;
}

const handleModalCreatePostOk = () => {
}
</script>

<style scoped>
:global(div.ant-modal-wrap) {
    display: flex;
    align-items: center;
    justify-content: center;
}

:global(div.ant-modal-wrap > div) {
    top: 0;
    padding-bottom: 0;
}
</style>
