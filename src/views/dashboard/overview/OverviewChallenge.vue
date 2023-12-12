<template>
    <Main>
        <div id="overview-challenge-container">
            <BreadcrumbWrapperStyle>
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link to="/">Home</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link to="/dautruong">Đấu trường</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link to="/dautruong/tongquan">Tổng quan</router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </BreadcrumbWrapperStyle>
            <a-row :gutter="[30, 30]">
                <a-col :xxl="17" :xl="17" :lg="16" :md="24" :xs="24" :sm="24">
                    <article>
                        <sdHeading as="h5" class="user-info__title">
                            <p class="right-sidebar-title" >Công cụ tìm kiếm</p>
                        </sdHeading>
                        <a-row :gutter="[20,10]">
                            <a-col :xxl="6" :xl="6" :lg="6" :md="12" :xs="24" :sm="24">
                                <sdHeading as="h6" class="user-info__title">
                                    <p class="right-sidebar-title" >Danh mục</p>
                                </sdHeading>
                                <a-space>
                                    <a-select
                                      ref="select"
                                      v-model:value="tournamentSelected"
                                      @change="handleChangeTournament"
                                    >
                                        <a-select-option  v-for="item in optionTournaments" :key="item.id" :value="item.id">
                                            {{ item.content }}
                                        </a-select-option>
                                    </a-select>
                                </a-space>
                            </a-col>
                            <a-col :xxl="6" :xl="6" :lg="6" :md="12" :xs="24" :sm="24">
                                <sdHeading as="h6" class="user-info__title">
                                    <p class="right-sidebar-title" >Trạng thái</p>
                                </sdHeading>
                                <a-space>
                                    <a-select
                                      ref="select"
                                      v-model:value="statusSelected"
                                      @change="handleChangeStatus"
                                    >
                                        <a-select-option v-for="item in optionStatus" :key="item.id" :value="item.id">
                                            {{ item.content }}
                                        </a-select-option>
                                    </a-select>
                                </a-space>
                            </a-col>
                            <a-col :xxl="6" :xl="6" :lg="6" :md="12" :xs="24" :sm="24">
                                <sdHeading as="h6" class="user-info__title">
                                    <p class="right-sidebar-title" >Thời gian</p>
                                </sdHeading>
                                <a-space>
                                    <a-select
                                      ref="select"
                                      v-model:value="timeSelected"
                                      @change="handleChangeTime"
                                    >
                                        <a-select-option  v-for="item in optionTime" :key="item.id" :value="item.id">
                                            {{ item.time }}
                                        </a-select-option>
                                    </a-select>
                                </a-space>
                            </a-col>
                            <a-col :xxl="6" :xl="6" :lg="6" :md="12" :xs="24" :sm="24">
                                <sdHeading as="h6" class="user-info__title">
                                    <p class="right-sidebar-title" >Số lượng người tham gia</p>
                                </sdHeading>
                                <a-space>
                                    <a-select
                                      ref="select"
                                      v-model:value="attendeSelected"
                                      @change="handleChangeAttende"
                                    >
                                        <a-select-option v-for="item in optionAttendees" :key="item.id" :value="item.id">
                                            {{ item.attendees }}
                                        </a-select-option>
                                    </a-select>
                                </a-space>
                            </a-col>
                        </a-row>
                    </article>

                    <article>
                        <a-row justify="space-between">
                            <sdHeading as="h5" class="user-info__title">
                                <p class="right-sidebar-title" >Tổng quan</p>
                            </sdHeading>
                            <div>
                                <a-radio-group v-model:value="tabActive" button-style="solid">
                                  <a-radio-button :value='1'>Giải đấu </a-radio-button>
                                  <a-radio-button :value='2'>Thử thách cá nhân</a-radio-button>
                                  <a-radio-button :value='3'>Solo</a-radio-button>
                                </a-radio-group>
                            </div>
                        </a-row>
                    </article>

                    <article>
                        <a-row :gutter="[20,20]">
                            <template v-if="dataFilter.length > 0">
                                <a-col v-for="item in dataFilter" :key="item.id" :xxl="12" :xl="12" :lg="12" :md="12" :xs="24" :sm="24">
                                    <template v-if="item.status === 2">
                                        <CardOverviewChallenge title="Đang diễn ra" :quantity="item.quantity" bgImage="/src/assets/img/card-report-happending.png" :link="item.id.toString"/>
                                    </template>
                                    <template v-else-if="item.status === 3">
                                        <CardOverviewChallenge title="Sắp diễn ra" :quantity="item.quantity" bgImage="/src/assets/img/card-report-upcoming.png" :link="item.id.toString"/>
                                    </template>
                                    <template v-else-if="item.status === 4">
                                        <CardOverviewChallenge title="Đã diễn ra" :quantity="item.quantity" bgImage="/src/assets/img/card-report-took-place.png" :link="item.id.toString"/>
                                    </template>
                                    <template v-else-if="item.status === 5">
                                        <CardOverviewChallenge title="Đã hủy" :quantity="item.quantity" bgImage="/src/assets/img/card-report-cancel.png" :link="item.id.toString"/>
                                    </template>
                                </a-col>
                            </template>
                            <template v-else>
                                <a-col :xxl="12" :xl="12" :lg="12" :md="12" :xs="24" :sm="24">
                                    <CardOverviewChallenge title="Đang diễn ra" :quantity="0" bgImage="/src/assets/img/card-report-happending.png" :link="'0'"/>
                                </a-col>
                                <a-col :xxl="12" :xl="12" :lg="12" :md="12" :xs="24" :sm="24">
                                    <CardOverviewChallenge title="Sắp diễn ra" :quantity="0" bgImage="/src/assets/img/card-report-upcoming.png" :link="'0'"/>
                                </a-col>
                                <a-col :xxl="12" :xl="12" :lg="12" :md="12" :xs="24" :sm="24">
                                    <CardOverviewChallenge title="Đã diễn ra" :quantity="0" bgImage="/src/assets/img/card-report-took-place.png" :link="'0'"/>
                                </a-col>
                                <a-col :xxl="12" :xl="12" :lg="12" :md="12" :xs="24" :sm="24">
                                    <CardOverviewChallenge title="Đã hủy" :quantity="0" bgImage="/src/assets/img/card-report-cancel.png" :link="'0'"/>
                                </a-col>
                            </template>

                        </a-row>
                    </article>
                </a-col>
    
                <a-col :xxl="7" :xl="7" :lg="8" :md="24" :xs="24" :sm="24">
                    <RightSideBarOverviewChallenge :dataRanking="topRanking"/>
                </a-col>
            </a-row>
        </div>
    </Main>
</template>

<script setup lang="ts">
    import RightSideBarOverviewChallenge from '@/views/dashboard/overview/RightSideBarOverviewChallenge.vue';
    import CardOverviewChallenge from '@/views/dashboard/overview/CardOverviewChallenge.vue';
    import { reactive, ref, watch } from 'vue';

    const tournamentSelected = ref<number>(1);
    const statusSelected = ref<number>(1);
    const timeSelected = ref<number>(1);
    const attendeSelected = ref<number>(1);
    const tabActive = ref<number>(1);

    const data = ref([
        {
            id: 1,
            quantity: 13,
            status: 2,
            tournamentId: 2,
            attendeesId: 2,
            timeId: 2
        },
        {
            id: 2,
            quantity: 123,
            status: 3,
            attendeesId: 2,
            tournamentId: 2,
            timeId: 2
        },
        {
            id: 3,
            quantity: 10,
            status: 4,
            attendeesId: 2,
            tournamentId: 2,
            timeId: 2
        },
        {
            id: 4,
            quantity: 213,
            status: 5,
            attendeesId: 2,
            tournamentId: 2,
            timeId: 2
        },
        {
            id: 8,
            quantity: 1000,
            status: 2,
            attendeesId: 3,
            tournamentId: 3,
            timeId: 3
        },
        {
            id: 5,
            quantity: 100,
            status: 3,
            attendeesId: 3,
            tournamentId: 3,
            timeId: 3
        },
        {
            id: 6,
            quantity: 113,
            status: 4,
            attendeesId: 3,
            tournamentId: 3,
            timeId: 3
        },
        {
            id: 7,
            quantity: 200,
            status: 5,
            attendeesId: 3,
            tournamentId: 3,
            timeId: 3
        },
      
        {
            id: 9,
            quantity: 88,
            status: 2,
            attendeesId: 4,
            tournamentId: 1,
            timeId: 4
        },
        {
            id: 10,
            quantity: 13,
            status: 3,
            attendeesId: 4,
            tournamentId: 1,
            timeId: 4
        },
        {
            id: 11,
            quantity: 1111,
            status: 4,
            attendeesId: 4,
            tournamentId: 1,
            timeId: 4
        },
        {
            id: 12,
            quantity: 1,
            status: 5,
            attendeesId: 4,
            tournamentId: 1,
            timeId: 4
        },
    ])

    const dataRanking = reactive([
        {
            id: 1,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1600,
            attended: 1500,
        },
        {
            id: 2,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 800,
            attended: 1600,
        },
        {
            id: 3,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 2000,
            attended: 2000,
        },
        {
            id: 4,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1900,
            attended: 2100,
        },
        {
            id: 5,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1500,
            attended: 2100,
        },
        {
            id: 6,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1500,
            attended: 2100,
        },
        {
            id: 7,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1500,
            attended: 2100,
        },
        {
            id: 8,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1500,
            attended: 2100,
        },
        {
            id: 9,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1450,
            attended: 2100,
        },
        {
            id: 10,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1350,
            attended: 2100,
        },
        {
            id: 11,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1200,
            attended: 2000,
        },
        {
            id: 12,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1150,
            attended: 1900,
        },
        {
            id: 13,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1290,
            attended: 1990,
        },
        {
            id: 14,
            avatar: '/src/assets/img/avatar.png',
            name: 'Sobin Sam Son',
            elo: 1300,
            attended: 1900,
        },
    ])
    const topRanking = ref(dataRanking.sort((a, b) => b.elo - a.elo).slice(0,10))

    const optionTournaments = reactive([
        {
            id: 1,
            content: 'Giải đấu',
        },
        {
            id: 2,
            content: 'Thử thách cá nhân',
        },
        {
            id: 3,
            content: 'Solo',
        }
    ])
    const optionStatus = reactive([
        {
            id: 1,
            content: 'Tất cả',
        },
        {
            id: 2,
            content: 'Đang diễn ra',
        },
        {
            id: 3,
            content: 'Sắp diễn ra',
        },
        {
            id: 4,
            content: 'Đã diễn ra',
        },
        {
            id: 5,
            content: 'Đã hủy',
        },
    ])
    const optionTime = reactive([
        {
            id: 1,
            time: 'Tất cả',
        },
        {
            id: 2,
            time: '60 phút',
        },
        {
            id: 3,
            time: '120 phút',
        },
        {
            id: 4,
            time: '180 phút',
        },
    ])
    const optionAttendees = reactive([
        {
            id: 1,
            attendees: 'Tất cả',
        },
        {
            id: 2,
            attendees: '5',
        },
        {
            id: 3,
            attendees: '10',
        },
        {
            id: 4,
            attendees: '20',
        },
        {
            id: 5,
            attendees: '30',
        },
        {
            id: 6,
            attendees: '50',
        },
    ])

    const dataFilter = ref(data.value.filter(item => item.tournamentId === tabActive.value));

    const handleFilterData = () => {
        dataFilter.value = data.value.filter(item => item.tournamentId === tabActive.value);
        if(statusSelected.value != 1) {            
            dataFilter.value = dataFilter.value.filter(item => item.status === statusSelected.value);
        }
        if(timeSelected.value != 1) {
            dataFilter.value = dataFilter.value.filter(item => item.timeId === timeSelected.value);
        }
        if(attendeSelected.value != 1) {
            dataFilter.value = dataFilter.value.filter(item => item.attendeesId === attendeSelected.value);
        }
    }

    const handleChangeTournament = (value: number) => {
        handleFilterData();
        tabActive.value = tournamentSelected.value;
    };
    const handleChangeStatus = (value: number) => {
        handleFilterData();
    };
    const handleChangeTime = (value: number) => {
        handleFilterData();
    };
    const handleChangeAttende = (value: number) => {
        handleFilterData();
    };

    watch(tabActive, (newValue) => {
        tournamentSelected.value = tabActive.value;
        handleFilterData();
    });


</script>

<style scoped>
#overview-challenge-container {
    padding: 30px 0 30px 30px ;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article.user-info) {
    padding-bottom: 5px;
    margin-bottom: 10px;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article > div > div > h1) {
    font-size: 15px;
    font-weight: 500;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article > div > div > div > div > div),
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article > div > div > div > div),
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article > div > div > div) {
    width: 100%;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article > div > div > div > div > div > div) {
    border-radius: 8px;
}
:global(#overview-challenge-container > div) {
    margin-top: 35px;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2)) {
    margin-top: 24px;   
}

:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label) {
    background: #dadada;
    border-radius: 15px;
    border: none;
    width: 150px;
    text-align: center;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label:hover) {
    color: #000000;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div) {
    border-radius: 15px;
    background: #dadada;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label > span:nth-child(2)) {
    font-weight: 500;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked > span.ant-radio-button.ant-radio-button-checked) {
    outline: none;
    border: none;
    background: #ffffff;
    Padding: 8px, 24px, 8px, 24px;
    border-radius: 15px;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked > span:nth-child(2)) {
    color: #000000;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label::before) {
    display:none;
}
:global(#app > div > div > section > section > section > main > main) {
    background: #f2f2f2;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(3) > div > div > div) {
    position: relative;
    height: 300px;    
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(3) > div > div > div > img) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(3)) {
    margin-top: 25px;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article:nth-child(2) > div > div > div > ul > li) {
    border: none;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article:nth-child(2) > div > div > div > ul > li > div > div > div > div:nth-child(1)) {
    display: flex;
    align-items: center;
    padding: 0 10px 0 15px !important;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article:nth-child(2) > div > div > div > ul > li > div > div > div > div:nth-child(2) > div > div) {
    padding-left: 12px;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article:nth-child(2) > div > div > div > ul > li > div > div > div > div:nth-child(2) > div > div > p) {
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 700;
    color: #344767;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article:nth-child(2) > div > div > div > ul > li > div > div > div > div:nth-child(2) > div > div > span:nth-child(3)) {
    color: #344767;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article:nth-child(2) > div > div > div > ul > li > div > div > div > div > div > div > span:nth-child(2)) {
    padding-right: 4px;
    color: #4CAF50;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article.user-info > div > h1 > p) {
    text-transform: initial;
    font-size: 20px;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div) {
    border-radius: 35px;
    overflow: hidden;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div) {
    margin-bottom: 0 !important;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7) {
    padding-right: 0 !important;
}
:global(#overview-challenge-container > div) {
    margin-right: 0 !important;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article.user-info > div > span) {
    height: fit-content;
    font-size: 16px;
    color: #3895FF;
    cursor: pointer;
}
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked > span.ant-radio-button.ant-radio-button-checked),
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked > span.ant-radio-button.ant-radio-button-checked > input),
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked > span.ant-radio-button.ant-radio-button-checked > span),
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label > span.ant-radio-button > input),
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label > span.ant-radio-button > span),
:global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label > span.ant-radio-button:focus) {
    border: none !important;
    box-shadow: unset !important;
    outline: none !important;
}
@media only screen and (min-width:1000px) and (max-width: 1372px) {
    :global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article > div > div > h1) {
        font-size: 14px;
    }
}
@media only screen and (min-width:768px) and (max-width: 1000px) {
    :global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(3) > div > div > div) {
        height: 290px;    
    }
}
@media screen and (max-width:768px){
    :global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(1) > div > div > h1 > p) {
        margin-bottom: 6px;
    }
    :global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-16.ant-col-xl-17.ant-col-xxl-17 > article:nth-child(2) > div > div > div > label) {
        width: unset;
    }
    #overview-challenge-container {
        padding-left: 15px;
    }
    :global(#overview-challenge-container > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-8.ant-col-xl-7.ant-col-xxl-7 > div > div > div > div > article:nth-child(2) > div > div > div > ul > li > div > div > div > div:nth-child(1)) {
        padding: 0 20px 0 25px !important;
    }
}
</style>