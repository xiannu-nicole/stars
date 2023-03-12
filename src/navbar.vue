<script>
import { mapState } from "vuex";
import $ from "jquery";

let bar = $(".bar");
let nav = $("nav");
let nav_menu = $(".menu");
let nav_link = $(".menu a");

export default {
  data(){
    return{
      menuShow:false,
    }
  },
  computed: {
    ...mapState(["nav"]),
  },

};
</script>

<template>
  <header>
    <nav class="d-flex justify-content-between flex-lg-column">
      <div class="title d-flex justify-content-between">
        <img
          class="logo my-mb-2"
          src="/stars/public/image/logo/logo.png"
          alt="logo"
        />
        <img
          @click="menuShow =! menuShow"
          class="bar active d-lg-none"
          src="https://cdn-icons-png.flaticon.com/512/2976/2976215.png"
          alt="bar"
        />
      </div>
      <ul class="menu text-center text-lg-start" :class="menuShow === true ? 'show' : ''">
        <li @click="menuShow =! menuShow" v-for="item in nav" :key="item.title">
          <router-link :to="`/${item.id}`">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>


<style lang="scss" scoped>
@import "../public/style/main.scss";
nav {
  position: fixed;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 99999;
  width: 100%;
  background-color: $bg;
  color: #fff;
  .title {
    width: 100%;
    img.logo {
      width: 140px;
    }
    img.bar {
      object-fit: contain;
      width: 20px;
      filter: invert(2) brightness(2);
    }
  }
  .menu {
    position: absolute;
    left: 0;
    right: 0;
    top: 86px;
    height: 0;
    overflow: hidden;
    width: 100%;
    background-color: $bg;
    &.show{
      height: 100vh;
    }
    li {
      margin: 20px 0;
      a {
        padding: 10px 0;
        text-align: center;
        color: #ffffff90;
        &.router-link-active {
          color: $primary;
        }
      }
    }
  }
}

nav.active {
  background-color: #0d142550;
  padding: 5px 30px;
  .title {
    img.logo {
      width: 100px;
    }
    img.bar {
      width: 18px;
    }
  }
  .menu {
    top: 43px;
  }
}

@media screen and (min-width: 992px) {
  nav {
    background-color: #0D142500;
    width: 15vw;
    min-width: 150px;
    &.active {
      background-color: #0D142500;
      padding: 20px;
      .title {
        img.logo {
          width: 120px;
        }
      }
      .menu {
        top: 20px;
      }
    }
    .title {
      width: fit-content;
      img.logo {
        width: 120px;
      }
    }
    .menu {
      display: flex;
      flex-direction: column;
      position: relative;
      top: 20px;
      width: fit-content;
      height: 100vh;
      li a {
        margin: 0;
        line-height: 20px;
        padding: 0;
        &:hover {
          color: $primary;
        }
      }
    }
  }
}
</style>