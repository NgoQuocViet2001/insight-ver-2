<template>
    <Main>
        <BreadcrumbWrapperStyle>
            <a-breadcrumb>
                <a-breadcrumb-item>
                    <router-link to="/">Home</router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    <router-link to="/interview">Interview</router-link>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </BreadcrumbWrapperStyle>

        <div class="" style="padding-top: 10px;"> 
            <h2>Featured</h2>
            <a-row :gutter="30">
                <a-col :xxl="6" :xl="6" :lg="12" :md="12" :sm="12" :xs="12"  v-for="item in dataBanner" :key="item.id">
                    <InterviewCard :id="item.id" :description="item.description" :imageSrc="item.imageSrc" :title="item.title" :background="item.background" />
                </a-col>
            </a-row>
        </div>

        <div class="list-interview" style="padding-top: 30px;" v-for="interview in interviews" :key="interview.id"> 
            <h2>{{ interview.title }}</h2>
            <a-row :gutter="30">
                <a-col :xxl="8" :xl="8" :lg="12" :md="12" :sm="12" :xs="12"  v-for="item in interview.items" :key="item.id">
                    <InterviewCardItem :title="item.title" :id="item.id" :description="item.description" :imageSrc="item.imageSrc"/>
                </a-col>
            </a-row>
        </div>
        
    </Main>
</template>

<script setup lang="ts">
    import {Main} from '@/views/styled';
    import { BreadcrumbWrapperStyle } from "@/views/uiElements/ui-elements-styled";
    import InterviewCard from './InterviewCardFeatured.vue';
    import InterviewCardItem from './InterviewCardItem.vue';
    import { reactive } from 'vue';

    const dataBanner = reactive([
        {
            title: "Top interview 150",
            description: "Must-do List for Interview Prep",
            imageSrc: "https://assets.leetcode.com/static_assets/others/LeetCode_75_3-240x240.png", 
            id: 1, 
            background: "linear-gradient(rgb(18, 92, 204) 0%, rgb(19, 41, 120) 100%)"
        },
        {
            title: "Top interview 150",
            description: "Must-do List for Interview Prep",
            imageSrc: "https://assets.leetcode.com/static_assets/others/Top_Interview_150_3-240x240.png", 
            id: 2, 
            background: "linear-gradient(rgb(0, 111, 146) 0%, rgb(10, 51, 115) 100%)"
        },
        {
            title: "Top interview 150",
            description: "Must-do List for Interview Prep",
            imageSrc: "https://assets.leetcode.com/static_assets/others/Binary_Search_3-240x240.png", 
            id: 3, 
            background: "linear-gradient(rgb(95, 54, 212) 0%, rgb(59, 1, 133) 100%)"
        },
        {
            title: "Top interview 150",
            description: "Must-do List for Interview Prep",
            imageSrc: "https://assets.leetcode.com/static_assets/others/Top_SQL_50_3-240x240.png", 
            id: 4, 
            background: "linear-gradient(rgb(8, 118, 117) 0%, rgb(20, 57, 101) 100%)"
        },
    ])

    const interviews = reactive([
        {
            id: 1,
            title: "DSA",
            items: [
                {
                    title: "SQL",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/top-sql-50/cover", 
                    interviewId: 1,
                    id: 10, 
                },
                {
                    title: "Javascript",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/30-days-of-javascript/cover", 
                    interviewId: 1,
                    id: 11, 
                },
                {
                    title: "SQL",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/introduction-to-pandas/cover", 
                    interviewId: 1,
                    id: 12, 
                },
            ]
        },
        {
            id: 2,
            title: "Web Development",
            items: [
                {
                    title: "SQL",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/top-sql-50/cover", 
                    interviewId: 2,
                    id: 13, 
                },
                {
                    title: "SQL",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/introduction-to-pandas/cover", 
                    interviewId: 2,
                    id: 14, 
                }
            ]
        },
        {
            id: 3,
            title: "Machine Learning & Data Science",
            items: [
                {
                    title: "SQL",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/introduction-to-pandas/cover", 
                    interviewId: 3,
                    id: 15, 
                },
                {
                    title: "Javascript",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/30-days-of-javascript/cover", 
                    interviewId: 3,
                    id: 16, 
                },
                {
                    title: "SQL",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/top-sql-50/cover", 
                    interviewId: 3,
                    id: 17, 
                },
                {
                    title: "Javascript",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/30-days-of-javascript/cover", 
                    interviewId: 3,
                    id: 18, 
                },
                {
                    title: "SQL",
                    description: "Ace Coding Interview with 75 Qs",
                    imageSrc: "https://assets.leetcode.com/study_plan_v2/top-sql-50/cover", 
                    interviewId: 3,
                    id: 19, 
                },
            ]
        }
    ])

</script>

<style scoped>
:global(body) {
    background: #f2f2f2;
}
#app > div > div > section > section > section > main > div > div:nth-child(3) > h2
:global(#app > div > div > section > section > section > main > div > div.list-interview > div > div > a > div) {
    border-radius: 10px;
}
:global(#app > div > div > section > section > section > main > div > div.list-interview > div > div > a > div > div) {
    display: flex;
    padding: 10px !important;
    height: 100px;
}
:global(#app > div > div > section > section > section > main > div > div.list-interview > div > div > a > div > div > img) {
    border-radius: 10px;
}
:global(#app > div > div > section > section > section > main > div > div.list-interview > div > div) {
    margin-bottom: 10px;
}

:global(#app > div > div > section > section > section > main > div > div.list-interview > div > div > a > div > div > div) {
    margin-left: 8px;
}

:global(#app > div > div > section > section > section > main > div > div.ant-row) {
    margin-left: -10px;
    margin-right: -10px;
}
:global(#app > div > div > section > section > section > main > div > div.ant-row > div) {
    padding: 10px;
}
:global(#app > div > div > section > section > section > main > div > div.ant-row > div > div > div) {
    padding: 16px !important;
}
:global(#app > div > div > section > section > section > main > div > div.iTQBHa) {
    margin-top: 15px;
}
</style>