<template>
    <div class="post-container"></div>
    <sdCards more>
        <template #more>
            <a @click="" to="#"> Chỉnh sửa </a>
            <a @click="" to="#"> Xoá </a>
        </template>
        <template #title>
            <TitleWrapper>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUBknhceC1k0bDxfsje-t-eRD2HEQeZWBXQz69r0cB-g&s"
                    alt="" />
                <p>Ngô Quốc Việt <span>3 years ago</span></p>
            </TitleWrapper>
        </template>
        <div class="post-content">
            <div class="post-text">
                <h4 class="post-title">
                    LTS EDU - THÔNG BÁO
                </h4>
                <p class="post-description">Dear các bạn học viên</p>
                <p class="post-description">Thứ 2 ngày 20/11 ngày Nhà giáo Việt Nam, Học viện tổ chức lễ tri ân cho các
                    giảng viên và mentor vào tối thứ 2 nên các bạn học viên CA TỐI sẽ được NGHỈ .</p>
                <p class="post-description">Thứ 3 ngày 21/11 học viên ca tối học bình thường.</p>
                <p class="post-description">Lịch học bù của các bạn các mentor sẽ sắp xếp và thông báo cho mọi người</p>
                <p class="post-description">Mọi thắc mắc vui lòng liên hệ với admin qua số điện thoại: 0333747897</p>
                <p class="post-description">Trân trọng!</p>

            </div>
            <div class="post-image">
                <img style="width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 10px;"
                    src="https://leplateau.edu.vn/wp-content/uploads/2023/10/hinh-anh-thien-nhien-dep.jpg" alt="" />
            </div>
        </div>
        <div class="post-actions-count">
            <div>
                <a @click="" to="#">
                    <unicon name="heart" width="25"></unicon>
                </a>
                2
            </div>
            <div>
                <div>
                    <a to="#">
                        <unicon name="comment-alt" width="25"></unicon>
                    </a>
                    3
                </div>
                <a to="#">
                    <unicon name="share-alt" width="25"></unicon>
                    5
                </a>
            </div>
        </div>
        <div class="post-actions">
            <div class="post-actions-item">
                <div>
                    <a @click="" to="#">
                        <unicon name="heart" width="30" height="30"></unicon>
                    </a>
                    Yêu thích
                </div>
            </div>
            <div class="post-actions-item">
                <div @click="toggleComment" class="post-actions-comment">
                    <a to="#">
                        <unicon name="comment-alt" width="30" height="30"></unicon>
                    </a>
                    Bình luận
                </div>
            </div>
                <a to="#" class="post-actions-item">
                    <unicon name="share-alt" width="30" height="30"></unicon>
                    Chia sẻ
                </a>
        </div>
        <Transition name="slide-fade">
            <div class="post-comments" v-show="commentVisible" :class="{ visible: commentVisible }">
                <div class="post-user-avatar">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUBknhceC1k0bDxfsje-t-eRD2HEQeZWBXQz69r0cB-g&s"
                        alt="" />
                </div>
                <div class="comment-form">
                    <a-textarea @change="" placeholder="Viết bình luận..." />
                </div>
                <sdButton @click="" type="primary" class="btn-send" shape="circle">
                    <unicon name="message" width="18"></unicon>
                </sdButton>
            </div>
        </Transition>
    </sdCards>
</template>

<script setup lang="ts">
import { TitleWrapper } from '@/views/apps/myProfile/overview/timeline/style';
import { ref } from 'vue';
const commentVisible = ref(false);
const toggleComment = () => {
    commentVisible.value = !commentVisible.value;
}
</script>

<style scoped>
.post-title {
    font-size: 1.2rem;
}

.post-description {
    font-size: 1rem;
    white-space: pre-line;
}

.post-actions-count {
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f2f6;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    padding-bottom: 8px;
}

.post-actions {
    display: flex;
    justify-content: space-between;
}

.post-actions-count div,
.post-actions div {
    display: inline-flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.85);
    margin-right: 20px;
}

.post-actions-count a,
.post-actions a {
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.85);
}

.post-actions-count a svg,
.post-actions-count a i,
.post-actions a svg,
.post-actions a i {
    margin-right: 6px;
}

:global(.post-actions-count a svg),
:global(.post-actions a svg) {
    fill: #3b0274 !important;
}

.post-actions-count>div,
.post-actions-count>div>a {
    font-size: 1rem;
}
.post-actions-item {
    cursor: pointer;
}
div.ant-card.dXRjFB>div.ant-card-body>div.post-actions>div>a {
    width: 36px;
}

div.ant-card.dXRjFB>div.ant-card-body>div.post-actions div>div>a {
    width: 36px;
}

div.ant-card.dXRjFB>div.ant-card-body>div.post-actions>a>div {
    margin-right: 4px;
}

.post-comments {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.post-comments .post-user-avatar img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
}

.post-comments .comment-form {
    flex-grow: 1;
}

:global(div.ant-col.ant-col-md-16 > div.ant-card.dXRjFB > div.ant-card-body > div.post-comments > button) {
    height: 3rem;
    width: 3rem;
}

div.ant-card.dXRjFB>div.ant-card-body>div.post-comments>div.comment-form>textarea {
    border-radius: 15px;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}</style>