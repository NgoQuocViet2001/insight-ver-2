<template>
    <a-modal :visible="modalSuccessVisible"  @ok="handleOk" @cancel="handleCancel" :footer="null" :title="null">
        <div class="modal-success-container">
            <img src="@/assets/images/success_icon.svg" alt="success-icon"/>
            <div class="modal-success-content">
                {{ desc }}
            </div>
            <a-button style="background-color: #1BB43D; color: #fff;" shape="round" size="large" @click="btnClick">
                {{ btnText }}
            </a-button>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
const props = defineProps([
    'modalSuccessVisible',
    'handleOk',
    'handleCancel',
    'desc',
    'btnClick',
    'btnText',
])


</script>

<style scoped>
.modal-success-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}
.modal-success-content {
    font-size: 1rem;
    font-weight: 500;
}
</style>