<template>
    <router-link :to="{ name: 'interview', params: { id } }">
        <a-card :hoverable="true">
            <img :src="imageSrc" alt=""> 
            <div class="interview_title" > 
                <h3 class="title" >{{ title }}</h3>
                <p class="des">{{ description }}</p>
            </div>
        </a-card>
    </router-link>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue';
    const props = defineProps(['title', 'description', 'imageSrc', 'id']);
</script>

<style scoped>
  
</style>

