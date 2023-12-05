<template>
    <div class="container">
        <div class="banner-card-inner theme-2" :style="{ backgroundImage: `url('${backgroundImage}')` }">
            <div class="challenge-card-info">
                <div style="flex-grow: 1;">
                    <h2>{{ title }}</h2>
                    <p class="truncate-text">{{ desc }}</p>
                </div>
                <a-row style="display: flex; gap: 1rem;">
                    <div>   
                        <a-input v-model:value="inputState.value" placeholder="Nhập mã tham gia" style="width: 20rem; height: 44px;" />
                    </div>
                    <sdButton size="lg" type="primary" :onClick="submit">
                        {{ btnText }}
                    </sdButton>
                </a-row>
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
.container {
  position: relative;
  margin-bottom: 0; /* Add your specific margin-bottom value here */
}

@media only screen and (max-width: 1199px) {
  .container {
    margin-bottom: 50px !important;
  }
}

@media only screen and (max-width: 991px) {
  .container {
    margin-bottom: 30px !important;
  }
}

.container h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff !important;
  margin-bottom: 20px;
  z-index: 2;
}

.container .banner-card-inner {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  padding: 2rem;
  min-height: 16rem;
  border-radius: 10px;
}

@media only screen and (max-width: 575px) {
  .container .banner-card-inner {
    padding: 28px 30px 30px 30px;
  }
}

.container .banner-card-inner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.container .banner-card-inner.theme-2 h2 {
  margin-bottom: 18px;
}

.container .banner-card-inner.theme-2 p {
  font-size: 15px;
  color: #fff !important;
  opacity: 0.70;
  max-width: 290px;
  margin-bottom: 20px;
  z-index: 2;
}

.container .banner-card-inner.theme-2 img {
  max-width: 285px;
  z-index: 2;
}

.container .banner-card-inner button {
  height: 44px;
  width: 100px;
  font-size: 15px;
  font-weight: 500;
  color: white;
  z-index: 2;
}

.container .banner-card-inner img {
  position: absolute;
  bottom: 0;
  max-width: 460px;
  right: 0; 
  z-index: 2;
}

.container .banner-card-inner .challenge-card-info {
  position: relative;
  z-index: 2;
  height: 12rem;
  display: flex;
  flex-direction: column;
}

.container .banner-card-inner .truncate-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}

</style>