<template>
  <div class="challenge-card-container" :style="{ 'background-image': `url(${backgroundImage})` }">
    <div class="challenge-card-content">
      <div style="flex-grow: 1;">
        <h2 class="challenge-card-title" style="margin-bottom: 0;">{{ title }}</h2>
        <div>
          <hr style="border-top: 1px solid #F0F2F5;">
        </div>
      </div>
      <div class="challenge-card-action">
        <sdButton type="primary" shape="round" @click="btnClick">
          {{ btnText }}
          <unicon name="plus-circle" style="height: 1.5rem; width: 1.5rem; margin-left: 0.5rem;"></unicon>
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
  'btnText',
  'btnClick'
])
</script>

<style scoped>
.challenge-card-container {
  background-size: 100% auto;
  background-repeat: no-repeat;
  width: 100%;
  border-radius: 2rem;
  aspect-ratio: 4/3;
}

.challenge-card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.challenge-card-title {
  font-size: 1.5rem;
  color: #fff;
  font-weight: 700;
  padding: 0.5rem 1.2rem;
}

.challenge-card-action {
  padding: 1rem 1.2rem;
  display: flex;
  justify-content: end;
}

/* responsive */
@media (max-width: 576px) {
  .challenge-card-container {
    border-radius: 2.2rem;
    aspect-ratio: 16/9;
  }
  .challenge-card-title {
    font-size: 1.8rem;
    padding: 1.5rem 3rem;
  }

  .challenge-card-action {
    padding: 2rem 3rem;
  }
}

/* Small screens (sm) */
@media (min-width: 576px) and (max-width: 767px) {
  .challenge-card-container {
    border-radius: 4.5rem;
    aspect-ratio: 16/9;
  }
  .challenge-card-title {
    font-size: 1.8rem;
    padding: 1.5rem 3rem;
  }

  .challenge-card-action {
    padding: 2rem 3rem;
  }
}

/* Medium screens (md) */
@media (min-width: 768px) and (max-width: 991px) {
  .challenge-card-container {
    border-radius: 4.5rem;
    aspect-ratio: 16/9;
  }
  .challenge-card-title {
    font-size: 1.8rem;
    padding: 1.5rem 3rem;
  }

  .challenge-card-action {
    padding: 2rem 3rem;
  }
}

/* Large screens (lg) */
@media (min-width: 992px) and (max-width: 1199px) {
  .challenge-card-container {
    aspect-ratio: 16/9;
  }
  .challenge-card-title {
    padding: 1rem 3rem;
  }

  .challenge-card-action {
    padding: 2rem 3rem;
  }
}

/* Extra-large screens (xl) */
@media (min-width: 1200px) and (max-width: 1599px) {
  .challenge-card-container {
    aspect-ratio: 16/9;
  }

  .challenge-card-title {
    font-size: 1.2rem;
    padding: 0.5rem 1.2rem;

  }

  .challenge-card-action {
    padding: 0.5rem 1.2rem;
  }
}

/* Extra-extra-large screens (xxl) */
@media (min-width: 1600px) {}
</style>

