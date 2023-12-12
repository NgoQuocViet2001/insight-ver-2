<template>
  <Main>
    <a-row :gutter="30">
      <a-col :xxl="16" :xl="14" :lg="13" :md="13" :xs="24" :sm="24" class="chat-section">
          <SingleChat />
      </a-col>
      
      <a-col :xxl="8" :xl="10" :lg="11" :md="11" :xs="24" :sm="24" class="sidebar-section">
          <UserBioBox>
            <sdCards headless>
              <article class="user-info">
                <sdHeading as="h5" class="user-info__title">
                  <p style="font-size: larger">{{ title }}</p>
                </sdHeading>
                <a-row style="gap: 10px">
                  <a-button>Xem video hướng dẫn</a-button>
                  <a-button>Bài tập tương tự</a-button> 
                  <a-button>Kiến thức liên quan</a-button>
                </a-row>
              </article>
              <address class="user-info">
                <sdHeading as="h4" class="user-info__title">{{ 'đề bài' }}</sdHeading>
                <perfect-scrollbar
                  :options="{
                    wheelSpeed: 1,
                    swipeEasing: true,
                    suppressScrollX: true,
                  }"
                >
                  <p>Cho mảng sau:<br>
                    hocSinh: [<br>
                    {<br>
                      name: "Nguyen Van A",<br>
                      age: 18,<br>
                      address: "Ha Noi",<br>
                      subject: ["Toan", "Ly", "Hoa"],<br>
                      },<br>
                      {<br>
                      name: "Nguyen Van B",<br>
                      age: 20,<br>
                      address: "TPHCM",<br>
                      subject: ["Toan", "Ly"],<br>
                      },<br>
                      {<br>
                      name: "Nguyen Van C",<br>
                      age: 22,<br>
                      address: "Hai Phong",<br>
                      subject: ["Toan", "Hoa"],<br>
                      },<br>
                      {<br>
                      name: "Nguyen Van D",<br>
                      age: 18,<br>
                      address: "Ha Noi",<br>
                      subject: ["Toan"],<br>
                      },<br>
                      {<br>
                      name: "Nguyen Van E",<br>
                      age: 26,<br>
                      address: "Da Nang",<br>
                      subject: ["Ly", "Hoa"],<br>
                      },<br>
                      ],<br>
                    Hiển thị các đối tượng trên dưới dạng: Tên: 'name' có tuổi là 'age' sống tại 'address'. Đã học các môn sau: subject[0], subject[1], subject[2]....
                  </p>
                </perfect-scrollbar>
              
              </address>
              <div class="user-info">
                <sdHeading as="h4" class="user-info__title">Code</sdHeading>
                <perfect-scrollbar
                  :options="{
                    wheelSpeed: 1,
                    swipeEasing: true,
                    suppressScrollX: true,
                  }"
                  style="background-color: rgba(0, 0, 0, 0.717); padding: 10px; border-radius: 5px"
                >
                  <code style="white-space: pre-wrap; color: white">
                    {{ codeExample }}
                  </code>
                </perfect-scrollbar>
                
              </div>
              
            </sdCards>
          </UserBioBox>
      </a-col>
      
    </a-row>
  </Main>
</template>

<script setup lang="ts">
  import { UserBioBox } from '@/views/apps/myProfile/overview/style';
  import { Main } from '@/views/styled';
  import SingleChat from '@/views/dashboard/SingleChat.vue';
  import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
  import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
  import { ref } from 'vue';

  const title = ref('Thao tác với v-for lồng');

  const codeExample = ref(`<template>
                  <div class="conditional-rendering">
                    <p v-for="item in hocSinh" :key="item">
                      <span>
                      Tên: {{item.name}} có tuổi là {{item.age}} sống tại {{item.address}}. Đã học các môn sau: 
                      <span v-for="sub in item.subject" :key="sub">
                        <span v-html="{{sub}}" ></span>,
                      </span>
                      </span>
                    </p>
                  </div>
                </template>
                <script>
                export default {
                  name: "HelloWorld",
                  data() {
                    return {
                      hocSinh: [
                        {
                          name: "Nguyen Van A",
                          age: 18,
                          address: "Ha Noi",
                          subject: ["Toan", "Ly", "Hoa"]
                        },
                        {
                          name: "Nguyen Van B",
                          age: 20,
                          address: "TPHCM",
                          subject: ["Toan", "Ly"]
                        },
                        {
                          name: "Nguyen Van C",
                          age: 22,
                          address: "Hai Phong",
                          subject: ["Toan", "Hoa"]
                        },
                        {
                          name: "Nguyen Van D",
                          age: 18,
                          address: "Ha Noi",
                          subject: ["Toan"]
                        },
                        {
                          name: "Nguyen Van E",
                          age: 26,
                          address: "Da Nang",
                          subject: ["Ly", "Hoa"]
                        }
                      ]
                    };
                  },
                  methods: {}
                };
                </script`);
</script>


<style scoped>
:global( main) {
  background-color: #f2f2f2;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > div) {
  display: flex;
  flex-direction: column;
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div),
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div) {
  margin-bottom: 0 !important;
}
:global( main > div) {
  min-height: unset !important;
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div) {
  height: 450px;
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > address > div) {
  height: 200px;
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 10px;
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div) {
  background: #d7e8fc;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  padding-bottom: 0 !important;
}
:global(#app > div > div > section > section > section > main > div) {
  padding-top: 20px;
  padding-bottom: 0 ;
}
.ps {
  max-height: 300px;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > article > h1) {
  margin-bottom: 12px;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > address),
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > article) {
  margin-bottom: 16px;
  padding-bottom: 16px;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > div > h1),
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > address > h1) {
  margin-bottom: 12px;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section),
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section) {
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > address > div) {
  max-height: 165px;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div > li:nth-child(1)) {
  margin-top: 6px;
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > div:nth-child(3) > div){
  margin-bottom: 15px;
  flex: 1;
  max-height: calc(100vh - 580px);
  min-height: 150px !important;  
  overflow: auto;
}
:global(body) {
  background: #f2f2f2;
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div),
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div) {
  height: calc(100vh - 100px);
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div > li),
:global(main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div > li) {
  margin-bottom:10px;
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div),
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div) {
  flex: 1;
  display: flex;
}
:global( main > footer) {
  display:none;
}

:global( main > div) {
  padding-bottom: 16px;
  padding-top: 24px;
}
:global( main > div > div) {
  height: calc(100vh - 100px);
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16 > div.bkGFPD.ninjadash-chat-home.ninjadash-chat-home > div > div.ant-card-head) {
  border-bottom: 1px solid #F1F2F6;
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div > li > div > div > div > div > div > div) {
  padding: 10px 16px;
}
:global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-lg-13.ant-col-xxl-16 > div > div > div.ant-card-body > ul > div > li > div > div > div > div > div.ninjadash-chatbox__actions) {
  margin-left: 0;
  cursor: pointer;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-13.ant-col-lg-13.ant-col-xl-14.ant-col-xxl-16.chat-section > div > div > div.ant-card-head) {
  border-bottom: 1px solid #f1f1f1;
}

:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div) {
  flex: 1;
  height: calc(100vh - 270px);
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section) {
  display: flex;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div) {
  display: flex;
  flex-direction: column;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div > div.ant-card-body) {
  flex: 1;
  display: flex !important;
  flex-direction: column;
  justify-content: end;
  padding-top: 0 !important;
}
:global(#app > div > div > section > section > section > main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-13.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul){
  flex: 1;
  display: flex;
}

:global(main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div::-webkit-scrollbar)
{
  width: 6px;
}
:global(main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div::-webkit-scrollbar-track)
 {
  background: #f1f1f1;
}
:global(main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div::-webkit-scrollbar-thumb)
{
  background: #dfdfdf;
  border-radius: 6px;
}
:global(main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div::-webkit-scrollbar-thumb:hover )
{
  background: #717070;
}
@media screen and (min-width:992px) and (max-width: 1551px) {
  :global( main > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-11.ant-col-xxl-8.sidebar-section > div > div > div > div:nth-child(3) > div){
    margin-bottom: 15px;
    min-height: 0;
    flex: 1;
    max-height: calc(100vh - 520px);
  }
}


@media screen and (max-width: 768px) {
  :global(.bIdTT .chatbox-reply-form .chatbox-reply-input input) {
    margin-bottom: 0;
  }
  :global(.bIdTT .chatbox-reply-form) {
    flex-direction: row;
  }
}
</style>
