<template>
    <div class="tour-info-modal">
        <sdModal :type="type" :visible="visible" :onOk="onOk" :onCancel="onCancel" width="45rem"
            :bodyStyle="{ overflowY: 'auto', maxHeight: '92vh' }">
            <div class="tournament-content">
                <div class="tournament-banner">
                    <img :src="modalInfoState.banner" alt="Ảnh post">
                </div>
                <div class="tournament-info" style="flex-grow: 1;">
                    <a-row class="tournament-info-row" style="justify-content: space-between; align-items: center;">
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                            <h3 class="tournament-title">
                                {{ modalInfoState.title }}
                            </h3>
                        </a-col>
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                            <div>
                                Mã giải đấu: {{ modalInfoState.matchingCode }}
                            </div>
                        </a-col>
                    </a-row>
                    <a-row class="tournament-info-row" style="justify-content: space-between; align-items: center;">
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                            <div class="tournament-attended">
                                Số người: {{ modalInfoState.attendeesNumber }}/{{ modalInfoState.attendeesLimit }}
                            </div>
                        </a-col>
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                            <div style="display: flex;align-items: center; gap: 10px;">
                                <div>
                                    Mời bạn bè tham gia:
                                </div>
                                <a-typography-paragraph :copyable="{ text: modalInfoState.tournamentUrl }"
                                    style="margin-top: 1rem; padding:4px 8px;border-radius: 20px;border: 2px solid #959595;color: #959595; display: flex;">
                                    Link
                                </a-typography-paragraph>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <!-- <div class="tournament-user">
                <div>
                    <img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/users/tsreaper/avatar_1627139236.png"
                        alt="Poster" class="tournament-user-avatar" />
                </div>
                <div class="tournament-user-detail">
                    <h3 class="tournament-user-name">Ngô Quốc Việt</h3>
                    <sdButton type="primary" shape="round" size="sm">Rank: Bạch kim</sdButton>
                </div>
            </div> -->
            <div class="tournament-detail">
                <a-row>
                    <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24" class="tournament-detail-item">
                        Ngày bắt đầu: {{ modalInfoState.startTime }}
                    </a-col>
                    <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24" class="tournament-detail-item">
                        Thời gian thi đấu: {{ modalInfoState.matchTime }}
                    </a-col>
                    <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24" class="tournament-detail-item">
                        Ngôn ngữ: {{ modalInfoState.language }}
                    </a-col>
                    <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24" class="tournament-detail-item">
                        Elo tối thiểu: {{ modalInfoState.minElo }}
                    </a-col>
                </a-row>
            </div>
            <div class="tournament-desc-container">
                <div class="tournament-desc-title">
                    Mô tả
                </div>
                <div class="tournament-desc-detail">
                    {{ modalInfoState.shortDescription }}
                </div>
            </div>
            <div class="tournament-desc-action">
                <sdButton type="light" shape="round" size="lg" @click="handleViewDetail">Xem chi tiết
                </sdButton>
                <sdButton v-if="modalInfoState.status === 'upcoming'" shape="round" size="lg" style="background-color: #E65A2B; color: #fff;"
                    @click="handleRegistration">Đăng ký
                    tham gia</sdButton>
            </div>
        </sdModal>
        <ModalSuccess :modalSuccessVisible="modalSuccessVisible" :btnClick="redirect" :handleCancel="handleCancelModalSuccess" desc="Bạn đã đăng ký thành công tham gia vào giải đấu !" btn-text="Vào phòng chờ"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalSuccess from './ModalSuccess.vue';
const modalSuccessVisible = ref(false);
const props = defineProps([
    'visible',
    'onOk',
    'onCancel',
    'type',
    'tourInfo',
    'modalInfoState',
    'handleViewDetail',
    'matchingCode',
    // 'handleRegistration'
]);
const showModalSuccess = () => {
    modalSuccessVisible.value = true;
}
const handleRegistration = () => {
    
    setTimeout(()=> {
        //xử lí logic

        showModalSuccess();
    }, 500)
}
const handleCancelModalSuccess = () => {
    modalSuccessVisible.value = false;
}
const redirect = () => {
    setTimeout(()=>{
        console.log('Chuyển hướng đến trang hàng chờ')
    }, 2000)
}
</script>
<style scoped>
:global(body > div:nth-child(11) > div > div.ant-modal-wrap) {
    display: flex;
    align-items: center;
    justify-content: center;
}

:global(body > div:nth-child(11) > div > div.ant-modal-wrap > div) {
    top: 0;
    padding-bottom: 0;
}

:global(body > div:nth-child(10) > div > div.ant-modal-wrap > div > div.ant-modal-content > div > div.tournament-content > div.tournament-info > div > button) {
    pointer-events: none;
}

:global(body > div:nth-child(10) > div > div.ant-modal-wrap > div > div.ant-modal-content > div > div.tournament-user > div.tournament-user-detail > button) {
    pointer-events: none;
}

:global(body > div:nth-child(10) > div > div.ant-modal-wrap > div > div.ant-modal-content > div > div.tournament-content > div.tournament-info > div > button) {
    cursor: default;
}

.tournament-content {
    display: flex;
    margin-bottom: 3.125rem;
}

.tournament-banner img {
    height: 9rem;
    width: 16rem;
    border-radius: 16px;
}

.tournament-info {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.tournament-title {
    font-size: 1.5rem;
    font-weight: 600;
}

.tournament-attended {
    font-size: 1.125rem;
}

.tournament-user {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
}

.tournament-user-avatar {
    width: 5rem;
    width: 5rem;
    border-radius: 50%;
    margin-right: 1rem;
}

.tournament-user-name {
    font-size: 1.25rem;
    font-weight: 500;
}

.tournament-detail {
    margin-bottom: 1.5rem;
}

.tournament-detail .tournament-detail-item {
    font-size: 1rem;
    font-weight: 500;
}

.tournament-desc-container {
    background-color: #F9F9F9;
    border-radius: 10px;
    min-height: 8rem;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
}

.tournament-desc-title {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
}

.tournament-desc-detail {
    font-size: 1rem;
    font-weight: 400;
}

.tournament-desc-action {
    display: flex;
    justify-content: end;
    gap: 0.55rem;
}
</style>