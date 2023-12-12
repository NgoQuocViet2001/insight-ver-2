<template>
    <div>
        <UserBioBox>
            <sdCards headless>
                <article class="user-info" >
                    <a-row justify="space-between">
                        <sdHeading as="h5" class="user-info__title">
                            <p class="right-sidebar-title" >Bảng xếp hạng </p>
                        </sdHeading>
                        <span>Xem thêm</span>
                    </a-row>
                </article>

                <article>
                    <a-list item-layout="horizontal" :data-source="props.dataRanking">
                        <template  #renderItem="{ item, index }">
                            <a-list-item>
                              <a-space>
                                <a-row :gutter="10">
                                    <a-col>
                                        <template v-if="index + 1 === 1">
                                            <img src="/src/assets/img/solar_cup-star-bold-gold.png" alt="">
                                        </template>
                                        <template v-else-if="index + 1 === 2">
                                            <img src="/src/assets/img/solar_cup-star-bold-silver.png" alt="">
                                        </template>
                                        <template v-else-if="index + 1 === 3">
                                            <img src="/src/assets/img/solar_cup-star-bold-council.png" alt="">
                                        </template>
                                        <template v-else>
                                            <span style="width: 24px; text-align: center;">{{ index + 1 }}</span> 
                                        </template>
                                    </a-col>
                                    <a-col>
                                        <a-row :gutter="8">
                                            <img :src="item.avatar" alt="Avatar" style="width: 44px; height: 44px; border-radius: 50%;">
                                            <div>
                                                <p>{{ item.name }}</p> 
                                                <span>Elo: {{ item.elo }}</span> 
                                                <span>| Attended: {{ item.attended }}</span> 
                                            </div>
                                        </a-row>
                                    </a-col>
                                    
                                </a-row>
                                
                              </a-space>
                            </a-list-item>
                        </template>
                    </a-list>
                </article>
            </sdCards>
        </UserBioBox>  
    </div>
</template>

<script setup lang="ts">
    import { UserBioBox } from '@/views/apps/myProfile/overview/style';
    const props = defineProps(['dataRanking']);
</script>