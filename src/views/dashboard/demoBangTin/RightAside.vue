<template>
    <div class="right-aside-container">
        <sdCards>
            <div class="study-info">
                <div class="study-info-title" @click.prevent="toggleShow">
                    <div class="study-info-title-text">
                        Thông tin học tập của bạn
                    </div>
                    <unicon name="angle-up" v-if="visible" style="margin-top: 2px;"></unicon>
                    <unicon name="angle-down" v-else style="margin-top: 2px;"></unicon>
                </div>
                <div class="study-info-item" v-show="visible">
                    <div class="study-info-item-key">
                        Thời gian đã học: <span class="study-info-item-value">0 Tuần</span>
                    </div>
                    <div class="study-info-item-key">
                        Số buổi đã tham gia: <span class="study-info-item-value">0 Buổi</span>
                    </div>
                    <div class="study-info-item-key">
                        Số buổi nghỉ: : <span class="study-info-item-value">0 Buổi</span>
                    </div>
                    <div class="study-info-item-key">
                        Số bài tập đã làm: <span class="study-info-item-value">0 Bài</span>
                    </div>
                    <div class="study-info-item-key">
                        Môn học hiện tại: <span class="study-info-item-value">C Array</span>
                    </div>
                </div>
            </div>
            <div class="category">
                <div class="category-title">
                    <div class="category-title-text">
                        Danh mục
                    </div>
                    <unicon name="tag-alt"></unicon>
                </div>
                <div class="category-list">
                    <div v-for="(item, index) in subjects" :key="index" class="category-item">
                        <unicon :name="item.icon"></unicon>
                        <div>
                            {{ item.title }}
                        </div>
                    </div>
                </div>
            </div>
        </sdCards>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
const subjects = [
    {
        id: 1,
        title: 'Viết bài',
        value: 'write-post',
        icon: 'pen'
    },
    {
        id: 2,
        title: 'Hỏi đáp',
        value: 'question',
        icon: 'map-marker-question'
    },
    {
        id: 3,
        value: 'data-algorithms',
        title: 'Dữ liệu & giải thuật',
        icon: 'database-alt'
    },
    {
        id: 4,
        value: 'programming-language',
        title: 'Ngôn ngữ lập trình',
        icon: 'brackets-curly'
    },
    {
        id: 5,
        value: 'good-exercise',
        title: 'Bài tập hay',
        icon: 'game-structure'
    },
    {
        id: 6,
        value: 'AI',
        title: 'Trí tuệ nhân tạo',
        icon: 'brain'
    },
    {
        id: 7,
        value: 'python',
        title: 'Python',
        icon: 'code-branch'
    },
    {
        id: 8,
        value: 'reactjs',
        title: 'ReactJS',
        icon: 'code-branch'
    },
]
const visible = ref(false);
const toggleShow = () => {
    visible.value = !visible.value;
}
</script>
<style scoped>
.right-aside-container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.study-info-title {
    border-radius: 10px;
    padding: 0.5rem 0.8rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    margin-bottom: 0.2rem;
    user-select: none;
}
.study-info-title:hover {
    cursor: pointer;
    opacity: 0.85;
    background-color: #cfcfcf;;
}
.study-info-title-text {
    font-size: 1.2rem;
    font-weight: 500;
}
:global(div.study-info > div.study-info-title > div.unicon > svg > path),
:global(div.category > div.category-title > div.unicon > svg) {
    fill: #8231d3 ;
}
:global(div.category > div > div.category-item > div > svg > path) {
    fill: #3b0274; 
}
.study-info-item {
    padding: 0 1rem;
}
.study-info-item-key {
    font-size: 1rem;
    font-weight: 500;
    padding: 0.2rem 0;
}
.study-info-item-value {
    color: #8231d3;
}

.category {
    margin-top: 1rem;
}
.category-list {
    height: 40vh;
    overflow-y: auto;
}
.category-title,  .category-item{
    display: flex;
    align-items: center;
    gap: 4px;
    padding-left: 0.5rem;
}
.category-title-text {
    font-size: 1.2rem;
    font-weight: 500;
}
.category-item {
    border-radius: 1.5rem;
    padding: 0.7rem 1.1rem;
}
.category-item:hover {
    cursor: pointer;
    background-color: #cfcfcf;
}
.category-item div {
    font-size: 1rem;
    color: #1c0136;
}
</style>