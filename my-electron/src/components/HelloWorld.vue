<template>
  <div class="w">
    <ul class="main">
      <li ref="icon">
        <a href="https://qq.com" target="blank"
          ><i class="iconfont">&#xe663;</i></a
        >
      </li>
      <li><i class="iconfont">&#xe684;</i></li>
      <li><i class="iconfont">&#xe502;</i></li>
      <li><i class="iconfont">&#xe602;</i></li>
      <li><i class="iconfont">&#xe501;</i></li>
      <li><i class="iconfont">&#xe767;</i></li>
      <li><i class="iconfont">&#xe603;</i></li>
    </ul>
    <ol></ol>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  created() {
    const list1 = this.$refs["li"];
    console.log(this.$refs.icon);
    debugger;
    const ol = document.querySelector("ol");
    for (let i = 0; i < list1.length; i++) {
      let li = document.createElement("li");
      li = list1[i].cloneNode(true);
      li.innerHTML = "";
      li.style.left = i * 52 + "px";
      li.style.zIndex = -i - 1;
      li.style.boxShadow = "0 5px 15px -5px #00000070";
      ol.appendChild(li);
      console.log(ol);
    }
    for (let i = 0; i < list1.length; i++) {
      list1[i].addEventListener("click", item => {
        console.log(item);
        item.style.transform = "translate(3px, 3px)";
      });
      list1[i].addEventListener("mouseleave", item => {
        console.log(item);
        item.style.transform = "translate(0px, 0px)";
      });
    }
  }
};
</script>

<style scoped></style>
