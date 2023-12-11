<template>
  <div class="challenge-enter-container">
    <div class="challenge-enter-content">
      <div>
        <h2 class="challenge-enter-title">MỞ KHOÁ THÀNH TỰU</h2>
        <div class="challenge-enter-desc">Tham gia đấu trường ngay nào!</div>
      </div>
      <div class="challenge-enter-action">
        <a-input v-model:value="inputState.value" placeholder="Nhập mã tham gia" />
        <sdButton type="primary" shape="round">
          Tham gia
        </sdButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps([
  'backgroundImage',
  'title',
  'desc',
  'inputState',
  'btnText',
  'submit',
])
</script>
<style scoped>
.challenge-enter-container {
  background-image: url('@/assets/images/frame6.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  aspect-ratio: 16/5;
  border-radius: 1.8rem;
}

.challenge-enter-content {
  padding: 5% 6%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.challenge-enter-title {
  color: #fff;
  font-weight: 550;
  font-size: 2rem;
  margin-bottom: 0;
  width: 100%;
  line-height: 2.5rem;
  letter-spacing: 0.18em;
  margin-bottom: 0.5rem;
}

.challenge-enter-desc {
  color: #DCE0E5;
  font-size: 1rem;
}

.challenge-enter-action {
  display: flex;
  width: 60%;
  gap: 1rem;
}

.challenge-enter-action>input,
.challenge-enter-action>button {
  height: 2.5rem;
}

/* responsive */
@media (max-width: 576px) {
  .challenge-enter-container {
    aspect-ratio: 16/7;
  }
  .challenge-enter-title {
    font-size: 1.2rem;
    width: 100%;
  }
  .challenge-enter-action {
    width: 100%;
  }
}

/* Small screens (sm) */
@media (min-width: 576px) and (max-width: 767px) {
  .challenge-enter-title {
    font-size: 1.2rem;
    width: 100%;
  }
  .challenge-enter-action {
    width: 80%;
  }
}

/* Medium screens (md) */
@media (min-width: 768px) and (max-width: 991px) {
  .challenge-enter-title {
    font-size: 1.2rem;
    width: 100%;
  }
}

/* Large screens (lg) */
@media (min-width: 992px) and (max-width: 1199px) {
  .challenge-enter-title {
    font-size: 1.2rem;
    width: 100%;
  }
}

/* Extra-large screens (xl) */
@media (min-width: 1200px) and (max-width: 1599px) {
  .challenge-enter-content {
    padding: 4% 5%;
  }

  .challenge-enter-title {
    font-size: 1.6rem;
    width: 100%;
  }
  .challenge-enter-action {
    width: 62%;
  }
}

/* Extra-extra-large screens (xxl) */
@media (min-width: 1600px) {
  .challenge-enter-title {
    width: 18rem;
  }
}
</style>