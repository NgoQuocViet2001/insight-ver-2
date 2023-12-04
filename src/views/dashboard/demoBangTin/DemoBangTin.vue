<template>
    <div class="news">
      <a-row :gutter="25" class="news-container">
        <a-col :xxl="16" :xl="16" :lg="16" :md="16" :sm="24" :xs="24" class="news-content">
          <Suspense>
            <CreatePost :current-user="currentUser" :subjects="subjects"/>
          </Suspense>
          <Suspense>
              <AllPosts/>
          </Suspense>
        </a-col>
        <a-col :xxl="8" :xl="8" :lg="8" :md="8" :sm="0" :xs="0" class="news-right-aside">
          <div class="sticky-right-aside">
            <Suspense>
              <RightAside />
            </Suspense>
          </div>
        </a-col>
      </a-row>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const RightAside = defineAsyncComponent(() => import('./RightAside.vue'));
const CreatePost = defineAsyncComponent(() => import('./createpost/CreatePost.vue'));
const AllPosts = defineAsyncComponent(() => import('@/views/dashboard/demoBangTin/posts/AllPosts.vue'));


const currentUser = {
  avatarUrl: 'https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=KU8IkmrM5HbtYIyyS5k1qQ',
}
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
</script>
<style scoped>
:global(.news .ant-card) {
  border-radius: 10px;
}
.news {
  padding-top: 1rem;
  background-color: #c3d8e9;
}
.news .news-container {
  padding: 0 1rem;
}
.sticky-right-aside {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
/* Extra-extra-large screens (xxl) */
@media only screen and  (min-width: 1600px) {
  .news .news-content {
    padding-left: 4rem !important;
    padding-right: 4rem !important;
  }
  .news-right-aside {
    padding-left: 4rem !important;
    padding-right: 4rem !important;
  } 
}
</style>