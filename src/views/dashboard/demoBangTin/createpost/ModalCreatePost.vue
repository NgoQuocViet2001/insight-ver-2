<template>
    <sdModal title="Tạo bài viết" :type="type" :visible="visible" :onOk="onOk" :onCancel="onCancel"
        :bodyStyle="{ overflowY: 'auto', maxHeight: '90vh' }" width="50rem">
        <BasicFormWrapper>
            <div class="create-post-form">
                <a-form name="post" layout="vertical">
                    <a-row :gutter="20">
                        <a-col :xxl="14" :xl="14" :lg="14" :md="14" :sm="14" :xs="24">
                            <a-form-item name="title" label="Tiêu đề">
                                <a-input v-model:value="formState.title" />
                            </a-form-item>
                        </a-col>
                        <a-col :xxl="10" :xl="10" :lg="10" :md="10" :sm="10" :xs="24">
                            <a-form-item name="subject" label="Chọn chủ đề">
                                <a-select v-model:value="formState.subject" style="width: 100%">
                                    <a-select-option v-for="item in subjects" :value="item.value">{{ item.title
                                    }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row style="margin-bottom: 1.8rem;">
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="12" class="post-switch-item">
                            <a-switch v-model:checked="formState.notification" size="default" />
                            <span>Thêm vào thông báo</span>
                        </a-col>
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="12" class="post-switch-item">
                            <a-switch v-model:checked="formState.remarkable" size="default" />
                            <span>Thêm vào đáng chú ý</span>
                        </a-col>
                    </a-row>
                    <a-row>
                        <CKEditor :editor="ClassicEditor" v-model="editorData" :config="editorConfig"></CKEditor>
                    </a-row>
                    <a-row justify="space-between" align="center" style="margin-top: 1rem;">
                        <a-col :xxl="8" :xl="8" :lg="8" :md="8" :sm="8" :xs="12">
                            <span class="create-post-text">Thêm ảnh vào bài viết</span>
                        </a-col>
                        <a-col :xxl="4" :xl="4" :lg="4" :md="4" :sm="4" :xs="12" class="create-post-btn">
                            <a-upload v-model:file-list="formState.imageUrl" :max-count="1"
                                :action="formState.apiUpload" @change="">
                                <sdButton shape="circle" type="light" size="lg">
                                    <img src="https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png" alt=""
                                        style="width: 22px; height: 22px;" />
                                    <span>Ảnh</span>
                                </sdButton>
                            </a-upload>
                        </a-col>
                    </a-row>
                    <a-row justify="space-between" align="center" style="margin-top: 1rem;">
                        <a-col :xxl="10" :xl="10" :lg="10" :md="10" :sm="10" :xs="12">
                            <span class="create-post-text">Thêm video youtube vào bài viết</span>
                        </a-col>
                        <a-col :xxl="4" :xl="4" :lg="4" :md="4" :sm="4" :xs="12" class="create-post-btn">
                            <a-upload v-model:file-list="formState.youtubeLink" :max-count="1"
                                :action="formState.apiUpload" @change="">
                                <sdButton shape="circle" type="light" size="lg">
                                    <img src="https://purepng.com/public/uploads/large/purepng.com-youtube-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596145hip8d.png"
                                        alt="" style="width: 22px; height: 22px;" />
                                    <span>Youtbe</span>
                                </sdButton>
                            </a-upload>
                        </a-col>
                    </a-row>
                    <a-row justify="center" style="margin-top: 1rem;">
                        <a-col :xxl="24" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                            <sdButton shape="circle" type="primary" size="lg" @click="handleSubmit">
                                Đăng
                            </sdButton>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </BasicFormWrapper>
    </sdModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BasicFormWrapper } from '@/views/styled';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { component as CKEditor } from '@ckeditor/ckeditor5-vue';
// import {HtmlEmbed} from '@ckeditor/ckeditor5-html-embed/';
const props = defineProps([
    'visible',
    'onOk',
    'onCancel',
    'modalID',
    'type',
    'formState',
    'subjects',
]);
const editorConfig = ref({
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'undo',
        'redo',  
        'removeFormat',  
        'alignment',  
        'fontColor',  
        'fontSize',  
    ],
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
        ]
    },
    alignment: {
        options: ['left', 'center', 'right', 'justify']
    },
    fontSize: {
        options: [10, 12, 14, 16, 18, 20, 24, 30]
    },
    fontColor: {
        colors: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)'],  // Example colors, you can customize
    },
});
const editorData = ref('')
const handleSubmit = () => {
    props.onOk();
}
</script>
<style scoped>
.post-switch-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

:global(.ck.ck-reset.ck-editor.ck-rounded-corners) {
    width: 100%;
}

:global(.create-post-form .ck-editor .ck.ck-editor__main>.ck-editor__editable) {
    min-height: 55vh !important;
}

:global(body > div:nth-child(10) > div > div.ant-modal-wrap) {
    display: flex;
    align-items: center;
    justify-content: center;
}

:global(body > div:nth-child(10) > div > div.ant-modal-wrap > div) {
    top: 0;
    padding-bottom: 0;
}

.create-post-text {
    font-size: 1.1rem;
    font-weight: 500;
}

.create-post-btn {
    display: flex;
    justify-content: end;
}

:global(.create-post-form .ant-btn) {
    width: 100%;
}</style>