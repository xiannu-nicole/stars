<script>
import Vue from "vue";
import vueScrollTo from "vue-scrollto";
import $ from "jquery";
Vue.use(vueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
});

export default {
  props: ["planets"],

  created() {
    window.addEventListener("scroll", this.scroll);
  },

  methods: {
    scroll() {
      for (let i = 0; i <= this.planets.length; i++) {
        if (
          this.planets[i] !== undefined &&
          $(window).scrollTop() >
            $(`#${this.planets[i].title_e}`).offset().top - 200
        ) {
          $(`.${this.planets[i].title_e}`).addClass("active");
          $(`.${this.planets[i].title_e}`)
            .parent("li")
            .siblings()
            .find("a")
            .removeClass("active");
        }
      }
    },
  },
};
</script>

<template>
    <ul id="planet-menu">
      <li v-for="item in planets" :key="item.title_e">
        <a v-scroll-to="{ el: `#${item.title_e}` }" :class="item.title_e">
          <span>{{ item.title }}</span>
        </a>
      </li>
    </ul>
</template>


<style lang="scss" scoped>
@import "../public/style/main.scss";

#planet-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: $bg;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  z-index: 100;
  margin: 0;
  padding: 8px;
  &.bottom{
  bottom: 80px;
  }
}
#planet-menu > li {
  width: 25%;
  text-align: center;
  margin: 4px 0;
  a {
    width: 100%;
    padding: 10px;
    position: relative;
    z-index: 0;
    cursor: pointer;
    &:after {
      content: "";
      opacity: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: no-repeat center/contain;
      z-index: -1;
      transition: all 0.3s;
    }
    &.mercury:after {
      background-image: url("/stars/public/image/水星/水星-icon.png");
    }
    &.venus:after {
      background-image: url("/stars/public/image/金星/金星-icon.png");
    }
    &.earth:after {
      background-image: url("/stars/public/image/地球/地球-icon.png");
    }
    &.mars:after {
      background-image: url("/stars/public/image/火星/火星-icon.png");
    }
    &.jupiter:after {
      background-image: url("/stars/public/image/木星/木星-icon.png");
    }
    &.saturn:after {
      background-image: url("/stars/public/image/土星/土星-icon.png");
    }
    &.uranus:after {
      background-image: url("/stars/public/image/天王星/天王星-icon.png");
    }
    &.neptune:after {
      background-image: url("/stars/public/image/海王星/海王星-icon.png");
    }
    span {
      font-size: 12px;
      transition: all 0.2s;
      color: #ffffff90;
    }
    &.active {
      &:after {
        opacity: 1;
      }
      span {
        opacity: 0;
      }
    }
  }
}

@media (min-width: 992px) {
  #planet-menu {
    right: 0;
    left: unset;
    width: 10vw;
    top: 50px;
    flex-direction: column;
    li {
      width: 100%;
      margin-bottom: 40px;
      a {
        span {
          font-size: 16px;
        }
        &:hover {
          &:after {
            content: "";
            opacity: 1;
          }
          span {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>