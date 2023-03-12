<script>
import navbar from "./navbar.vue";
import copyRight from "./copyRight.vue";
import $ from "jquery";



export default {
    components: {
    // loading,
    navbar,
    copyRight,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },

  methods: {

    reload() {
      isRouterAlive = false;
      this.$nextTick(() => {
        isRouterAlive = true;
      });
    },
  },
  watch: {
    $route() {
      this.$store.commit("testScore0", 0);
      $('html, body').animate({scrollTop:0},0)
    },
  },
};
</script>

<template>
  <div>
    <navbar></navbar>
    <transition name="show">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
    <copyRight></copyRight>
  </div>
</template>

<style lang="scss" scoped>
@import "../public/style/main.scss";

</style>

