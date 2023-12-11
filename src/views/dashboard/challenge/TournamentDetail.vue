<template>
    <div class="tournament-detail-container">
        <Main>
            <BreadcrumbWrapperStyle>
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link to="/">Home</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link to="/thuthach">Thử thách</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link to="/thuthach/giaidau">Giải đấu</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link :to="`/thuthach/giaidau/${tournament?.id}`">{{ tournament?.title }}</router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </BreadcrumbWrapperStyle>
            <div class="tournament-detail-content">
                <div class="tournament-content">
                    <div class="tournament-banner">
                        <img :src="tournament?.banner" alt="Ảnh post">
                    </div>
                    <div class="tournament-info">
                        <a-row class="tournament-info-row">
                            <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                <h3 class="tournament-title" style="margin-bottom: 0;">
                                    {{ tournament?.title }}
                                </h3>
                            </a-col>
                            <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                <div>
                                    Mã giải đấu: {{ matchingCode }}
                                </div>
                            </a-col>
                        </a-row>
                        <a-row class="tournament-info-row">
                            <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                <div class="tournament-attended">
                                    Số người: {{ tournament?.attendeesNumber }}/{{ tournament?.attendeesLimit }}
                                </div>
                            </a-col>
                            <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="24" :xs="24" class="tournament-invite">
                                <div style="display: flex;align-items: center; gap: 10px;">
                                    <div>
                                        Mời bạn bè tham gia:
                                    </div>
                                    <a-typography-paragraph :copyable="{ text: currentURL }"
                                        style="margin-top: 1rem; padding:4px 8px;border-radius: 20px;border: 2px solid #959595;color: #959595;">
                                        Link
                                    </a-typography-paragraph>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
                <div class="tournament-detail">
                    <a-row>
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24" class="tournament-detail-item">
                            Tổng số vòng đấu: {{ tournament?.roundTotal }}
                        </a-col>
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24" class="tournament-detail-item">
                            Vòng đấu hiện tại: {{ tournament?.currentRound }}
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24" class="tournament-detail-item">
                            Ngày bắt đầu: 26/11/2023
                        </a-col>
                        <a-col :xxl="12" :xl="12" :lg="12" :md="12" :sm="12" :xs="24" class="tournament-detail-item">
                            Ngày kết thúc: 26/12/2023
                        </a-col>
                    </a-row>
                    <div style="margin-top: 1rem; display: flex; justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="font-weight: 450;">Hàng chờ</div>
                            <div>
                                <a-select v-model:value="waitingSortState" style="width: 100%">
                                    <a-select-option value="latest">Mới nhất</a-select-option>
                                    <a-select-option value="oldest">Cũ nhất</a-select-option>
                                </a-select>
                            </div>
                        </div>
                        <div>
                            <a-button type="primary" shape="round">
                                Danh sách người chơi
                            </a-button>
                        </div>
                    </div>
                </div>
                <a-table class="table-responsive table-data" :pagination="pagination" :columns="columns" :data-source="data"
                    @change="handleChange">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'user'">
                            <div class="tournament-list-user">
                                <div>
                                    <img :src="record.avatarUrl" alt="avatar" class="tournament-user-avatar" />
                                </div>
                                <div class="tournament-user-list-detail">
                                    <h3 class="tournament-user-list-name">{{ record.fullName }}</h3>
                                    <p class="tournamnet-user-list-email">{{ record.email }}</p>
                                </div>
                            </div>
                        </template>
                        <template v-if="column.key === 'operator'">
                            <div v-if="isAccepted[record.userId]" class="tournament-list-operator">
                                <div>
                                    <sdButton type="primary" shape="round" @click="handleAccept(record.userId)">
                                        Đồng ý
                                    </sdButton>
                                </div>
                                <div>
                                    <sdButton type="danger" shape="round" @click="handleReject(record.userId)">
                                        Từ chối
                                    </sdButton>
                                </div>
                            </div>
                            <div v-else>
                                <div>
                                    <sdButton type="success" shape="round" disabled>
                                        Đã chấp thuận
                                    </sdButton>
                                </div>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </Main>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Main } from '@/views/styled';
import Mock from 'mockjs';
import { BreadcrumbWrapperStyle } from "@/views/uiElements/ui-elements-styled";
const router = useRoute();
// const acceptStatus = reactive
onMounted(() => {
})
const waitingSortState = ref('latest');
const columns = [
    {
        title: 'Người dùng',
        dataIndex: 'user',
        key: 'user',
        align: 'start'
    },
    {
        title: 'Danh hiệu',
        dataIndex: 'appellation',
        key: 'appellation',
        align: 'center',
        filters: [
            { text: 'Chiến thần', value: 'Chiến thần' },
            { text: 'Kỳ phùng địch thủ', value: 'Kỳ phùng địch thủ' },
            { text: 'Độc cô cầu bại', value: 'Độc cô cầu bại' },
            { text: 'Thách đấu', value: 'Thách đấu' },
        ],
        onFilter: (value: any, record: any) => {
            return record.appellation === value;
        }
    },
    {
        title: 'Elo Coding',
        dataIndex: 'eloCoding',
        key: 'eloCoding',
        align: 'center',
        sorter: (a: any, b: any) => a.eloCoding - b.eloCoding,
    },
    {
        title: 'Xếp hạng',
        dataIndex: 'order',
        key: 'order',
        align: 'center',
    },
    {
        title: 'Thao tác',
        dataIndex: 'operator',
        key: 'operator',
        align: 'center',
    },


];
const handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log('params', pagination, filters, sorter);
}
interface FakeData {
    id: number;
    data: {
        userId: string;
        order: number;
        fullName: string;
        eloCoding: number;
        appellation: string;
        contestEntered: number;
        email: string;
        avatarUrl: string;
    }[];
}

const tournamentData = [
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
]
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
const tournament = tournamentData.find(tour => tour.id === +router.params.id);
const matchingCode = tournamentCode.find(code => code.id === tournament?.id)?.code;
const currentURL = window.location.href;
const tournamentAttendeesLength = tournament?.attendeesNumber;
const minElo = 500;
const maxElo = 3000;
const generateFakeData = (): FakeData[] => {
    const dataSource: FakeData[] = [];

    for (let i = 1; i <= 30; i++) {
        const fakeData: FakeData = {
            id: i,
            data: Array.from({ length: tournamentAttendeesLength ?? 0 }, (_, j) => {
                const order = j + 1;
                const scalingFactor = (maxElo - minElo) / ((tournamentAttendeesLength || 1) - 1);
                const eloCoding = Math.round(maxElo - order * scalingFactor);
                return {
                    userId: Mock.mock('@id'),
                    order,
                    fullName: Mock.mock('@name'),
                    eloCoding,
                    appellation: Mock.mock('@pick(["Chiến thần", "Kỳ phùng địch thủ", "Độc cô cầu bại", "Thách đấu"])'),
                    contestEntered: Mock.mock('@integer(100, 1000)'),
                    email: Mock.mock('@email'),
                    avatarUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 1000) + 1}/200/200`,
                };
            }),
        };

        dataSource.push(fakeData);
    }

    return dataSource;
};

const dataInit = generateFakeData();
let data = ref(dataInit.find(data => data.id == +router.params.id)?.data);


const pagination = reactive({
    total: data.value?.length,
    current: 1,
    pageSize: 5,
    showSizeChanger: false,
    hideOnSinglePage: true,
    showLessItems: true,
    position: ['bottomCenter'],
    onChange: (page: any) => {
        pagination.current = page;
    }
});
interface AcceptedStatus {
    [key: string]: boolean;
}

const isAccepted = ref<AcceptedStatus>({});
data.value?.forEach(dataItem => {
    isAccepted.value[dataItem.userId] = true;
})
const handleAccept = (id: string) => {
    isAccepted.value[id] = false;
}
const handleReject = (id: string) => {
    data.value = data.value?.filter(item => item.userId !== id);
    pagination.total = data.value?.length;
}

</script>
<style scoped>
/* css pagination */
:global(.tournament-detail-container .ant-pagination-disabled button) {
    cursor: default !important;
}

:global(.tournament-detail-container .ant-pagination-prev.ant-pagination-disabled button svg) {
    fill: #9299b8 !important;
}

:global(.tournament-detail-container .ant-pagination-next.ant-pagination-disabled button svg) {
    fill: #9299b8 !important;
}

:global(.tournament-detail-container .ant-pagination-prev button svg) {
    fill: black !important;
}

:global(.tournament-detail-container .ant-pagination-next button svg) {
    fill: black !important;
}

:global(.tournament-detail-container .ant-breadcrumb .ant-breadcrumb-link a) {
    color: black !important;
}

:global(.tournament-detail-container .ant-breadcrumb .ant-breadcrumb-link .router-link-active) {
    color: #EB763C !important;
}

:global(.tournament-detail-container div::-webkit-scrollbar) {
    width: 6px;
}

:global(.tournament-detail-container div::-webkit-scrollbar-track) {
    background: #f1f1f1;
}

:global(.tournament-detail-container div::-webkit-scrollbar-thumb) {
    background: #dfdfdf;
    border-radius: 6px;
}

:global(.tournament-detail-container .ant-btn.ant-btn-primary.ant-btn-round) {
    background-color: #0C4E99;
    border-color: #0C4E99;
}

:global(.tournament-detail-container thead>tr>th.ant-table-cell) {
    background-color: #EB763C;
    color: #fff;
}

:global(.tournament-detail-container thead>tr>th.ant-table-cell:first-child) {
    border-top-left-radius: 8px !important;
}

:global(.tournament-detail-container thead>tr>th.ant-table-cell:last-child) {
    border-top-right-radius: 8px !important;
}

:global(.tournament-detail-container .ant-table-thead th.ant-table-column-has-sorters:hover) {
    background: #dd875c !important;
}

:global(.tournament-detail-container .ant-spin-container) {
    display: flex;
    flex-direction: column;
    min-height: 42.5rem;
}

:global(.tournament-detail-container .ant-table) {
    flex-grow: 1;
}

.tournament-detail-container {
    padding: 16px 30px 0;
}

.tournament-detail-content {
    height: 75vh;
    overflow-y: auto;
}

.tournament-detail-content {
    padding: 24px;
    margin-top: 12px;
    background-color: white;
    border-radius: 12px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.tournament-content {
    display: flex;
    margin-bottom: 1rem;
}

.tournament-banner img {
    width: 16rem;
    aspect-ratio: 16/9;
    border-radius: 16px;
}

.tournament-info {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
}

.tournament-title {
    font-size: 1.5rem;
    font-weight: 600;
}

.tournament-info-row {
    justify-content: space-between;
    align-items: center;
}

.tournament-attended {
    font-size: 1.125rem;
}

.tournament-user {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
}

.tournament-user-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin-right: 1rem;
}

.tournament-user-name {
    font-size: 1.25rem;
    font-weight: 500;
}

.tournament-detail {
    margin-bottom: 1.5rem;
}

.tournament-detail .tournament-detail-item {
    font-size: 1rem;
    font-weight: 500;
}

.tournament-desc-container {
    background-color: #F9F9F9;
    border-radius: 10px;
    min-height: 8rem;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
}

.tournament-desc-title {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
}

.tournament-desc-detail {
    font-size: 1rem;
    font-weight: 400;
}

.tournament-desc-action {
    display: flex;
    justify-content: end;
    gap: 0.55rem;
}

.tournament-list-user {
    display: flex;
    align-items: center;
}

.tournament-user-list-avatar {
    width: 4rem;
    width: 4rem;
    border-radius: 50%;
    margin-right: 1rem;
}

.tournament-user-list-name {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0;
    margin-top: 10px;
}

.tournament-list-detail {
    margin-bottom: 1.5rem;
}

.tournament-list-operator {
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
}

@media (max-width: 576px) {
    .tournament-detail-container {
        padding-left: 0;
        padding-right: 0;
    }

    .tournament-content {
        flex-direction: column;
    }

    .tournament-content>div.tournament-banner>img {
        width: 100%;
    }

    .tournament-info {
        margin-left: 0;
    }

    .tournament-info-row {
        text-align: center;
    }

    .tournament-invite {
        display: flex;
        justify-content: center;
    }
}

/* Small screens (sm) */
@media (min-width: 576px) and (max-width: 767px) {
    .tournament-detail-container {
        padding-left: 0;
        padding-right: 0;
    }

    .tournament-content {
        flex-direction: column;
    }

    .tournament-content>div.tournament-banner>img {
        width: 100%;
    }

    .tournament-info {
        margin-left: 0;
    }

    .tournament-info-row {
        text-align: center;
    }

    .tournament-invite {
        display: flex;
        justify-content: center;
    }
}</style>