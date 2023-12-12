<template>
    <div class="tournament-attendee-container">
        <Main>
            <BreadcrumbWrapperStyle>
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link to="/">Home</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link to="/dautruong">Đấu trường</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link to="/dautruong/giaidau">Giải đấu</router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </BreadcrumbWrapperStyle>
            <div class="tournament-attendee-content">
                <DataTableStyleWrap>
                    <div class="ninjadash-datatable-filter">
                        <div class="ninjadash-datatable-filter__left left-panel"></div>
                        <div class="ninjadash-datatable-filter__right right-panel">
                            <a-input @change="handleDataUser" size="default" placeholder="Tìm kiếm" class="search-input">
                                <template #prefix>
                                    <unicon name="search"></unicon>
                                </template>
                            </a-input>
                        </div>
                    </div>
                    <TableWrapper>
                        <a-table :columns="tableHeader" :data-source="displayedData" :pagination="false"
                            :scroll="{ x: 500 }" :responsive="true">
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'fullName'">
                                    <div class="tournament-list-user">
                                        <div>
                                            <img :src="record.avatar"
                                                alt="Poster" class="tournament-user-list-avatar" />
                                        </div>
                                        <div class="tournament-user-list-detail">
                                            <h3 class="tournament-user-list-name">{{ record.fullName }}</h3>
                                            <p class="tournamnet-user-list-email">{{ record.email }}</p>
                                        </div>
                                    </div>

                                </template>
                            </template>
                        </a-table>
                        <div class="pagination-wrapper pagination-wrapper-attendee-list">
                            <a-pagination v-model="currentPage" :total="totalItem" :pageSize="pageSize"
                                show-less-items 
                                 @change="handlePageChange" />
                        </div>
                    </TableWrapper>
                </DataTableStyleWrap>
            </div>
        </Main>
    </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import { TableWrapper } from "@/views/styled";
import { DataTableStyleWrap } from "@/components/table/Style";
import { Main } from '@/views/styled';
import { BreadcrumbWrapperStyle } from "@/views/uiElements/ui-elements-styled";
const currentPage =ref(1);
const pageSize = ref(5);
const totalItem = computed(()=> attendeeList.length);
const tableHeader = [
    {
        title: "Elo",
        dataIndex: "elo",
        key: "elo",
    },
    {
        title: "Họ tên",
        dataIndex: "fullName",
        key: "fullName",
    },
    {
        title: "Khoá học",
        dataIndex: "khoaHoc",
        key: "khoaHoc",
    },
    {
        title: "Số cuộc thi tham gia",
        dataIndex: "attended",
        key: "attended",
    },
]
const currentTournament = {
    title: "Đấu đỉnh cao",
}
const attendeeList = Array.from({ length: 42 }, (_, index) => ({
    order: index + 1,
    avatar: `https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/users/tsreaper/avatar_1627139236.png`,
    fullName: `User ${index + 1}`,
    email: `user${index + 1}@ltsgroup.tech`,
    elo: "1500",
    attended: "2000",
    khoaHoc: 'Java',
    align: 'center',
}));
const handleDataUser = () => {

}
const handlePageChange = (page: any) => {
    currentPage.value = page;
}
const displayedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = currentPage.value * pageSize.value;
    return attendeeList.slice(start, end);
})
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
        title: `So tài ${index + 1}`,
        banner: "https://assets.leetcode.com/contest/weekly-contest-290/card_img_1654267980.png",
        startTime: "2023-11-09 10:00 AM",
        status: "10 phút",
    })),
};
</script>

<style scoped>
:global(.ant-table-cell) {
    text-align: center;
}

:global(div.tournament-attendee-content > div > div.dmnCGe > div.ant-table-wrapper > div > div > div > div > div > table > thead > tr > th) {
    text-align: center;
}

:global(.ant-breadcrumb .ant-breadcrumb-link a) {
    color: black !important;
}

:global(.ant-breadcrumb .ant-breadcrumb-link .router-link-active) {
    color: #8231D3 !important;
}
/* css pagination */
:global(.tournament-attendee-container .ant-pagination-disabled button) {
    cursor: default !important;
}

:global(.tournament-attendee-container .ant-pagination-prev.ant-pagination-disabled button svg) {
    fill: #9299b8 !important;
}

:global(.tournament-attendee-container .ant-pagination-next.ant-pagination-disabled button svg) {
    fill: #9299b8 !important;
}

:global(.tournament-attendee-container .ant-pagination-prev button svg) {
    fill: black !important;
}

:global(.tournament-attendee-container .ant-pagination-next button svg) {
    fill: black !important;
}
.dmnCGe {
    display: flex;
    flex-direction: column;
    min-height: 40rem;
}
.ant-table-wrapper {
    flex-grow: 1;
}
.tournament-attendee-content {
    padding: 12px 24px 24px;
    margin-top: 12px;
    background-color: white;
    border-radius: 12px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.tournament-attendee-container {
    padding: 16px 30px 0;
}

.tournament-list-user {
    display: flex;
    align-items: center;
    justify-content: center;
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

.tournament-list-detail .tournament-detail-list-item {
    font-size: 1rem;
    font-weight: 500;
}

.pagination-wrapper-attendee-list {
    display: flex;
    justify-content: center;
}
</style>