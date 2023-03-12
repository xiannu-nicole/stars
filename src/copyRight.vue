<template>
      <footer class="d-flex justify-content-center align-items-center">
          <p>copyright &copy; 2023 LiMengJhen</p>
      </footer>
</template>

<style lang="scss" scoped>
@import "../public/style/main.scss";
footer{
position: absolute;
// bottom: 0;
left: 0;
right: 0;
width: 100%;
    height: 80px;
    z-index: 99;
    text-align: center;
    background: $bg;
    font-size: 14px;
    p{
      margin-bottom: 0;
    }
}
</style>