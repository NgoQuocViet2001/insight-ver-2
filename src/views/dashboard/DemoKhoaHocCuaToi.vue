<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Main } from '../styled';

const initialData = [
    { name: 'Fullstack Java Web', value: 1, button: 'button1', imgs: '../../src/assets/img/top.png', number: 18 },
    { name: 'Fontend Developer Reactjs', value: 2, button: 'button1', imgs: '../../src/assets/img/support-img.png', number: 18 },
    { name: 'Fresher Tester', value: 'A', button: 'button2', imgs: '../../src/assets/img/top.png', number: 18 },
    { name: 'Manual Test Fresher', value: 'B', button: 'button2', imgs: '../../src/assets/img/top.png', number: 18 },
    // ... more initial data
];

const selectedButton = ref('button1');
const data = ref([...initialData]);

const handleButtonClick = (buttonName: string) => {
    selectedButton.value = buttonName;
};

const filteredData = (buttonName: string) => {
    return data.value.filter(item => item.button === buttonName);
};

onMounted(() => {
    handleButtonClick('button1');
});
</script>

<template>
    <div class="my-course">
        <a-row class="backdground-course">
            <a-col :span="3"></a-col>
            <a-col class="mt-40" :span="21">
                <h2 class="courses-name">Khóa học của tôi</h2>
                <div class="d-flex">
                    <sdButton @click="handleButtonClick('button1')" size="default" :transparented="true" type="primary"
                        :class="{ 'primary': selectedButton === 'button1', 'default': selectedButton !== 'button1' }"
                        class="custom-link">Đã đăng ký
                    </sdButton>
                    <sdButton @click="handleButtonClick('button2')" size="default" :transparented="true" type="primary"
                        :class="{ 'primary': selectedButton === 'button2', 'default': selectedButton !== 'button2' }"
                        class="custom-link">Chưa đăng ký</sdButton>
                </div>
            </a-col>
        </a-row>
        <Main>
            <a-row :gutter="25" class="pt-20 d-block">
                <a-col :xs="24" :span="24" class="infor-course mb-20" v-if="selectedButton === 'button1'"
                    v-for="(item, index) in filteredData('button1')" :key="index">
                    <div class="courses-card">
                        <img :src="item.imgs" alt="img-card" class="img-card">
                        <div class="d-block p-15 w-md-70-sd-100">
                            <h3>{{ item.name }}</h3>
                            <a class="text-link">Lotus Academy</a>
                            <div class="text-number-of-subjects">
                                <label>Lộ Trình -</label>
                                {{ item.number }} Môn học<a> (Xem Thêm)</a>
                            </div>
                            <div class="d-flex w-100 justify-content-end">
                                <sdButton size="default" shape="circle" type="primary" class="f-md-right mt-10">                         
                                <span>Vào học</span><span> </span>
                                <unicon name="arrow-right" width="14"></unicon>
                            </sdButton>
                            </div>                       
                        </div>
                    </div>
                </a-col>

                <a-col :xs="24" :span="24" class="infor-course mb-20" v-if="selectedButton === 'button2'"
                    v-for="(item, index) in filteredData('button2')" :key="index">
                    <div class="courses-card">
                        <img :src="item.imgs" alt="img-card" class="img-card">
                        <div class="d-block p-15 w-md-70-sd-100">
                            <h3>{{ item.name }}</h3>
                            <a class="text-link">Lotus Academy</a>
                            <div class="text-number-of-subjects">
                                <label>Lộ Trình -</label>
                                {{ item.number }} Môn học<a> (Xem Thêm)</a>
                            </div>
                            <div class="d-flex w-100 justify-content-end">
                                <sdButton size="default" shape="circle" type="primary" class="f-md-right mt-10">                         
                                <span>Vào học</span><span> </span>
                                <unicon name="arrow-right" width="14"></unicon>
                            </sdButton>
                            </div>                       
                        </div>
                    </div>
                </a-col>
            </a-row>
        </Main>
    </div>
</template>

<style scoped>
.my-course {
    font-family: Arial, Helvetica, sans-serif;
}

.backdground-course {
    background-color: rgb(80, 87, 99);
}
.my-course .lmeiNC {
    background: #F0F2F5;
}
.d-block {
    display: block;
}

.d-flex {
    display: flex;
}

.justify-content-end{
    justify-content: end;
}

.courses-card {
    display: flex;
    border: 0.5px solid rgb(212, 199, 199);
    border-radius: 20px;
    box-shadow: inset;
    background-color: #fff;
}

.courses-card:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border: none;
}

.courses-card h3 {
    font-size: 22px;
    margin-bottom: 8px;
}

.courses-card .text-link {
    font-size: 18px;
    padding-left: 8px;
    color: #1976D2;
}

.courses-card .text-number-of-subjects {
    font-size: 16px;
    color: #686868;
}
.courses-card .text-number-of-subjects a {
    font-size: 16px;
    color: #686868;
}
.mb-20 {
    margin-bottom: 20px;
}

.p-15 {
    padding: 15px;
}

.pt-20 {
    padding-top: 20px;
}

.mt-10 {
    margin-top: 10px;
}
.mt-40 {
    margin-top: 40px;
}
.w-100{
    width: 100%;
}
.courses-name {
    color: #fff;
    font-size: 26px;
}

.w-md-70-sd-100 {
    width: 70%;
}

.primary {
    border-bottom: 6px solid #ffffffB3;
}

.default {
    background-color: #d9d9d9;
}

.img-card {
    height: 180px;
    width: 30%;
    border-radius: 20px;
}

.infor-course {
    height: 180px;
    max-width: 880px;
    display: block;
    margin: auto;
    border-radius: 20px;
}

.my-course .custom-link {
    height: 48px;
    border-bottom: 6px solid transparent;
}

.my-course .custom-link:hover {
    border-bottom: 6px solid #ffffffB3;
}

.my-course .default[data-v-8e4e3970] {
    background-color: transparent;
    color: #ffffff99;

}

.bWWCBR.bWWCBR:hover {
    color: #fff;
    background-color: #585F6A;
    border-bottom: 6px solid #ffffffB3;
}

.bWWCBR.bWWCBR:focus {
    color: #fff;
    background-color: #7A7F88;
    border-bottom: 6px solid #ffffffB3;
}

.bWWCBR.bWWCBR {
    color: #fff;
    background-color: #7A7F88;
    border-radius: 4px 4px 0 0;
}
.fiLpOL.fiLpOL {
    height: 40px;
    background-image: linear-gradient(to right, #34b9e5, #0089dc)
}
@media screen and (max-width: 600px) {
    .courses-card {
        display: block;
    }

    .img-card {
        height: auto;
        width: 100%;
        border-radius: 20px;
    }

    .infor-course {
        height: auto;
    }

    .w-md-70-sd-100 {
        width: 100%;
    }

    /* .f-md-right {
        float: none;
    } */
}</style>
