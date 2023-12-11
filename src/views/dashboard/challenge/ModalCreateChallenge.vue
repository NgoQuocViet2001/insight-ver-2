<template>
    <div class="create-challenge-modal">
        <sdModal :title="currentModal?.label" :type="type" :visible="visible" :onOk="onOk" :onCancel="onCancel"
            :bodyStyle="{ overflowY: 'auto', maxHeight: '92vh' }">
            <BasicFormWrapper>
                <div class="create-challenge-form">
                    <a-form name="challenge" layout="vertical">
                        <a-form-item v-if="currentModal?.name" name="name" :label="currentModal?.name">
                            <a-input v-model:value="formState.challengeName" :placeholder="currentModal?.nameHolder" />
                        </a-form-item>

                        <a-row :gutter="20" style="margin-bottom: 1rem;">
                            <a-col v-if="currentModal?.attendLimit" :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                                <a-form-item name="attendLimit" :label="currentModal?.attendLimit">
                                    <a-select v-model:value="formState.attendLimit" style="width: 100%">
                                        <a-select-option value="limit1">10</a-select-option>
                                        <a-select-option value="limit2">25</a-select-option>
                                        <a-select-option value="limit3">50</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col v-if="currentModal?.language" :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                                <a-form-item name="language" :label="currentModal?.language">
                                    <a-select v-model:value="formState.language" style="width: 100%">
                                        <a-select-option value="csharp">C#</a-select-option>
                                        <a-select-option value="java">Java</a-select-option>
                                        <a-select-option value="javascript">Javascript</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col v-if="currentModal?.minElo" :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                                <a-form-item name="minElo" :label="currentModal?.minElo">
                                    <a-select v-model:value="formState.minElo" style="width: 100%">
                                        <a-select-option value="minElo1">1000</a-select-option>
                                        <a-select-option value="minElo2">1200</a-select-option>
                                        <a-select-option value="minElo3">1500</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col v-if="currentModal?.timeLimit" :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                                <a-form-item name="timeLimit" :label="currentModal?.timeLimit">
                                    <a-select v-model:value="formState.timeLimit" style="width: 100%">
                                        <a-select-option value="time1">30 phút</a-select-option>
                                        <a-select-option value="time2">60 tiếng</a-select-option>
                                        <a-select-option value="time3">90 phút</a-select-option>
                                        <a-select-option value="time4">120 phút</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col v-if="currentModal?.testNumber" :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                                <a-form-item name="testNumber" :label="currentModal?.testNumber">
                                    <a-select v-model:value="formState.testNumber" style="width: 100%">
                                        <a-select-option value="testNumber1">1</a-select-option>
                                        <a-select-option value="testNumber2">2</a-select-option>
                                        <a-select-option value="testNumber3">3</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col v-if="currentModal?.level" :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                                <a-form-item name="Level" :label="currentModal?.level">
                                    <a-select v-model:value="formState.level" style="width: 100%">
                                        <a-select-option value="easy">Dễ</a-select-option>
                                        <a-select-option value="medium">Trung bình</a-select-option>
                                        <a-select-option value="hard">Khó</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col v-if="currentModal?.eloRating" :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                                <a-form-item name="challengeLevel" :label="currentModal?.eloRating">
                                    <a-select v-model:value="formState.eloRating" style="width: 100%">
                                        <a-select-option value="elo">Có</a-select-option>
                                        <a-select-option value="non-elo">Không</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col v-if="currentModal?.prize" :xxl="24" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                                <a-form-item name="challengeLevel" :label="currentModal?.prize">
                                    <a-select v-model:value="formState.prize" style="width: 100%">
                                        <a-select-option value="prize1">2 triệu đồng tiền mặt</a-select-option>
                                        <a-select-option value="prize2">Khoá học trị giá 5.000.000 đồng tại LTS
                                            Edu</a-select-option>
                                        <a-select-option value="prize3">Công việc mức lương 15 triệu</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col v-if="currentModal?.public" :xxl="24" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                                <span style="font-weight: 500; margin-right: 1rem;">
                                    {{ currentModal?.public }}
                                </span>
                                <a-switch v-model:checked="formState.public" size="default" name="public"/>
                            </a-col>
                        </a-row>

                        <a-form-item v-if="currentModal?.description" name="challengeBanner"
                            :label="currentModal?.description">
                            <a-textarea :rows="3" placeholder="Mô tả ngắn" v-model:value="formState.shortDesc" />
                        </a-form-item>
                        <a-form-item v-if="currentModal?.banner" name="challengeBanner" :label="currentModal?.banner">
                            <a-upload :action="formState.apiUpload" name="challengeUpload" @change="handleFileChange"
                                @remove="handleRemovePreview" v-model:file-list="formState.bannerFile" :max-count="1">
                                <a-button>
                                    <unicon name="upload"></unicon>
                                </a-button>
                            </a-upload>
                            <div v-show="imageUrl">
                                <h3>
                                    Banner giải đấu
                                </h3>
                                <img style="object-fit: cover; width: 100%; aspect-ratio: 16/9;" :src="imageUrl"
                                    alt="Banner">
                            </div>
                        </a-form-item>
                        <a-row>
                            <sdButton type="primary" size="lg" @click="onOk">{{ currentModal?.label }}</sdButton>
                        </a-row>
                        <!-- <a-row :gutter="20"> -->
                        <!-- <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                                <a-form-item v-if="currentModal?.start" name="challengeStart" :label="currentModal?.start">
                                    <a-date-picker v-model:value="formState.start" placeholder="mm/dd/yyyy"
                                        :format="dateFormat" />
                                </a-form-item>
                            </a-col>
                            <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                                <a-form-item v-if="currentModal?.end" name="challengeEnd" :label="currentModal?.end">
                                    <a-date-picker v-model:value="formState.end" placeholder="mm/dd/yyyy"
                                        :format="dateFormat" />
                                </a-form-item>
                            </a-col> -->
                        <!-- </a-row> -->
                    </a-form>
                </div>
            </BasicFormWrapper>
        </sdModal>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { BasicFormWrapper } from '@/views/styled';
const dateFormat = 'MM/DD/YYYY';
const props = defineProps([
    'visible',
    'onOk',
    'onCancel',
    'modalID',
    'type',
    'formState',
]);
const imageUrl = ref('');
const currentModal = computed(() => modalText.find(item => item.id === props.modalID));

const modalText = [
    {
        id: 1,
        label: 'Tạo giải đấu',
        name: 'Tên giải đấu',
        nameHolder: 'Nhập tên giải đấu',
        banner: 'Tải lên banner',
        description: 'Mô tả giải đấu',
        uploadBanner: 'Upload',
        attendLimit: 'Giới hạn người tham gia',
        language: 'Ngôn ngữ',
        minElo: 'Elo tối thiểu',
        level: 'Độ khó',
        timeLimit: 'Thời gian làm bài',
        testNumber: 'Số lượng bài',
        prize: 'Giải thưởng',
    },
    {
        id: 2,
        label: 'Tạo trận solo',
        name: 'Tên trận solo',
        nameHolder: 'Nhập tên trận đấu',
        language: 'Ngôn ngữ',
        level: 'Độ khó',
        testNumber: 'Số lượng bài',
        timeLimit: 'Thời gian làm bài',
        eloRating: 'Tính điểm elo',
        public: 'Public',
        description: 'Mô tả trận đấu',
    },
    {
        id: 3,
        nameHolder: 'Nhập tên trận đấu',
        label: 'Tạo trận luyện tập',
        language: 'Ngôn ngữ',
        testNumber: 'Số lượng bài',
        name: 'Tên trận luyện tập',
        timeLimit: 'Thời gian làm bài',
        level: 'Độ khó',
    },
]
const files = ref<string[]>([]);
const handleFileChange = ({ file }: any) => {
    const previewFile = file.originFileObj;
    imageUrl.value = URL.createObjectURL(previewFile);
    files.value.push(imageUrl.value);
    console.log(files.value);
};
const handleRemovePreview = (event: any) => {
    imageUrl.value = '';
    files.value.slice(0, 1);
    console.log(files.value);
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

.ant-picker {
    width: 100%;
}
</style>