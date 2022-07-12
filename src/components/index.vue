<template>
  <div class="w">
    <ul class="main" ref="main">
      <li>
        <i class="iconfont">&#xe663;</i>
      </li>
      <li><i class="iconfont">&#xe684;</i></li>
      <li><i class="iconfont">&#xe502;</i></li>
      <li><i class="iconfont">&#xe602;</i></li>
      <li><i class="iconfont">&#xe501;</i></li>
      <li><i class="iconfont">&#xe767;</i></li>
      <li><i class="iconfont">&#xe603;</i></li>
    </ul>
    <ol></ol>
    <my-footer />
  </div>
</template>

<script>
import MyFooter from "./footer.vue";
export default {
  name: "HelloWorld",
  components: {
    MyFooter
  },
  mounted() {
    const list = this.$refs["main"].children;
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener("click", function() {
        this.style.transform = "translate(.7px, .8px)";
      });
      list[i].addEventListener("mouseleave", function() {
        this.style.transform = "translate(0px, 0px)";
      });
    }
  }
};
</script>

<style scoped></style>
