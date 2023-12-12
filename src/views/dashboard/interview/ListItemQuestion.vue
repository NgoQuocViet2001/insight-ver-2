<template>
        <a-list
            :data-source="props.data"
            :pagination="pagination"
        >
            <template #renderItem="{ item }">
                <a-list-item @click="emit('onClickItemQuestion', item)">{{ item.content }}</a-list-item>
            </template>
        </a-list>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import PropTypes from 'vue-types';

    const emit = defineEmits(['onClickItemQuestion']);
    const props = defineProps({
        data: PropTypes.array,
        tabName2: PropTypes.string,
    });
    const pagination = ref({
        current: 1,
        pageSize: 5, 
        total: props.data.length,
        showSizeChanger: false,
        onChange: (page: number) => {
            pagination.value.current = page;
        },
    });

</script>