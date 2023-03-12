<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(
        ['sun']
      )
    },
    mounted() {
      this.$store.dispatch('getMainDate')
    },
  }

</script>

<template>
  <div class="container">
    <div class="item d-flex flex-column align-items-center">
      <!-- img -->
      <div :id="sun.title" class="carousel slide" data-bs-interval="false">
        <div class="carousel-indicators">
          <button type="button" :data-bs-target="`#`+ sun.title" :data-bs-slide-to="index" :class="index === 0 ? 'active':''"  v-for="(btn, index) in sun.imgs" :key="btn[index]" aria-current="true"></button>
        </div>
        <div class="carousel-inner">
          <div :class="index === 0 ? 'carousel-item active':'carousel-item'" v-for="(img, index) in sun.imgs" :key="img[index]">
            <img :src="img" :alt="sun.title">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" :data-bs-target="`#`+ sun.title" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" :data-bs-target="`#`+ sun.title" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- text -->
      <div class="text">
        <h3>{{sun.title}}</h3>
        <p v-html="sun.introduction"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../public/style/main.scss';


</style>
