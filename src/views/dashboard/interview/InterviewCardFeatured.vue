<template>
    <router-link :to="{ name: 'interview', params: { id } }">
        <a-card :hoverable="true" class="card" :style="{background: background}">
            <div class="interview_title" style=" color: #fff;"> 
              <h3 class="title" style=" color: #fff;">{{ title }}</h3>
              <p class="des">{{ description }}</p>
            </div>
            <div class="image" style="text-align: right"> 
              <img :src="imageSrc" alt="" style="width: 130px"> 
            </div>
        </a-card>
    </router-link>
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue';
  const props = defineProps(['title', 'description', 'imageSrc', 'id', 'background']);
  
</script>

<style scoped>
.card {
  border-radius: 15px;
  height: 240px;
  display: flex; 
  justify-content: space-between;
  flex-direction: column; 
}
</style>