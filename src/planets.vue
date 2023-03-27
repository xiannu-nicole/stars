<script>
import planetsSidebar from "./planetsSidebar.vue";
import { mapState } from "vuex";
import $ from "jquery"


export default {
  data(){
    return {
      isLoad:"",
    }
  },
  components: {
    planetsSidebar,
  },
  created() {
    window.addEventListener("scroll", this.top);
    window.addEventListener("scroll", this.top_show);
  },
  computed: {
    ...mapState({
      planets: (state) => state.planets,
    }),
  },
  mounted() {
    this.$store.dispatch("getMainDate");
  },
  methods: {
        top_show(){
      // 已滑動的高度
      let scroll_top = $(window).scrollTop();
            if(scroll_top > 200){
        $("#top").addClass("active")
      }
      else{
        $("#top").removeClass("active")
      }
    },
    top() {
      // ==========到達底部==============
      // 視窗高度
      let w_h = $(window).height();
      // 已滑動的高度
      let scroll_top = $(window).scrollTop();
      // 網頁可滑動的總高度
      let scroll_h = $("body").height();
      if (w_h + scroll_top >= scroll_h) {
        $("#top").addClass("back");
        $("#planet-menu").addClass("bottom");
      } 
         else {
        $("#top").removeClass("back");
        $("#planet-menu").removeClass("bottom");
      }
    },
    goTop() {
      $("html,body").scrollTop(0);
    },
  },
};
</script>

<template>
  <div class="container">
    <transition name="show">
      <planetsSidebar :planets="planets"></planetsSidebar>
    </transition>
    <div
      :id="item.title_e"
      class="item d-flex flex-column align-items-center"
      v-for="item in planets"
      :key="item.title"
    >
      <!-- img -->
      <div :id="item.title" class="carousel slide" data-bs-interval="false">
        <div class="carousel-indicators">
          <button
            type="button"
            :data-bs-target="`#` + item.title"
            :data-bs-slide-to="index"
            :class="index === 0 ? 'active' : ''"
            v-for="(btn, index) in item.imgs"
            :key="btn[index]"
            aria-current="true"
          ></button>
        </div>
        <div class="carousel-inner">
          <div
            :class="index === 0 ? 'carousel-item active' : 'carousel-item'"
            v-for="(img, index) in item.imgs"
            :key="img[index]"
          >
            <img :src="img" :alt="item.title" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          :data-bs-target="`#` + item.title"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          :data-bs-target="`#` + item.title"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- text -->
      <div class="text">
        <h3>{{ item.title }}</h3>
        <p v-html="item.introduction"></p>
      </div>
    </div>
    <div id="top" @click="goTop">
      <img src="/stars/public/image/top.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../public/style/main.scss";
.container {
  padding-bottom: 80px;
}
#top {
  position: fixed;
  z-index: 9999;
  bottom: 120px;
  right: 4px;
  width: 80px;
  transform: rotate(-180deg);
}

// #top.show {
//   opacity: 1;
//   position: fixed;
//   bottom: 90px;
//   left: 90%;
// }

#top.back {
  bottom: 200px;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  cursor: pointer;
}

@media (min-width: 992px) {
  #top {
    opacity: 0;
    bottom: -100px;
    right: 50%;
    transform: translateX(50%) rotate(-180deg);
    &.active{
      opacity: 1;
    bottom: 40px;
    }
    &:hover {
      bottom: 30px;
    transform: translateX(50%) rotate(0);
      cursor: pointer;
    }
    &.back {
  bottom: 120px;
      -webkit-transform: translateX(50%) rotate(0deg);
      transform: translateX(50%) rotate(0deg);
          &:hover {
      bottom: 140px;
      cursor: pointer;
    }
    }
  }
}
</style>
