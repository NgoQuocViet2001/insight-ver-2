<template>
    <div id="interview-wrapper">
        <Main>
          <ModalTimeout :visible="modalTimeOutVisible" :closeModalTimeOut="closeModalTimeOut" />
          <a-row :gutter="30">
            <a-col :xxl="16" :xl="15" :lg="15" :md="14" :xs="24" :sm="24" class="chat-section">
                <SingleChat :selectedContent="selectedContent" @visibleLoading="handleVisibleLoading" />
            </a-col>
            
            <a-col :xxl="8" :xl="9" :lg="9" :md="10" :xs="24" :sm="24" class="sidebar-section">
                <UserBioBox>
                  <sdCards headless>
                      <article class="user-info" >
                        <sdHeading as="h5" class="user-info__title">
                            <p class="right-sidebar-title" >Còn lại: </p>
                        </sdHeading>
                        <a-statistic-countdown :value="deadline" :format="'mm:ss'" @finish="onFinish" />
                      </article>
                     
                       <a-spin v-if="visibleLoading" >
                        <article class="user-info">
                          <a-select v-model:value="selectedValue" style="width: 120px" ref="select" @change="handleChange">
                            <a-select-option value="1">Câu hỏi phổ biến</a-select-option>
                            <a-select-option value="2">Câu hỏi mới nhất</a-select-option>
                            <a-select-option value="3">Câu hỏi liên quan</a-select-option>
                          </a-select>
                        </article>
  
                        <article class="user-info" v-if="selectedValue === '1'">
                            <a-tabs v-model:activeKey="activeKey">
                              <a-tab-pane key="1" tab="Cơ bản">
                                <ListItemQuestion :data="dataAdvancedQuestion" @on-click-item-question="handleClickItemQuestion" />
                              </a-tab-pane>
                              <a-tab-pane key="2" tab="Nâng cao">
                                <ListItemQuestion  :data="dataExpertQuestion" @on-click-item-question="handleClickItemQuestion" />
                              </a-tab-pane>
                              <a-tab-pane key="3" tab="Chuyên gia">
                                <ListItemQuestion  :data="dataBasicQuestion" @on-click-item-question="handleClickItemQuestion" />
                              </a-tab-pane>
                            </a-tabs>
                        </article>
  
                        <article class="user-info" v-if="selectedValue === '2'">
                          <a-tabs v-model:activeKey2="activeKey2">
                            <a-tab-pane key="4" tab="Cơ bản">
                              <ListItemQuestion :data="dataExpertQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                            <a-tab-pane key="5" tab="Nâng cao">
                              <ListItemQuestion  :data="dataBasicQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                            <a-tab-pane key="6" tab="Chuyên gia">
                              <ListItemQuestion  :data="dataAdvancedQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                          </a-tabs>
                        </article>
  
                        <article class="user-info" v-if="selectedValue === '3'">
                          <a-tabs v-model:activeKey3="activeKey3">
                            <a-tab-pane key="7" tab="Cơ bản">
                              <ListItemQuestion :data="dataAdvancedQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                            <a-tab-pane key="8" tab="Nâng cao">
                              <ListItemQuestion  :data="dataExpertQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                            <a-tab-pane key="9" tab="Chuyên gia">
                              <ListItemQuestion  :data="dataBasicQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                          </a-tabs>
                        </article>
                       </a-spin>
                       <div v-else>
                        <article class="user-info">
                          <a-select v-model:value="selectedValue" style="width: 120px" ref="select" @change="handleChange">
                            <a-select-option value="1">Câu hỏi phổ biến</a-select-option>
                            <a-select-option value="2">Câu hỏi mới nhất</a-select-option>
                            <a-select-option value="3">Câu hỏi liên quan</a-select-option>
                          </a-select>
                        </article>
  
                        <article class="user-info" v-if="selectedValue === '1'">
                            <a-tabs v-model:activeKey="activeKey">
                              <a-tab-pane key="1" tab="Cơ bản">
                                <ListItemQuestion :data="dataAdvancedQuestion" @on-click-item-question="handleClickItemQuestion" />
                              </a-tab-pane>
                              <a-tab-pane key="2" tab="Nâng cao">
                                <ListItemQuestion  :data="dataExpertQuestion" @on-click-item-question="handleClickItemQuestion" />
                              </a-tab-pane>
                              <a-tab-pane key="3" tab="Chuyên gia">
                                <ListItemQuestion  :data="dataBasicQuestion" @on-click-item-question="handleClickItemQuestion" />
                              </a-tab-pane>
                            </a-tabs>
                        </article>
  
                        <article class="user-info" v-if="selectedValue === '2'">
                          <a-tabs v-model:activeKey2="activeKey2">
                            <a-tab-pane key="4" tab="Cơ bản">
                              <ListItemQuestion :data="dataExpertQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                            <a-tab-pane key="5" tab="Nâng cao">
                              <ListItemQuestion  :data="dataBasicQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                            <a-tab-pane key="6" tab="Chuyên gia">
                              <ListItemQuestion  :data="dataAdvancedQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                          </a-tabs>
                        </article>
  
                        <article class="user-info" v-if="selectedValue === '3'">
                          <a-tabs v-model:activeKey3="activeKey3">
                            <a-tab-pane key="7" tab="Cơ bản">
                              <ListItemQuestion :data="dataAdvancedQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                            <a-tab-pane key="8" tab="Nâng cao">
                              <ListItemQuestion  :data="dataExpertQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                            <a-tab-pane key="9" tab="Chuyên gia">
                              <ListItemQuestion  :data="dataBasicQuestion" @on-click-item-question="handleClickItemQuestion" />
                            </a-tab-pane>
                          </a-tabs>
                        </article>
                       </div>
                  </sdCards>
                </UserBioBox>
            </a-col>
            
          </a-row>
        </Main>
    </div>
</template>
  
  <script setup lang="ts">
    import { UserBioBox } from '@/views/apps/myProfile/overview/style';
    import { Main } from '@/views/styled';
    import SingleChat from '@/views/dashboard/SingleChat.vue';
    import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
    import { ref, onMounted, reactive, inject ,watch } from 'vue';
    import ModalTimeout from '@/views/dashboard/interview/ModalTimeout.vue';
    import ListItemQuestion from '@/views/dashboard/interview/ListItemQuestion.vue';

    const selectedValue = ref('1');
    const selectedContent = ref('');
    const activeKey = ref('1');
    const activeKey2 = ref('4');
    const activeKey3 = ref('7');
    onMounted(() => {
        activeKey.value = '1';
        activeKey2.value = '4';
        activeKey3.value = '7';
    });
    const handleChange = (value: any) => {
      console.log(`selected ${value}`);
    };
    const visibleLoading = ref(false);
    const handleVisibleLoading = (data: boolean) => {
      visibleLoading.value = !data;
    };
   
    const dataBasicQuestion = reactive([
      {
        id: 1,
        content: "Prop component là gì? "
      },
      {
        id: 2,
        content: "Mô tả lifecycle hooks trong Vuejs",
      },
      {
        id: 3,
        content: "Trong Vuejs, reactivity là gì? ",
      },
      {
        id: 4,
        content: "command-line interface của Vue (hoặc CLI)",
      },
      {
        id: 5,
        content: "Trong Vuejs, mục đích của nextTick là gì? ",
      },
    ])
    const dataAdvancedQuestion = reactive([
      {
        id: 6,
        content: "Hãy nêu những hiểu biết của bạn về lập trình OOP?",
      },
      {
        id: 7,
        content: "Liệt kê một số Directives (chỉ thị) có sẵn trong Vuejs hay sử dụng ",
      },
      {
        id: 8,
        content: "Mảng tuần tự là gì? Khác gì với bất tuần tự? Để duyệt mảng ta dùng vòng lặp nào?",
      },
      {
        id: 9,
        content: "Có thể sử dụng các Styled Components trong Vuejs không? ",
      },
      {
        id: 10,
        content: "Làm thế nào để xác minh nếu một đột biến (mutation) xảy ra? ",
      },
      {
        id: 11,
        content: "Tại sao component data phải là một function? ",
      },
      {
        id: 12,
        content: "Lớp trong ngôn ngữ C# gồm mấy loại?",
      },
      {
        id: 13, 
        content: "Instant prototyping là gì và nó làm việc như thế nào? ",
      },
      {
        id: 14, 
        content: "Mixins là gì? ",
      },
    ])

    const dataExpertQuestion = reactive([
      {
        id: 15, 
        content: "Vue plugin là gì? ",
      },
      {
        id: 16, 
        content: "Vue-loader là gì? ",
      },
      {
        id: 17, 
        content: "Watchers là gì? ",
      },
    ])

    const handleClickItemQuestion = (value: string) => {
      selectedContent.value = value
    }

    const modalTimeOutVisible = ref<boolean>(false);
    const openModalTimeOut = () => {
      modalTimeOutVisible.value = true;
    };
    const closeModalTimeOut = () => {
      modalTimeOutVisible.value = false;
    };

    const onFinish = () => {
      openModalTimeOut();
    };
    
    const timeRemaining = ref<number>(10); // minutes
    const deadline = Date.now() + timeRemaining.value * 60 * 1000 ;
    
</script>
  
  
<style scoped>
  :global(#interview-wrapper > div) {
    padding-top: 20px;
    padding-bottom: 0;
    min-height: unset !important;
  }
  :global(body),
  :global(#app > div > div > section > section > section),
  :global(main > #interview-wrapper) {
    background-color: #f2f2f2;
  }
  :global(#app > div > div > section > section > section > main) {
    margin-top: 0;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > div.ant-spin-container.ant-spin-blur > article:nth-child(1)),
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div > div > div > article) {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 0;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div > div > article:nth-child(2)) {
    border: none;
    margin-bottom: 0;
  }
  :global(#rc-tabs-5-panel-1 > div > div.ant-spin-nested-loading > div > ul > li:nth-child(1)) {
    padding-top: 0;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div > div > article:nth-child(1)) {
    display: flex;
    align-items: baseline;
    padding-bottom: 0;
    padding-top: 0;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #fff;
    padding-top: 6px;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div > div > article:nth-child(1) > div) {
    padding-left: 8px;
    color: #dc7c4a;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div > div > article:nth-child(2) > h1) {
    margin-bottom: 10px;
  }
  :global(#rc-tabs-75-panel-3 > div > div.ant-spin-nested-loading > div > ul > li:hover),
  :global(#rc-tabs-5-panel-1 > div > div > div > ul > li:hover) {
    color: #21498c;
    cursor: pointer;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div > div) {
    padding-top: 0 !important;
  }

  .ant-list-item,
  :global(div > div.ant-spin-nested-loading > div > ul > li)
  {
    padding-left: 0;
    font-size: 16px;
  }
  .ant-list-item:hover,
  :global(div > div.ant-spin-nested-loading > div > ul > li:hover)
  {
    color: #21498c;
    cursor: pointer;
  }
  :global(div > div.ant-spin-nested-loading) {
    height: 380px;
    min-height: 380px;
    max-height: 380px;
  }
  :global(body > div:nth-child(10) > div > div > div > div.rc-virtual-list > div.rc-virtual-list-holder > div > div > div > div:hover), 
  :global(body > div > div > div > div > div.rc-virtual-list > div.rc-virtual-list-holder > div > div > div.ant-select-item.ant-select-item-option.ant-select-item-option-selected > div) {
    color: #21498c;
  }
  :global(body > div > div > div > div > div.rc-virtual-list > div.rc-virtual-list-holder > div > div > div.ant-select-item.ant-select-item-option.ant-select-item-option-selected) {
    display: none;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-14.ant-col-lg-15.ant-col-xl-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-head) {
    border-bottom: 1px solid #f1f1f1;
  }
  p.right-sidebar-title{
    color: #21498c ; 
    font-size: 18px;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > div.ant-spin-container.ant-spin-blur > article:nth-child(1) > div > div > span),
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > article:nth-child(1) > div > div > span) {
    font-size: 20px;
    font-weight: 500;
    color: #21498c;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > div.ant-spin-container.ant-spin-blur > article:nth-child(1) > div),
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > article:nth-child(1) > div) {
    width: 100% !important;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > div > article:nth-child(2) > div > div > span.ant-select-selection-item) {
    font-size: 18px;
    font-weight: 500;
    color: #21498c;
  }
  :global( div > div.ant-list-pagination > ul > li.ant-pagination-item.ant-pagination-item-active > a) {
    background: #21498c;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > div.ant-spin-container.ant-spin-blur > article > div > div.ant-tabs-nav > div.ant-tabs-nav-wrap > div > div > div),
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > article > div > div.ant-tabs-nav > div.ant-tabs-nav-wrap > div > div > div) {
    font-size:16px
  }
  /* css pagination */
  :global(.ant-pagination-disabled button) {
    cursor: default !important;
  }

  :global(.ant-pagination-prev.ant-pagination-disabled button svg) {
    fill: #9299b8 !important;
  }

  :global(.ant-pagination-next.ant-pagination-disabled button svg) {
    fill: #9299b8 !important;
  }

  :global(.ant-pagination-prev button svg) {
    fill: black !important;
  }

  :global(.ant-pagination-next button svg) {
    fill: black !important;
  }
  /*chat*/
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div > li:nth-child(1)){
    margin-top: 6px;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div > li > div > div > div > div > div.ninjadash-chatbox__message > div) {
    padding: 10px 16px;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div > li) {
    margin-bottom: 10px;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div) {
    margin-bottom: 0 !important;
  }
  :global(#app > div > div > section > section > section > main > footer),
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > div > form > div > div.chatbox-reply-action.d-flex > a:nth-child(1)),
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > div > form > div > div.chatbox-reply-action.d-flex > a:nth-child(2)),
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > div > form > div > div.chatbox-reply-input > span > a > div) {
    display: none;
  }
  /**/
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div) {
    height: calc(100vh - 100px);
    overflow: auto;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div::-webkit-scrollbar)
  {
    width: 6px;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div::-webkit-scrollbar-track)
  {
    background: #f1f1f1;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section > div > div::-webkit-scrollbar-thumb)
  {
    background: #dfdfdf;
    border-radius: 6px;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-9.ant-col-xxl-8.sidebar-section) {
    height: calc(100vh - 100px);
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section) {
    display: flex;
    height: calc(100vh - 100px);
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div) {
    display: flex;
    flex: 1;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div) {
    display: flex;
    flex-direction: column;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-body) {
    flex: 1;
    display: flex !important;
    flex-direction: column;
    justify-content: end;
    padding-top: 0 !important;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul) {
    flex: 1;
    display: flex;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-lg-15.ant-col-xxl-16.chat-section > div > div > div.ant-card-body > ul > div) {
    flex: 1;
    height: calc(100vh - 270px);
  }
  :global(body > div:nth-child(11) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > ul) {
    margin-bottom: 15px;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > article > div > div.ant-tabs-nav > div.ant-tabs-nav-wrap > div > div > div) {
    color: #bbbbbb;
  }
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > article > div > div.ant-tabs-nav > div.ant-tabs-nav-wrap > div > div.ant-tabs-tab.ant-tabs-tab-active > div) {
    color: #21498c;
  }
  :global(div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > article > div > div.ant-tabs-nav > div.ant-tabs-nav-wrap > div > div.ant-tabs-ink-bar.ant-tabs-ink-bar-animated),
  :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > div > article > div > div.ant-tabs-nav > div.ant-tabs-nav-wrap > div > div.ant-tabs-ink-bar.ant-tabs-ink-bar-animated) {
    background: #21498c;
  }
  @media screen and (max-width: 768px) {
    :global(div > div.ant-spin-nested-loading) {
      height: 350px;
      min-height: 350px;
      max-height: 350px;
    }
    :global(.bIdTT .chatbox-reply-form .chatbox-reply-input input) {
      margin-bottom: 0;
    }
    :global(.bIdTT .chatbox-reply-form) {
      flex-direction: row;
    }
    :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section) {
      margin-top: 16px;
    }
    :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > article > div > div.ant-tabs-nav > div.ant-tabs-nav-wrap > div > div > div) {
      font-size: 15px;
    }
    :global(#interview-wrapper > div > div > div.ant-col.ant-col-xs-24.ant-col-sm-24.ant-col-md-10.ant-col-lg-9.ant-col-xl-9.ant-col-xxl-8.sidebar-section > div > div > div > article:nth-child(1) > div > div > span) {
      font-size: 20px;
    }
    :global(div > div.ant-spin-nested-loading > div > ul > li) {
      font-size: 15px;
    }
    p.right-sidebar-title {
      font-style: 17px;
    }
  }
</style>
  