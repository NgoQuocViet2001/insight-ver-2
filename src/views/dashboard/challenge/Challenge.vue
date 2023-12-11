<template>
    <div class="challenge-container">
        <Main>
            <!-- Phần breadcrumb -->
            <BreadcrumbWrapperStyle>
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link to="/">Home</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link to="/thuthach">Thử thách</router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </BreadcrumbWrapperStyle>

            <div class="challenge-info">
                <a-row :gutter=[24,8]>
                    <a-col :xxl="18" :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
                        <div class="join-challenge">
                            <a-row>
                                <a-col :xxl="24" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                                    <ChallengeEnter background-image="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX54697784.jpg"
                                    :inputState="joinInputState"
                                    title="MỞ KHOÁ THÀNH TỰU" desc="Tham gia đấu trường ngay nào!" 
                                    btn-text="Tham gia" :btn-click="joinChallengeById"/>
                                </a-col>
                            </a-row>
                        </div>
                        <div class="create-challenge">
                            <h2>Tạo thử thách</h2>
                            <a-row :gutter=[8,8]>
                                <a-col :xxl="8" :xl="12" :lg="12" :md="24" :sm="24" :xs="24" v-for="item in challengeItems"
                                    :key="item.title">
                                    <ChallengeCard :backgroundImage="item.backgroundImage" :title="item.title"
                                        :desc="item.desc" :btnText="item.btnText"
                                        :btnClick="() => showModalCreateChallenge(item.id)" />
                                </a-col>
                            </a-row>
                        </div>
                        <ModalCreateChallenge :type="modalCreateChallengeState.type"
                            :visible="modalCreateChallengeState.visible"
                            :onOk="() => createChallenge(modalCreateChallengeState.currentModalID)"
                            :onCancel="handleModalCreateCancel" :modalID="modalCreateChallengeState.currentModalID"
                            :formState="modalCreateChallengeState.formState" />
                        <div class="challenge-inprogress">
                            <h2>Thử thách đang diễn ra</h2>
                            <a-tabs v-model:activeKey="activeTabKey" >
                                <a-tab-pane v-for="(tab, index) in tabs" :key="index + 1">
                                    <template #tab><span class="tab-label">{{ tab.label }}</span></template>
                                    <div class="select-status">
                                        <a-select v-if="index == 0" v-model:value="selectState" style="width: 100%"
                                            @change="handleChangeSelectStatus">
                                            <a-select-option value="happening">Đang diễn ra</a-select-option>
                                            <a-select-option value="upcoming">Sắp diễn ra</a-select-option>
                                            <a-select-option value="ended">Đã diễn ra</a-select-option>
                                        </a-select>
                                        <div v-else style="height: 2.375rem;"></div>
                                    </div>
                                    <div v-if="activeTabKey === tab.id" class="tab-content">
                                        <a-row :gutter=[16,16] class="tab-list">
                                            <a-col :xxl="12" :xl="24" :lg="24" :md="24" :sm="24" :xs="24" v-for="(item, index) in (tab.id === 1 && selectState === 'happening' ? displayHappeningTour :
                                                tab.id === 1 && selectState === 'upcoming' ? displayUpcomingTour :
                                                    tab.id === 1 && selectState === 'ended' ? displayEndedTour :
                                                        tab.id === 2 ? displaySoloItem : [])" :key="index"
                                                @click="showInfo(item)">
                                                <div class="challenge-inprogress-card">
                                                    <div class="challenge-inprogress-info">
                                                        <img :src="item.banner" alt="banner"
                                                            class="challenge-inprogress-img" />
                                                        <div class="challenge-inprogress-detail">
                                                            <h3 class="truncate-text">{{ item.title }}</h3>
                                                            <p>{{ item.startTime }}</p>
                                                        </div>
                                                    </div>
                                                    <div v-if="item.attendeesLimit">
                                                        <a-progress type="circle" :percent="item.attendeesNumber/item.attendeesLimit*100" :width="50"
                                                            strokeColor="#0c4e99" :strokeWidth="8">
                                                            <template #format="percent">
                                                                <span style="color: #373636; margin-left: -3px; font-size: 12px;" >{{ item.attendeesNumber }}/{{ item.attendeesLimit }}</span>
                                                            </template>
                                                        </a-progress>
                                                    </div>
                                                </div>
                                            </a-col>
                                        </a-row>
                                    </div>
                                    <div class="pagination-wrapper">
                                        <sdCards v-show="tab.id == 1 && selectState == 'happening'"
                                            class="challenge-pagination">
                                            <a-pagination v-model="currentPageState.tournament.happening"
                                                :total="happeningTourItems" :showSizeChanger="false"
                                                :pageSize="tournamentPageSize" show-less-items
                                                @change="handleHappeningPage" />
                                        </sdCards>
                                        <sdCards v-show="tab.id == 1 && selectState == 'upcoming'"
                                            class="challenge-pagination">
                                            <a-pagination v-model="currentPageState.tournament.upcoming"
                                                :total="upcomingTourItems" :showSizeChanger="false"
                                                :pageSize="tournamentPageSize" show-less-items
                                                @change="handleUpcomingPage" />
                                        </sdCards>
                                        <sdCards v-show="tab.id == 1 && selectState == 'ended'"
                                            class="challenge-pagination">
                                            <a-pagination v-model="currentPageState.tournament.ended"
                                                :total="endedTourItems" :showSizeChanger="false"
                                                :pageSize="tournamentPageSize" show-less-items
                                                @change="handleEndedChange" />
                                        </sdCards>
                                        <sdCards v-show="tab.id == 2" class="challenge-pagination">
                                            <a-pagination v-model="currentPageState.solo.current" :total="soloTotalItems"
                                                :showSizeChanger="false" :pageSize="soloPageSize" show-less-items
                                                @change="handleSoloPageChange" />
                                        </sdCards>
                                    </div>
                                </a-tab-pane>
                            </a-tabs>
                            <ModalTournamentInfo :visible="modalTournamentInfoState.visible"
                                :modalInfoState="currentTournamentInfo" :type="modalTournamentInfoState.type"
                                :on-cancel="handleTournamentModalCancel" :handleViewDetail="handleViewDetail" :handleRegistration="handleRegistration"/>
                        </div>
                    </a-col>
                    <a-col :xxl="6" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
                        <div class="ranking-top">
                            <div class="ranking-title">
                                <h2 style="margin-bottom: 8px;">Bảng xếp hạng</h2>
                            </div>
                            <a-list :item-layout="'horizontal'" :dataSource="selectTopRankingUsers">
                                <template #renderItem="{ item }">
                                    <div class="ranking-user"
                                        :style="{ 'border-color': getRankingStyle(item.order).color }">
                                        <div class="ranking-user-avatar">
                                            <img :src="item.avatar" alt="Avatar" />
                                        </div>
                                        <div class="ranking-user-meta">
                                            <h3 class="ranking-user-title"
                                                :style="{ color: getRankingStyle(item.order).color }">
                                                <img v-if="getRankingStyle(item.order).icon"
                                                    :src="getRankingStyle(item.order).icon" alt="Ranking Icon"
                                                    class="ranking-medal" />
                                                <span v-else>{{ `${item.order}.` }}</span>
                                                {{ item.name }}
                                            </h3>
                                            <p class="ranking-user-description">{{ `Elo: ${item.elo} | Attended:
                                                                                            ${item.attended}` }}</p>
                                        </div>
                                    </div>
                                </template>
                            </a-list>
                            <Buttons class="btn-ranking-view" type="primary" @click="toggleViewMore">{{ viewMore ? 'Ẩn bớt'
    : 'Xem thêm' }}</Buttons>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </Main>
    </div>
</template>
  
<script setup lang="ts">
//import
import { ref, computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { BreadcrumbWrapperStyle } from "@/views/uiElements/ui-elements-styled";
import { Main } from '@/views/styled';
// import { TabBasic, Child } from "@/components/tabs/Style";
import ChallengeCard from "./ChallengeCard.vue";
import Buttons from "@/components/buttons/Buttons.vue"
import ModalCreateChallenge from "./ModalCreateChallenge.vue";
import ModalTournamentInfo from './ModalTournamentInfo.vue';
import ChallengeEnter from './ChallengeEnter.vue';
const router = useRouter();

//props 

// DATA
// Dữ liệu mẫu cho phần Tạo thử thách
const challengeItems = [
    {
        id: 1,
        title: "Giải đấu",
        desc: "Tạo giải đấu nhiều người với nhiều phần thưởng hấp dẫn",
        backgroundImage: './src/assets/images/card_1.png',
        btnText: "Tạo giải đấu"
    },
    {
        id: 2,
        title: "Solo",
        desc: "So tài code với bạn bè và người khác",
        backgroundImage: './src/assets/images/card_2.png',
        btnText: "Tạo trận"
    },
    {
        id: 3,
        title: "Luyện tập",
        desc: "Luyện tập code không giới hạn",
        backgroundImage: './src/assets/images/card_3.png',
        btnText: "Tạo trận"
    },
];
// tabs
const tabs = [
    {
        id: 1,
        label: "Giải đấu",
    },
    {
        id: 2,
        label: "Solo",
    },
];

// Dữ liệu mẫu cho phần Thử thách đang diễn ra
const challengeInProgress = {
    tournament: [
        {
            id: 1,
            title: "Đấu Đỉnh Cao",
            name: 'dau-dinh-cao',
            banner: "https://www.educative.io/v2api/editorpage/4994081693368320/image/5898426517553152",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Một cuộc thi lập trình hứa hẹn mang đến những thách thức đỉnh cao, đang diễn ra và đầy kịch tính.",
            roundTotal: 10,
            currentRound: 8,
            attendeesLimit: 20,
            attendeesNumber: 17,
            rate: true,
        },
        {
            id: 2,
            title: "Thách Thức Javascript",
            name: 'thach-thuc-javascript',
            banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQMLuifSah0usaRn7fOECqqWBgqgpEm55hbpJXGaxu0MzDaXu2L1_aoRpBQlcqBTPONfE&usqp=CAU",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Nơi thách thức tài năng lập trình JavaScript với 10 vòng đấu.Đang diễn ra, hãy đăng ký ngay!",
            roundTotal: 10,
            currentRound: 6,
            attendeesLimit: 25,
            attendeesNumber: 18,
            rate: true,
        },
        {
            id: 3,
            title: "Cuộc Chiến Amazon",
            name: 'cuoc-chien-amazon',
            banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8whzhPJABWoYdBCzER28v-vUJR0M7GCkydR7npLW7m_jCECdon1V8jQHCl-DZEcAsG0&usqp=CAU",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp diễn ra, cuộc đấu đầy thách thức liên quan đến các vấn đề thực tế của Amazon. Hãy sẵn sàng cho hành trình!",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 15,
            attendeesNumber: 0,
            rate: true,
        },
        {
            id: 4,
            title: "CodeMasters Challenge",
            name: 'codeMasters-challenge',
            banner: "https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp diễn ra, cuộc đua giữa những chuyên gia lập trình hàng đầu. Hãy chuẩn bị cho thách thức lớn!",
            roundTotal: 12,
            currentRound: 0,
            attendeesLimit: 30,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 5,
            title: "Giải Đấu SQL",
            name: 'giai-dau-sql',
            banner: "https://raw.githubusercontent.com/sqlchat/sqlchat/main/public/banner.webp",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp diễn ra, cuộc đua giữa những chuyên gia lập trình hàng đầu. Hãy chuẩn bị cho thách thức lớn!",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 25,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 6,
            title: "Hành Trình DevOps",
            name: 'hanh-trinh-devops',
            banner: "https://static.vecteezy.com/system/resources/previews/011/166/144/original/devops-banner-web-icon-illustration-concept-for-software-engineering-and-development-with-an-icon-of-a-plan-code-build-test-release-deploy-operate-and-monitor-vector.jpg",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp diễn ra, cuộc đua giữa những chuyên gia lập trình hàng đầu. Hãy chuẩn bị cho thách thức lớn!",
            roundTotal: 15,
            currentRound: 0,
            attendeesLimit: 15,
            attendeesNumber: 0,
            rate: true,
        },
        {
            id: 7,
            title: "Kĩ thuật thực nghiệm code",
            name: 'ki-thuat-thuc-nghiem-code',
            banner: "https://assets.leetcode.com/contest/weekly-contest-374/card_img_1700975397.png",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp diễn ra, cuộc đua giữa những chuyên gia lập trình hàng đầu. Hãy chuẩn bị cho thách thức lớn!",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 50,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 8,
            title: "Lập Trình Cùng Nhau",
            name: 'lap-trinh-cung-nhau',
            banner: "https://as1.ftcdn.net/v2/jpg/03/34/08/56/1000_F_334085607_sEmtAJfRwpR3GTV2gcE1TJtp9W9SLcr3.jpg",
            startTime: "2023-11-09 10:00 AM",
            status: "ended",
            shortDescription: "Đã kết thúc, sự kiện lập trình độc đáo với 10 vòng đấu đã thu hút ",
            roundTotal: 10,
            currentRound: 10,
            attendeesLimit: 20,
            attendeesNumber: 17,
            rate: true,
        },
        {
            id: 9,
            title: "Thách Thức HackerRank",
            name: 'thach-thuc-hackerRank',
            banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnuVnHrtRouWTFgSkjp49VZal0bT3crXyWrA&usqp=CAU",
            startTime: "2023-11-09 10:00 AM",
            status: "ended",
            shortDescription: "Đã kết thúc, sự kiện lập trình độc đáo với 12 vòng đấu đã thu hút ",
            roundTotal: 12,
            currentRound: 12,
            attendeesLimit: 25,
            attendeesNumber: 20,
            rate: true,
        },
        {
            id: 10,
            title: "Đại Chiến Strings",
            name: 'dai-chien-strings',
            banner: "https://cdn-blog.28tech.com.vn/media/c%2B%2B%20tutorial/string/string%20trong%20cpp.png",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Đang diễn ra, đối đầu với các thách thức xử lý chuỗi trong 8 vòng. Hãy tham gia và chứng minh tài năng của bạn!",
            roundTotal: 8,
            currentRound: 4,
            attendeesLimit: 15,
            attendeesNumber: 12,
            rate: false,
        },
        {
            id: 11,
            title: "Lãnh Thổ Code Phương Đông",
            name: 'lanh-tho-code-phuong-dong',
            banner: "https://img.freepik.com/premium-vector/web-development-coding-programming-futuristic-banner-computer-code-laptop_3482-5582.jpg",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Một cuộc thi lập trình hấp dẫn, đang diễn ra với 10 vòng đấu. Thách thức kiến thức và kỹ năng của bạn trong không khí đầy phong cách Phương Đông.",
            roundTotal: 10,
            currentRound: 5,
            attendeesLimit: 25,
            attendeesNumber: 20,
            rate: false,
        },
        {
            id: 12,
            title: "Lập Trình Nghệ Thuật",
            name: 'lap-trinh-nghe-thuat',
            banner: "https://repository-images.githubusercontent.com/72586805/05dd0b80-6b7c-11e9-9cf5-15d6d7efb700",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, cuộc thi lập trình nghệ thuật với 8 vòng đấu. Một nơi để biểu diễn sự sáng tạo của bạn thông qua mã nguồn.",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 15,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 13,
            title: "Nghệ Sĩ Code Đỉnh Cao",
            name: 'nghe-si-code-dinh-cao',
            banner: "https://assets.leetcode.com/contest/weekly-contest-291/card_img_1654267951.png",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, sân khấu cho những nghệ sĩ lập trình xuất sắc. Hãy sẵn sàng để chứng minh đẳng cấp của bạn.",
            roundTotal: 10,
            currentRound: 0,
            attendeesLimit: 20,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 14,
            title: "Combat C++ Code",
            name: 'combat-c++-code',
            banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmPg_cp3mS-_HdcWIjflEV09hNPxLI-E5k4Jupb2uILcuJt7V_6ekRLURuk5uGFxfq1mg&usqp=CAU",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Đang diễn ra, cuộc đấu với 12 vòng thách thức cho các chiến binh lập trình C++. Hãy thể hiện sức mạnh của bạn!",
            roundTotal: 12,
            currentRound: 8,
            attendeesLimit: 30,
            attendeesNumber: 25,
            rate: false,
        },
        {
            id: 15,
            title: "Đấu trí trí tuệ nhân tạo",
            name: 'dau-tri-tri-tue-nhan-tao',
            banner: "https://c8.alamy.com/comp/RPM14T/artificial-intelligence-abstract-concept-banner-digital-mind-analyzes-data-information-ai-connection-with-neural-network-solves-business-tasks-RPM14T.jpg",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Đang diễn ra, cuộc đối đầu thông minh với trí tuệ nhân tạo qua 10 vòng đấu. Hãy thách thức bản thân và máy tính!",
            roundTotal: 10,
            currentRound: 6,
            attendeesLimit: 20,
            attendeesNumber: 18,
            rate: false,
        },
        {
            id: 16,
            title: "Đại Chiến Sửa Lỗi Mã",
            name: 'dai-chien-sua-loi-ma',
            banner: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/281651325/original/0972de277750b649ebd7f8dec9ce2363cd3041d0/fix-your-website-bugs.png",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, cuộc chiến chống lại lỗi mã với 8 vòng đấu. Hãy chuẩn bị cho cuộc hành trình khám phá và sửa lỗi!",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 15,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 17,
            title: "Thử Nghiệm TestCraft",
            name: 'thu-nghiem-testcraft',
            banner: "https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2020_08_Software-Testing-Interview-Questions.jpg",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, bảng thử nghiệm với 10 vòng đấu. Hãy trải nghiệm và kiểm chứng kỹ năng kiểm thử của bạn!",
            roundTotal: 10,
            currentRound: 0,
            attendeesLimit: 20,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 18,
            title: "Đấu Trí UI/UX",
            name: 'dau-tri-ui-ux',
            banner: "https://s3-us-west-2.amazonaws.com/aa.techdemand.io/wp-content/uploads/2023/06/20201459/UI-1024x614.png",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, đối đầu với thách thức thiết kế giao diện và trải nghiệm người dùng trong 8 vòng đấu.",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 15,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 19,
            title: "Giải Đấu Dynamic Programming",
            name: 'giai-dau-Dynamic-Programming',
            banner: "https://assets.leetcode.com/contest/biweekly-contest-85/card_img_1659801683.png",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, đấu trí với các bài toán quy hoạch động qua 10 vòng đấu. Hãy thể hiện sự linh hoạt của bạn!",
            roundTotal: 10,
            currentRound: 0,
            attendeesLimit: 20,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 20,
            title: "Cuộc Đua Lập Trình C# Velocity",
            name: 'cuoc-dua-lap-trinh-c#-velocity',
            banner: "https://repository-images.githubusercontent.com/142085119/ea2c0680-cc17-11eb-894c-501560eca79b",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, cuộc đua với tốc độ lập trình C# trong 8 vòng đấu. Hãy làm nhanh và chính xác!",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 15,
            attendeesNumber: 0,
            rate: false,
        },
        {
            id: 21,
            title: "Thuật Toán Vô Song",
            name: 'thuat-toan-vo-song',
            banner: "https://assets.leetcode.com/study_plan_v2/programming-skills/cover",
            startTime: "2023-11-09 10:00 AM",
            status: "ended",
            shortDescription: "Đã kết thúc, cuộc thi thuật toán với 10 vòng đấu đã chứng kiến sự đỉnh cao của các bậc thầy thuật toán.",
            roundTotal: 10,
            currentRound: 10,
            attendeesLimit: 20,
            attendeesNumber: 20,
            rate: false,
        },
        {
            id: 22,
            title: "Sàn Đấu FullStack",
            name: 'san-dau-fullstack',
            banner: "https://www.sazanconsulting.com/wp-content/uploads/2014/04/AAEAAQAAAAAAAAedAAAAJDMzNDYxN2I5LThmYTQtNDAxYy05OTc4LWEwN2E3YTdlY2EyZg.jpg",
            startTime: "2023-11-09 10:00 AM",
            status: "ended",
            shortDescription: "Đã kết thúc, cuộc đua FullStack với 10 vòng đấu đã chứng kiến sự xuất sắc của những người lập trình toàn diện.",
            roundTotal: 10,
            currentRound: 10,
            attendeesLimit: 25,
            attendeesNumber: 25,
            rate: true,
        },
        {
            id: 23,
            title: "Mê Cung Mã Lệnh",
            name: 'me-cung-ma-lenh',
            banner: "https://media.istockphoto.com/id/996484184/vector/isometric-programmer-coding-new-project-sitting-on-computer-with-command-line-web-development.jpg?s=612x612&w=0&k=20&c=sQph1gA5gNwZN8gCql4Lpc4RtsiSSWkqcEsiR_RL3Ug=",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Đang diễn ra, một cuộc phiêu lưu trong mê cung mã lệnh với 12 vòng đấu. Hãy khám phá và tìm đường thoát!",
            roundTotal: 12,
            currentRound: 6,
            attendeesLimit: 30,
            attendeesNumber: 25,
            rate: true,
        },
        {
            id: 24,
            title: "Lập trình viên siêu cấp",
            name: 'lap-trinh-vien-sieu-cap',
            banner: "https://yt3.googleusercontent.com/A0i8xdbzNoYrO6dGSoS3eBPUAnhKmU9MDXtS0xI2kD6buLEi8klyPfLpIkmUkhOiZ4mEAj6wSQ=s900-c-k-c0x00ffffff-no-rj",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Đang diễn ra, cuộc chiến giữa những lập trình viên siêu cấp qua 10 vòng đấu. Hãy chứng minh bạn là người xuất sắc nhất!",
            roundTotal: 10,
            currentRound: 4,
            attendeesLimit: 20,
            attendeesNumber: 18,
            rate: true,
        },
        {
            id: 25,
            title: "Lập Trình Nghệ Thuật",
            name: 'lap-trinh-nghe-thuat',
            banner: "https://repository-images.githubusercontent.com/72586805/05dd0b80-6b7c-11e9-9cf5-15d6d7efb700",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, cuộc thi lập trình nghệ thuật với 8 vòng đấu. Một nơi để biểu diễn sự sáng tạo của bạn thông qua mã nguồn.",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 15,
            attendeesNumber: 0,
            rate: true,
        },
        {
            id: 26,
            title: "Nghệ Sĩ Code Đỉnh Cao",
            name: 'nghe-si-code-dinh-cao',
            banner: "https://assets.leetcode.com/contest/weekly-contest-291/card_img_1654267951.png",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, sân khấu cho những nghệ sĩ lập trình xuất sắc. Hãy sẵn sàng để chứng minh đẳng cấp của bạn.",
            roundTotal: 10,
            currentRound: 0,
            attendeesLimit: 20,
            attendeesNumber: 0,
            rate: true,
        },
        {
            id: 27,
            title: "Chinh Phục API",
            name: 'chinh-phuc-api',
            banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxPl-Ki8e6GGvAJwc303g00R5LtgvjOwgIt8iSbnO9U7HuAtKTVLfRhR_BUL_QtvoPU6E&usqp=CAU",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Đang diễn ra, cuộc đua chinh phục API với 12 vòng đấu. Hãy kiểm tra và làm chủ các giao diện lập trình ứng dụng!",
            roundTotal: 12,
            currentRound: 8,
            attendeesLimit: 30,
            attendeesNumber: 25,
            rate: true,
        },
        {
            id: 28,
            title: "Tranh Tài ReactJS",
            name: 'tranh-tai-ReactJS',
            banner: "https://kinsta.com/wp-content/uploads/2022/06/what-is-react-js-feature-image-1024x512.png",
            startTime: "2023-11-09 10:00 AM",
            status: "happening",
            shortDescription: "Đang diễn ra, cuộc tranh tài sôi động về ReactJS qua 10 vòng đấu. Hãy thể hiện kỹ năng của bạn trong lập trình giao diện người dùng!",
            roundTotal: 10,
            currentRound: 6,
            attendeesLimit: 25,
            attendeesNumber: 20,
            rate: true,
        },
        {
            id: 29,
            title: "Đại Hội Dev: C# vs. Java",
            name: 'dai-hoi-dev-c#vs-java',
            banner: "https://www.nilebits.com/wp-content/uploads/2022/09/C-vs-Java-What-To-Choose-For-Your-Next-Application-1140x445.png",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, cuộc so tài giữa C# và Java với 8 vòng đấu. Hãy lựa chọn hệ sinh thái lập trình của bạn!",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 15,
            attendeesNumber: 0,
            rate: true,
        },
        {
            id: 30,
            title: "JavaFX Đấu Trí",
            name: 'JavaFX-dau-tri',
            banner: "https://cloud.z.com/vn/wp-content/uploads/2023/06/word-image-68490-5.png",
            startTime: "2023-11-09 10:00 AM",
            status: "upcoming",
            shortDescription: "Sắp tới, cuộc đấu trí sôi động với JavaFX qua 8 vòng đấu. Hãy thể hiện tài năng lập trình của bạn trên nền tảng Java!",
            roundTotal: 8,
            currentRound: 0,
            attendeesLimit: 20,
            attendeesNumber: 12,
            rate: true,
        },
    ],
    solo: Array.from({ length: 70 }, (_, index) => ({
        id: index + 1,
        title: `Trận solo ${index + 1}`,
        banner: "https://assets.leetcode.com/contest/weekly-contest-290/card_img_1654267980.png",
        startTime: "2023-11-09 10:00 AM",
        status: "10 phút",
        shortDescription: null,
        roundTotal: null,
        currentRound: null,
        attendeesLimit: null,
        attendeesNumber: null,
        rate: true,
    })),
};
const tournamentCode = [
    { id: 1, code: '#46812' },
    { id: 2, code: '#72594' },
    { id: 3, code: '#83647' },
    { id: 4, code: '#15983' },
    { id: 5, code: '#24680' },
    { id: 6, code: '#57231' },
    { id: 7, code: '#90314' },
    { id: 8, code: '#46809' },
    { id: 9, code: '#78534' },
    { id: 10, code: '#62489' },
    { id: 11, code: '#10257' },
    { id: 12, code: '#89346' },
    { id: 13, code: '#43678' },
    { id: 14, code: '#71928' },
    { id: 15, code: '#36501' },
    { id: 16, code: '#98453' },
    { id: 17, code: '#65237' },
    { id: 18, code: '#84715' },
    { id: 19, code: '#53169' },
    { id: 20, code: '#20874' },
    { id: 21, code: '#96428' },
    { id: 22, code: '#38156' },
    { id: 23, code: '#57429' },
    { id: 24, code: '#68320' },
    { id: 25, code: '#42695' },
    { id: 26, code: '#81903' },
    { id: 27, code: '#27584' },
    { id: 28, code: '#69037' },
    { id: 29, code: '#14389' },
    { id: 30, code: '#50762' },
];
// Dữ liệu mẫu cho top ranking
const topRankingUsers = Array.from({ length: 20 }, (_, index) => ({
    order: index + 1,
    avatar: `https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/users/tsreaper/avatar_1627139236.png`,
    name: `User ${index + 1}`,
    elo: "1500",
    attended: "2000",
}));

//REFS
let activeTabKey = ref(1);
const tournamentPageSize = ref(6);
const soloPageSize = ref(6);

let viewMore = ref(false);

//formstate
const joinInputState = reactive({
    value: '',
})
const modalCreateChallengeState = reactive({
    currentModalID: 0,
    formState: computed(() => {
        switch (modalCreateChallengeState.currentModalID) {
            case 1:
                return tournamentFormState;
            case 2:
                return soloFormState;
            case 3:
                return trainFormState;
            default:
                return tournamentFormState;
        }
    }),
    visible: false,
    type: 'primary',
});
const tournamentFormState = reactive({
    challengeName: '',
    shortDesc: '',
    start: '',
    end: '',
    level: 'easy',
    language:'csharp',
    attendLimit: 'limit1',
    minElo: 'minElo1',
    timeLimit: 'time1',
    testNumber: 'testNumber1',
    prize: 'prize1',
    apiUpload: '',
    bannerFile: [],
});
const soloFormState = reactive({
    challengeName: '',
    level: 'easy',
    timeLimit: 'time1',
    language:'csharp',
    testNumber: 'testNumber1',
    eloRating: 'elo',
    public: true,
});
const trainFormState = reactive({
    challengeName: '',
    level: 'easy',
    timeLimit: 'time1',
    language:'csharp',
    testNumber: 'testNumber1',
});

let selectState = ref('happening');
const currentPageState = reactive({
    tournament: {
        happening: 1,
        upcoming: 1,
        ended: 1
    },
    solo: {
        current: 1
    }
})
const modalTournamentInfoState = reactive({
    type: 'primay',
    visible: false,

})
// MOUNTED
onMounted(() => {
    
});
//COMPUTED

const happeningTourItems = computed(() => {
    const items = challengeInProgress.tournament;
    return items.filter(item => item.status === 'happening').length;
});
const upcomingTourItems = computed(() => {
    const items = challengeInProgress.tournament;
    return items.filter(item => item.status === 'upcoming').length;
});
const endedTourItems = computed(() => {
    const items = challengeInProgress.tournament;
    return items.filter(item => item.status === 'ended').length;
});
const soloTotalItems = computed(() => {
    const items = challengeInProgress.solo;
    return items.length;
});
const displayHappeningTour = computed(() => {
    const currentPage = currentPageState.tournament.happening;
    const items = challengeInProgress.tournament;
    const startIndex = (currentPage - 1) * soloPageSize.value;
    const endIndex = startIndex + soloPageSize.value;
    return items.filter(item => item.status === 'happening').slice(startIndex, endIndex);
});

const displayUpcomingTour = computed(() => {
    const currentPage = currentPageState.tournament.upcoming;
    const items = challengeInProgress.tournament;
    const startIndex = (currentPage - 1) * soloPageSize.value;
    const endIndex = startIndex + soloPageSize.value;
    return items.filter(item => item.status === 'upcoming').slice(startIndex, endIndex);
});

const displayEndedTour = computed(() => {
    const currentPage = currentPageState.tournament.ended;
    const items = challengeInProgress.tournament;
    const startIndex = (currentPage - 1) * soloPageSize.value;
    const endIndex = startIndex + soloPageSize.value;
    return items.filter(item => item.status === 'ended').slice(startIndex, endIndex);
});

const displaySoloItem = computed(() => {
    const items = challengeInProgress.solo;
    const startIndex = (currentPageState.solo.current - 1) * soloPageSize.value;
    const endIndex = startIndex + soloPageSize.value;
    return items.slice(startIndex, endIndex);
});

const selectTopRankingUsers = computed(() => {
    return viewMore.value ? topRankingUsers : topRankingUsers.slice(0, 10);
});
const currentTournamentInfo = ref({ name: '', id: '', matchingCode: '', tournamentUrl: '' });
//METHODS

const joinChallengeById = () => {

}
const showModalCreateChallenge = (id: number) => {
    modalCreateChallengeState.currentModalID = id;
    modalCreateChallengeState.visible = true;
}
const createChallenge = (id: number) => {
    switch (id) {
        case 1:
            const createTournamentData = {
                challengeName: tournamentFormState.challengeName,
                shortDesc: tournamentFormState.shortDesc,
                start: tournamentFormState.start,
                end: tournamentFormState.end,
                level: tournamentFormState.level,
                challengeTime: tournamentFormState.timeLimit,
                bannerFile: tournamentFormState.bannerFile,
                language: tournamentFormState.language,
                minElo: tournamentFormState.minElo,
                testNumber: tournamentFormState.testNumber,
                prize: tournamentFormState.prize,
            }
            console.log(createTournamentData);
            break;
        case 2:
            const createSoloData = {
                challengeName: soloFormState.challengeName,
                level: soloFormState.level,
                challengeTime: soloFormState.timeLimit,
                language: soloFormState.language,
                testNumber: soloFormState.testNumber,
                eloRating: soloFormState.eloRating,
                public: soloFormState.public,
            }
            console.log(createSoloData);
            break;
        case 3:
            const createTrainData = {
                challengeName: trainFormState.challengeName,
                level: trainFormState.level,
                challengeTime: trainFormState.timeLimit,
                language: trainFormState.language,
                testNumber: trainFormState.testNumber,
            }
            console.log(createTrainData);
            break;
        default:
            break;
    }

    setTimeout(() => {
        modalCreateChallengeState.visible = false;
    }, 1000);
}
const handleModalCreateCancel = () => {
    modalCreateChallengeState.visible = false;
}
const handleHappeningPage = (page: any) => {
    currentPageState.tournament.happening = page;
};
const handleUpcomingPage = (page: any) => {
    currentPageState.tournament.upcoming = page;
};
const handleEndedChange = (page: any) => {
    currentPageState.tournament.ended = page;
};
const handleSoloPageChange = (page: any) => {
    currentPageState.solo.current = page;
};
const currentUrl = window.location.href;
const showInfo = (clickedItem: any) => {
    if (activeTabKey.value == 1) {
        currentTournamentInfo.value = { ...clickedItem };
        currentTournamentInfo.value.matchingCode = tournamentCode.find(code => code.id === clickedItem.id)?.code ?? '';
        currentTournamentInfo.value.tournamentUrl = `${currentUrl}/giaidau/${clickedItem.id}`;
        showTournamentModal();
    }
    else return;
}
const handleViewDetail = () => {
    router.push({ name: 'tournament-detail', params: { id: currentTournamentInfo.value.id } })
}
const showTournamentModal = () => {
    modalTournamentInfoState.visible = true;
}
const handleTournamentModalCancel = () => {
    modalTournamentInfoState.visible = false;
    currentTournamentInfo.value = { name: '', id: '' , matchingCode: '', tournamentUrl: ''};
}
const toggleViewMore = () => {
    viewMore.value = !viewMore.value;
}
const handleChangeSelectStatus = () => {
}

const getRankingStyle = (order: any) => {
    let color, icon;
    switch (order) {
        case 1:
            color = '#feaa2b';
            icon = 'https://cdn-icons-png.flaticon.com/512/5406/5406792.png';
            break;
        case 2:
            color = '#9e9e9e';
            icon = 'https://cdn-icons-png.flaticon.com/512/2583/2583319.png';
            break;
        case 3:
            color = '#ce7430';
            icon = 'https://cdn-icons-png.flaticon.com/512/2583/2583434.png';
            break;
        default:
            color = '#000000';
    }
    return { color, icon };
};
const handleRegistration = () => {

}
</script>

<style scoped>
/* css breadcrumb mặc định */
:global(.challenge-container .ant-breadcrumb .ant-breadcrumb-link a) {
    color: black !important;
}

:global(.challenge-container .ant-breadcrumb .ant-breadcrumb-link .router-link-active) {
    color: #E65A2B !important;
}

/* css pagination */
:global(.challenge-container .ant-pagination-disabled button) {
    cursor: default !important;
}

:global(.challenge-container .ant-pagination-prev.ant-pagination-disabled button svg) {
    fill: #9299b8 !important;
}

:global(.challenge-container .ant-pagination-next.ant-pagination-disabled button svg) {
    fill: #9299b8 !important;
}

:global(.challenge-container .ant-pagination-prev button svg) {
    fill: black !important;
}

:global(.challenge-container .ant-pagination-next button svg) {
    fill: black !important;
}

:global(.challenge-container .truncate-text) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
}

:global(.challenge-container .ant-tabs.ant-tabs-top) {
    position: relative;
}

:global(div.challenge-info > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-24.ant-col-lg-24.ant-col-xl-16.ant-col-xxl-18 > figure > div) {
    margin-bottom: 0 !important;
}
:global(.challenge-container .ant-btn-primary) {
    background-color: #0c4e99 !important;
}
:global(.challenge-container .ant-btn-primary:hover, .challenge-container .ant-btn-primary:focus),
:global(.challenge-container .fEJzIv.fEJzIv:hover,.challenge-container .fEJzIv.fEJzIv:focus) {
    background-color: #0c4e99 !important;
}


:global(.challenge-container .fiLpOL.fiLpOL) {
    background-color: #E65A2B !important;
}
:global(.challenge-container .fiLpOL.fiLpOL:hover, .challenge-container .fiLpOL.fiLpOL:focus) {
    background-color: #ffae42 !important;
}
:global(.challenge-container .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn),
:global(.challenge-container .ant-tabs-tab:hover){
    color: #0c4e99;
}
.challenge-container {
    padding-top: 1rem;
}
:global(.lmeiNC .ant-pagination-item-active a)  {
    background-color: #0c4e99;
}
.challenge-inprogress,
.ranking-top {
    padding: 12px 24px 24px;
    margin-top: 12px;
    /* background-color: white; */
    border-radius: 12px;
    /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
}
.ranking-top {
    background-color: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
/* .join-challenge {
    padding: 24px;
} */
.create-challenge {
    margin-top: 1.5rem;
}

.ant-tabs-tabpane {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tab-content {
    flex-grow: 1;
    width: 100%;
}

.tab-label {
    font-size: 1.25rem;
}

.challenge-inprogress {
    margin-top: 2rem;
    padding: 0;
}

.select-status {
    width: 8.75rem;
    align-self: flex-start;
    position: absolute;
    top: 4px;
    right: 4px;
}

.challenge-inprogress-card {
    display: flex;
    align-items: center;
    background-color: #f5eefb;
    border-radius: 10px;
    padding-right: 10px;
    border: 1px solid #d5acfa;
}

.challenge-inprogress-card:hover {
    background-color: #f1e4fc;
    opacity: 0.85;
}

.challenge-info {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
}

.challenge-inprogress-info {
    display: flex;
    flex-grow: 1;
}

.challenge-inprogress-detail,
.challenge-inprogress-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.challenge-inprogress-detail {
    align-items: start;
}

.challenge-inprogress-info:hover {
    cursor: pointer;
}

.challenge-inprogress-info:hover h3 {
    color: #E65A2B;
}


.challenge-inprogress-img {
    display: block;
    background-image: url("https://media.istockphoto.com/id/1308682666/vector/blue-gradient-soft-background.jpg?s=612x612&w=0&k=20&c=CBSD2BDe2uMi-Zm65ny6KoPKXsTPdk5K8wt_vMIb3Hc=");
    object-fit: cover;
    border-radius: 6px;
    margin-right: 16px;
}
.challenge-pagination {
    background-color: transparent;
}
.ranking-top {
    display: flex;
    flex-direction: column;
}

.ranking-title {
    align-self: center;
    margin-bottom: 6px;
}

.ranking-user {
    display: flex;
    align-items: center;
    padding: 11px;
    border-bottom: 1px solid #e8e8e8 !important;
}

.ranking-user:hover {
    cursor: pointer;
    opacity: 0.85;
}

.ranking-user:hover .ranking-user-title {
    color: #0c4e99;
}

.ranking-user-avatar img {
    width: 3.125rem;
    height: 3.125rem;
    border-radius: 50%;
}

.ranking-user-meta {
    margin-left: 16px;
}

.ranking-user-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 8px;
    margin-top: 10px;
}

.ranking-user-description {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 4px;
}

.ranking-medal {
    width: 1.875rem;
}


:global(.challenge-inprogress-card .ant-progress-text) {
    padding-right: 1.2rem;
}

/* responsive */
@media (max-width: 576px) {
    .lmeiNC {
        padding: 0.5rem;
    }

    .challenge-container {
        padding-left: 0;
        padding-right: 0;
    }

    .challenge-inprogress-img {
        width: 100%;
        aspect-ratio: 16/9;
    }

    .challenge-inprogress-card {
        flex-direction: column;
        padding-right: 0;
    }

    .challenge-inprogress-info {
        width: 100%;
        flex-direction: column;
        flex-grow: 1;
    }

    .challenge-inprogress-detail {
        align-items: center;
        align-self: center;
    }
    :global(div.tab-content > div > div > div > div > div) {
        display: flex !important;
        justify-content: center;
        padding-bottom: 10px;
    }
}

/* Small screens (sm) */
@media (min-width: 576px) and (max-width: 767px) {
    .lmeiNC {
        padding: 0.5rem;
    }

    .challenge-container {
        padding-left: 0;
        padding-right: 0;
    }

    .challenge-inprogress-img {
        width: 100%;
        aspect-ratio: 16/9;
    }

    .challenge-inprogress-card {
        flex-direction: column;
        padding-right: 0;
    }

    .challenge-inprogress-info {
        width: 100%;
        flex-direction: column;
        flex-grow: 1;
    }

    .challenge-inprogress-detail {
        align-items: center;
        align-self: center;
    }
    :global(div.tab-content > div > div > div > div > div) {
        display: flex !important;
        justify-content: center;
        padding-bottom: 10px;
    }
}

/* Medium screens (md) */
@media (min-width: 768px) and (max-width: 991px) {
    .challenge-inprogress-img {
        width: 25vw;
        aspect-ratio: 16/9;
    }
    .ant-tabs-tabpane {
        min-height: calc(90vw + 11rem);   
    }
}

/* Large screens (lg) */
@media (min-width: 992px) and (max-width: 1199px) {
    .challenge-inprogress-img {
        width: 20vw;
        aspect-ratio: 16/9;
    }
    .ant-tabs-tabpane {
        min-height: calc(74vw + 9rem);   
    }
}

/* Extra-large screens (xl) */
@media (min-width: 1200px) and (max-width: 1599px) {
    .challenge-enter-title {
        font-size: 1.6rem;
    }
    .challenge-inprogress-img {
        width: 15vw;
        aspect-ratio: 16/9;
    }
    .ant-tabs-tabpane {
        min-height: calc(58vw + 6rem);   
    }
}

/* Extra-extra-large screens (xxl) */
@media (min-width: 1600px) {
    .challenge-inprogress-img {
        width: 12vw;
        aspect-ratio: 16/9;
    }
    .ant-tabs-tabpane {
        min-height: calc(27vw + 2.5rem);   
    }
}
</style>