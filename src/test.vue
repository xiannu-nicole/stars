<script>
import { mapState,mapMutations } from "vuex";
import $ from "jquery";

export default {
  data() {
    return {
      isClick: "",
      ans_show: "",
    };
  },
  computed: {
    ...mapState(["testData", "testScore"]),

    test_50pct(){
      return Math.ceil(this.testData.length / 2)
    },

    isRight() {
      return function (oneAns) {
        return oneAns.right === true ? "right" : "wrong";
      };
    },
  },
  mounted() {
    this.$store.dispatch("getMainDate");
  },
  methods: {

    goTop(){
      $("html,body").scrollTop(0)
    },
    // 開始第一題
    start() {
      $("#test-start").removeClass("show");
      $("#Q1").addClass("show");
      $("#progress-box").addClass("active");
      this.goTop()
    },

    // 題目開始
    next_question(oneAns, q_index) {
      // 第一題的 q_index 為 0，加 1 使第一題 q_index 為 1
      q_index = q_index + 1;
      // 點擊q_index題目按鈕，要出現下一題（q_index + 1）題目
      let nextTest = q_index + 1;
      nextTest = `#Q` + nextTest;
      // 進度條
      // let nextTest = q_index
      let progress_color = $("#progress-color");
      let progress_box_w = $("#progress-box").width();
      // 進度條進度
      let progress_color_length =
        (progress_box_w / this.testData.length) * q_index;
      progress_color.css({
        width: progress_color_length,
      });
      this.goTop()
      // 計分
      if (oneAns.right === true) {
        let getScore = 100 / this.testData.length;
        this.$store.commit("getScore", getScore);
      } else {
        this.$store.commit("getScore", 0);
      }
            // 進行一半
      if (q_index === this.test_50pct) {
        $("#testing").delay(1000).fadeIn(0);
        $("#testing").siblings().find(".test-box").delay(1000).fadeOut(0);
      }
            // 最後一題 ＝> 成功
      if (q_index === 10 && this.$store.state.testScore >= 60) {
        $("#successful").delay(1000).fadeIn(0);
        $("#successful").siblings().delay(1000).fadeOut(0);
      }
      // 最後一題 ＝> 失敗
      if (q_index === 10 && this.$store.state.testScore < 60) {
        $("#unsuccessful").delay(1000).fadeIn(0);
        $("#unsuccessful").siblings().delay(1000).fadeOut(0);
      }
      // 開始第二、三....題
      if (
        q_index < this.testData.length && q_index !== this.test_50pct
      ) {
        $(nextTest).delay(1000).fadeIn(0);
        $(nextTest).siblings().delay(1000).fadeOut(0);
        // $(nextTest).fadeIn();
        // $(nextTest).siblings().fadeOut();
      }

    },

        // 繼續旅程
    testContinue() {
      $("#testing").fadeOut(0);
      let theTest = "#Q" + (this.test_50pct + 1)
      $(theTest).show();
      this.goTop()
    },
    
    // 再次挑戰
    again() {
      location.reload();
      // this.$router.go()
      this.goTop()
    },
  },
};
</script>

<template>
  <div class="container">
    <!-- 進度條 -->
    <div id="progress-box">
      <div id="progress-color">
        <img src="/stars/public/image/top.png" alt="" />
      </div>
    </div>
    <!-- 開場 -->
    <div id="test-start" class="test-box show">
      <h3 class="my-mb-1">你對星星了解多少？</h3>
      <p class="my-mb-2">
        經過這一系列介紹，你對星星了解多少了呢？我們這就展開一場太空之旅，測試測試你對星星的熟悉程度吧！
      </p>
      <img class="my-mb-2" src="/stars/public/image/test/test-start.png" alt="" />
      <div class="next">
        <a class="btn primary" @click="start">開始測驗</a>
      </div>
    </div>
    <!-- 題目 -->
    <div id="test-questions">
      <div
        :id="`Q` + (q_index + 1)"
        class="test-box"
        v-for="(item, q_index) in testData"
        :key="item.question"
      >
        <small class="num">Q {{ q_index + 1 }}</small>
        <h4>{{ item.question }}</h4>
        <div class="next">
          <a
            class="btn"
            @click.once="
              [(ans_show = `Q` + (q_index + 1)), next_question(oneAns, q_index)]
            "
            :class="[
              isRight(oneAns),
              isClick,
              ans_show === `Q` + (q_index + 1) ? 'active' : '',
            ]"
            v-for="oneAns in item.ans"
            :key="oneAns.text"
          >
            {{ oneAns.text }}
          </a>
        </div>
      </div>
    </div>
    <!-- 1/3 -->
    <div id="testing" class="test-box">
      <h3 class="my-mb-1">恭喜你作答一半</h3>
      <p class="my-mb-2">你途經月球，跟月兔們打招呼吧！</p>
      <img class="my-mb-2" src="/stars/public/image/test/testing.png" alt="" />
      <div class="next">
        <a class="btn primary" @click="testContinue">繼續旅程</a>
      </div>
    </div>
    <!-- unsuccessful -->
    <div id="unsuccessful" class="test-box">
      <h3 class="my-mb-1">
        你的成功率為 <span class="score unsuccessful">{{ testScore }}%</span>
      </h3>
      <p class="my-mb-2">可惜，你的火箭慘遭隕石撞擊，請返回地球修復機體。</p>
      <img class="my-mb-2" src="/stars/public/image/test/unsuccessful.png" alt="" />
      <div class="next">
        <a class="btn primary" @click="again">再次挑戰</a>
        <router-link to="/" class="btn">回頭進修</router-link>
      </div>
    </div>
    <!-- successful -->
    <div id="successful" class="test-box">
      <h3 class="my-mb-1">
        你的成功率為 <span class="score successful">{{ testScore }}%</span>
      </h3>
      <p class="other-web my-mb-2">
        恭喜成功登上土星！
        <br />什麼？你還想去海王星？那你還得吸取更多的宇宙知識呢。
        <br /><br /><small>推薦你到下列網站進一步學習。</small> <br /><a class="other-links"
          href="https://www.tam.gov.taipei/"
          target="_blank"
          ><small>台北市立天文科學教育館</small></a
        >
        <br /><a class="other-links"
          href="https://www.cwb.gov.tw/V8/C/K/Encyclopedia/astronomy/index.html"
          target="_blank"
          ><small>交通部中央氣象局 ─ 天文百問</small></a
        >
      </p>
      <img @load="isLoad = false" :class="isLoad === false ? 'is-load show' : 'is-load'" class="my-mb-2" src="/stars/public/image/test/successful.png" alt="" />
      <div class="next">
        <router-link class="btn primary align-center test-btn-pd my-mb-2" to="/"
          >回首頁</router-link
        >
        <a class="btn secondary align-center test-btn-pd" @click="again"
          >再次挑戰</a
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../public/style/main.scss";
#progress-box {
  display: none;
  margin-bottom: 60px;
  height: 10px;
  border-radius: 4px;
  border: 1px solid #ffffff;
  &.active {
    display: block;
    width: 95%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  #progress-color {
    position: relative;
    height: 100%;
    width: 0;
    background-color: $primary;
    margin-bottom: 40px;
    transition: all 0.3s;
    z-index: 0;
    img {
      position: absolute;
      top: -2.8rem;
      width: 60px;
      height: 60px;
      transform: rotate(90deg);
      animation: rocket 3s infinite;
      z-index: 1;
    }
  }
}

@keyframes rocket {
  0% {
    top: -1.7rem;
    right: -2.2rem;
  }
  25% {
    top: -2.1rem;
    right: -2rem;
  }
  50% {
    top: -1.7rem;
    right: -2.2rem;
  }
  75% {
    top: -1.3rem;
    right: -2rem;
  }
  100% {
    top: -1.7rem;
    right: -2.2rem;
  }
}



.test-box {
  display: none;
  transition: all 0.6s;
  &.show{
    display: block;
  }
  small.num {
    font-family: "RocknRoll One", sans-serif;
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: $primary;
    color: $bg;
    margin-bottom: 16px;
  }
  h3,
  h4 {
    color: $primary;
  }
  .next {
    .btn {
      font-family: "Noto Sans TC", sans-serif;
      border: 1px solid #ffffff;
      font-weight: bold;
      width: 100%;
      line-height: 2;
      margin: 20px 0;
      &.primary {
        border: 1px solid $primary;
        background-color: $primary;
        color: $bg;
      }
      &.active {
        color: #fff;
        &:hover {
          color: #fff;
        }
        &.right {
          background-color: $right;
          border: 1px solid $right;
        }
        &.wrong {
          background-color: $wrong;
          border: 1px solid $wrong;
        }
      }
      &:hover {
        border: 1px solid $primary;
        background-color: $primary;
        color: $bg;
        filter: brightness(1.2);
      }
    }
  }
  .score {
    display: inline-block;
    font-size: 2em;
    &.successful {
      color: $right;
    }
    &.unsuccessful {
      color: $wrong;
    }
  }
  a.other-links{
    text-decoration: underline;
    &:hover{
      small{
      color: $primary;
      }
    }
  }
}
@media (min-width:992px) {
  #progress-box {
    &.active {
    display: block;
    width: 100%;
  }
  #progress-color {
    img {
      width: 90px;
      height: 90px;
    }
  }
}
  @keyframes rocket {
  0% {
    top: -2.6rem;
    right: -2.2rem;
  }
  25% {
    top: -3.1rem;
    right: -2rem;
  }
  50% {
    top: -2.6rem;
    right: -2.2rem;
  }
  75% {
    top: -2.1rem;
    right: -2rem;
  }
  100% {
    top: -2.6rem;
    right: -2.2rem;
  }
}

}
</style>
