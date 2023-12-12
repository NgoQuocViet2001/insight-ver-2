<script setup lang="ts">
//import dayjs from 'dayjs';
import { SingleChatWrapper, MessageList, BackShadowEmoji, Footer } from '../apps/chat/style';
import { useStore } from 'vuex';
import { computed, nextTick, watch, onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import PropTypes from 'vue-types';
import ModalRating from "@/views/dashboard/ModalRating.vue";

const props = defineProps({
  dashboard: PropTypes.bool,
  selectedContent: PropTypes.string,
});
const { state, dispatch } = useStore();
const { params } = useRoute();
const rtl = computed(() => state.ChangeLayoutMode.rtlData);
const chatData = computed(() => state.chat.privateChat.data);
const left = computed(() => (!rtl.value ? 'left' : 'right'));

const me = ref('woadud@gmail.com');
const singleContent = computed(() => (chatData.value[0] ? chatData.value[0].content : []));
const name = 'AI';


const dataAns = reactive([
  {
    id: 1,
    content: "Prop (Property) trong Vue.js là một cách để truyền dữ liệu từ component cha xuống component con. Các prop là các giá trị được định nghĩa trong component con và có thể nhận giá trị từ component cha, tạo sự liên kết dữ liệu giữa chúng. Prop giúp truyền thông tin giữa các thành phần khác nhau của ứng dụng Vue một cách dễ dàng và hiệu quả.",
    questionId: 1,
  },
  {
    id: 2,
    content: "Lifecycle hooks trong Vue.js là các hàm được gọi tại các giai đoạn khác nhau trong quá trình lifecycle của một component Vue. Các hooks này giúp bạn thực hiện các hành động nhất định khi component được tạo, cập nhật hoặc hủy bỏ.",
    questionId: 2,
  },
  {
    id: 3,
    content: "Trong Vue.js, reactivity là một khái niệm quan trọng đề cập đến khả năng tự động theo dõi và phản ánh thay đổi của dữ liệu lên giao diện người dùng mà không cần phải thủ công can thiệp.",
    questionId: 3,
  },
  {
    id: 4,
    content: "Vue CLI (Command Line Interface) là một công cụ dòng lệnh cho phép bạn tạo, cấu hình và quản lý dự án Vue.js một cách dễ dàng. Nó cung cấp một số lựa chọn và tính năng giúp phát triển ứng dụng Vue.js một cách hiệu quả.",
    questionId: 4,
  },
  {
    id: 5,
    content: "Mục đích chính của nextTick là cung cấp một cách để thực hiện mã sau khi DOM đã được cập nhật, giúp đảm bảo rằng bạn đang làm việc với DOM đã được Vue cập nhật, tránh được các vấn đề liên quan đến hiệu suất và đồng bộ.",
    questionId: 5,
  },
  {
    id: 6,
    content: "Lập trình hướng đối tượng (OOP) là mô hình lập trình dựa trên khái niệm về đối tượng, lớp, đóng gói và kế thừa. Đối tượng là thực thể có trạng thái và hành vi, được tạo từ lớp, trong đó đóng gói giữ thông tin ẩn và kế thừa cho phép lớp sử dụng lại các thuộc tính và phương thức từ lớp cha.",
    questionId: 6,
  },
  {
    id: 7,
    content: "Vue.js cung cấp nhiều chỉ thị tích hợp sẵn khác nhau cho phép bạn áp dụng hành vi đặc biệt cho các phần tử trong DOM. Dưới đây là một số chỉ thị thường được sử dụng trong Vue.js: v-if, v-for, v-bind (hoặc :), v-on (hoặc @), v-model, v-show, v-text, v-html",
    questionId: 7,
  },
  {
    id: 8,
    content: "Mảng Tuần Tự (Sequential Array): Mảng tuần tự là một cấu trúc dữ liệu mà mỗi phần tử có chỉ số (index) và các phần tử được lưu trữ liền kề trong bộ nhớ. Để truy cập một phần tử, bạn chỉ cần biết vị trí của nó trong mảng. <br> Mảng Bất Tuần Tự (Sparse Array): Mảng bất tuần tự là một mảng trong đó không phải tất cả các chỉ số có phần tử tương ứng. Các phần tử được lưu trữ không liên tục, và có thể có các chỉ số bị bỏ qua.<br>Vòng Lặp Duyệt Mảng: Để duyệt qua mảng, có một số vòng lặp phổ biến như: Vòng Lặp For, Vòng Lặp Foreach (dành cho mảng), Vòng Lặp While, Vòng Lặp Do-While",
    questionId: 8,
  },
  {
    id: 9,
    content: "Styled Components, một cách phổ biến để tạo kiểu cho các thành phần trong React, không có sẵn trong Vue.js. Tuy nhiên, Vue.js cung cấp cách tiếp cận riêng để tạo kiểu thành phần bằng cách sử dụng các mô-đun CSS và CSS có phạm vi.",
    questionId: 9,
  },
  {
    id: 10,
    content: "Trong Vue.js, bạn có thể xác minh xem có xảy ra đột biến hay không bằng cách sử dụng Vue Devtools. Vue Devtools là một phần mở rộng của trình duyệt cho phép bạn kiểm tra và gỡ lỗi các ứng dụng Vue.js. Nó cung cấp một cái nhìn chi tiết về trạng thái, các đột biến, hành động và các thành phần trong ứng dụng của bạn.",
    questionId: 10,
  },
  {
    id: 11,
    content: "Trong Vue.js, khi xác định thuộc tính dữ liệu trong một thành phần, bạn nên biến nó thành một hàm thay vì một đối tượng. Lý do đằng sau điều này là để đảm bảo rằng mỗi phiên bản thành phần duy trì bản sao dữ liệu bị cô lập của riêng nó.",
    questionId: 11,
  },
  {
    id: 12,
    content: "Trong ngôn ngữ lập trình C#, có nhiều loại lớp, nhưng chúng chủ yếu có thể được chia thành ba loại chính: Lớp Cơ Bản (Basic Class), Lớp Trừu Tượng (Abstract Class) và Lớp Giao Tiếp (Interface)",
    questionId: 12,
  },
  {
    id: 13,
    content: "Instant prototyping trong Vue.js là một tính năng cho phép các nhà phát triển nhanh chóng tạo nguyên mẫu và thử nghiệm các thành phần, mẫu và dữ liệu mà không cần thiết lập bản dựng hoàn chỉnh hoặc cấu hình phức tạp.",
    questionId: 13,
  },
  {
    id: 14,
    content: "Mixins trong Vue.js cung cấp phương thức để tái sử dụng logic thành phần và chia sẻ chức năng trên nhiều thành phần. Mixin là một đối tượng chứa các tùy chọn thành phần như dữ liệu, tính toán, phương thức và hook vòng đời. Các tùy chọn này được hợp nhất với các tùy chọn tương ứng của các thành phần sử dụng mixin.",
    questionId: 14,
  },
  {
    id: 15,
    content: "Trong Vue.js, plugin là một phần chức năng có thể tái sử dụng có thể được thêm vào ứng dụng Vue. Các plugin nâng cao chức năng cốt lõi của Vue bằng cách cung cấp các tính năng, thành phần, chỉ thị hoặc phương thức bổ sung. Một plugin Vue thường thêm chức năng cấp global có thể được truy cập trên toàn bộ ứng dụng. Nó có thể mở rộng nguyên mẫu của Vue, đăng ký các thành phần hoặc chỉ thị global hay cung cấp các chức năng tiện ích global.",
    questionId: 15,
  },
  {
    id: 16,
    content: "Vue-loader là một trình tải dành cho webpack, một gói mô-đun phổ biến cho các ứng dụng JavaScript. Vue-loader cho phép bạn viết các thành phần Vue ở một định dạng tệp duy nhất và biên dịch chúng thành các mô-đun JavaScript có thể được sử dụng bởi webpack.",
    questionId: 16,
  },
  {
    id: 17,
    content: "Watchers hay người theo dõi trong Vue.js là một tính năng cho phép bạn thực hiện các hành động để đáp ứng với những thay đổi trong một phần dữ liệu phản ứng cụ thể. Chúng cung cấp phương thức để quan sát và phản ứng với những thay đổi trong dữ liệu mà không cần gọi các phương thức một cách rõ ràng hoặc dựa vào các thuộc tính được tính toán.",
    questionId: 17,
  },
])

const visibleMessage = ref<boolean>(true);

const inputValue = ref('');
const fileList = ref([]);
const fileList2 = ref([]);
const messageContainer = ref<HTMLElement | null>(null);
const messages = ref([]);
const answer = ref<string>();
const answerIdLastest = ref<number>();

const handleChange = (e: any) => {
  inputValue.value = e.target.value;
};

onMounted(() => {
  scrollToBottom();
});

const scrollToBottom = async () => {
  await nextTick();
  const container = messageContainer.value;
  if (container) {
    const divScrollElement = container.querySelector('div.ps');
    if(divScrollElement) {
      divScrollElement.scrollTop = divScrollElement.scrollHeight;
    }
  }
};
const emit = defineEmits(['visibleLoading']);
const lastestContent = ref('');
watch(() => {
  if (props.selectedContent !== null && props.selectedContent !== '' && props.selectedContent.content !== lastestContent.value) {
    messages.value.push({
      content: props.selectedContent.content,
      role: 'questioner', 
      questionId: props.selectedContent.id,
      answerId: 0,
    });
    lastestContent.value = props.selectedContent.content;
    let ans = dataAns.filter(item => item.questionId == props.selectedContent.id);
    answer.value = ans ? ans[0].content : 'Xin lỗi, nhưng tôi không có khả năng cung cấp thông tin cho câu hỏi này!';
    answerIdLastest.value = ans ? ans[0].id : 0;
    console.log(answerIdLastest.value);
    messages.value.push({
      content: answer.value,
      role: 'respondent',
      answerId: ans ? ans[0].id : 0,
      questionId: 0,
    });
    
    visibleMessage.value = false;
    sendDataToParent();
    scrollToBottom();
  }
});

const handleSubmit = (e: any) => {
  e.preventDefault();
  if(inputValue.value.trim() != '') {
    messages.value.push({
      content: inputValue.value,
      role: 'questioner',
      answerId: 0,
      questionId: 0,
    });
    answerIdLastest.value = messages.value.length;
    messages.value.push({
      content: "Xin lỗi, nhưng tôi không có khả năng cung cấp thông tin cho câu hỏi này!",
      role: 'respondent',
      answerId: messages.value.length,
      questionId: 0,
    });
    visibleMessage.value = false;
    sendDataToParent();
  }
  scrollToBottom();
  inputValue.value = '';
};

const sendDataToParent = () => {
  emit('visibleLoading', visibleMessage.value);
  setTimeout(() => {
    visibleMessage.value = true;
    emit('visibleLoading', visibleMessage.value);
    scrollToBottom();
  }, 3000);
}

const modalVisible = ref(false);
const openModalRating = () => {
  modalVisible.value = true;
};
const closeModal = () => {
  modalVisible.value = false;
};

</script>

<template>
  <ModalRating :visible="modalVisible" :closeModal="closeModal" />

  <SingleChatWrapper :class="dashboard ? 'ninjadash-chat-home' : ''">
    <sdCards>
      <template #title>
        <sdHeading as="h5">{{ name }}</sdHeading>
        <p>Hoạt động</p>
      </template>

      <ul class="ninjadash-chatbox"  ref="messageContainer">
        <perfect-scrollbar
          :options="{
            wheelSpeed: 1,
            swipeEasing: true,
            suppressScrollX: true,
          }"
        >
          <li
            v-for="({ content, role, answerId }, index) in messages"
            :key="index"
            class="ninjadash-chatbox__single"
          >
        
            <div :key="index" :style="{ overflow: 'hidden' }">
              <div :class="role === 'respondent' ? 'left' : 'right'">
                <img v-if="role === 'respondent'" src="https://insight.lotusacademy.edu.vn/api/fileupload/download/c7e54ny9iow82jcksypz" alt="" />

                <div class="ninjadash-chatbox__content">
                  <div v-if="role === 'respondent'" class="ninjadash-chatbox__contentInner d-flex">
                    <div class="ninjadash-chatbox__message">
                      <img v-if="!visibleMessage && index === messages.length - 1" src="@/assets/img/typing.gif" alt="" style="margin-top: 16px;">
                      <MessageList v-else class="message-box">{{ content }}</MessageList>
                    </div>

                    <div v-if="visibleMessage" class="ninjadash-chatbox__actions">
                      <unicon name="ellipsis-h" width="18" @click="openModalRating"></unicon>
                    </div>
                  </div>

                  <div v-else class="ninjadash-chatbox__contentInner d-flex" >
                    <div class="ninjadash-chatbox__message">
                      <MessageList class="message-box">{{ content }}</MessageList>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </li>
          
          <!-- <li v-for="(item, index) in messages" :key="index" class="ninjadash-chatbox__single">
            <div :key="index" :style="{ overflow: 'hidden' }">
              <div class="right">
              <div class="ninjadash-chatbox__content">
                <div class="ninjadash-chatbox__contentInner d-flex" >
                  <div class="ninjadash-chatbox__message">
                    <MessageList class="message-box">{{ item.content }}</MessageList>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </li> -->

        </perfect-scrollbar>
      </ul>
      <!-- <p v-else class="no-data-text">Không có dữ liệu</p> -->

      <Footer>
        <form @submit="visibleMessage ? handleSubmit : null" :class="{ 'disabled-form': !visibleMessage }">
          <div :class="`chatbox-reply-form d-flex ${fileList.length && 'hasImage'} ${fileList2.length && 'hasFile'}`">
            <div class="chatbox-reply-input">
              <input
                @change="handleChange"
                placeholder="Send a message"
                name="chat"
                id="chat"
                :style="{ width: '100%' }"
                :value="inputValue"
              />
            </div>
            <div class="chatbox-reply-action d-flex">
              <sdButton @click="handleSubmit" type="primary" class="btn-send" >
                <unicon name="message" width="18"></unicon>
              </sdButton>
            </div>
          </div>
        </form>
      </Footer>
    </sdCards>
  </SingleChatWrapper>
</template>

<style scoped>

:global(#app > div > div > section > section > section > main > div > div > div > div > div > div.ant-card-body > div > form > div > div.chatbox-reply-input > span),
:global(#app > div > div > section > section > section > main > div > div > div > div > div > div.ant-card-body > div > form > div > div.chatbox-reply-action.d-flex > a > span > div) {
  display: none;
}
:global(.bIdTT .chatbox-reply-form .chatbox-reply-input input) {
  padding: 0 25px 0 25px;
}

:global(.cemhnt .ninjadash-chatbox .ninjadash-chatbox__single .left .message-box) {
  background-color: #e18b5d;
  color: #fff;
}
:global(.cemhnt .ninjadash-chatbox .ninjadash-chatbox__single .right .message-box) {
  background-color: #5840FF;
  color: #fff;
}
.disabled-form {
  pointer-events: none;
  opacity: 0.5; 
}
#chat{
  background-color: #e6e5e5;
  font-size: 16px;
  height: 45px;
}
#chat:focus {
  border: 1px solid #9dbfe6;
}

#chat:blur {
  border: none;
}
</style>
