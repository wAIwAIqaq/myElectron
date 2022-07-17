<template>
  <div
    style="display: flex;
    justify-content: center;padding-top:100px"
  >
    <div class="main-box">
      <div class="main-header">
        <button style="float:left" @click="back">Back</button>
        {{ year }} 年 {{ month + 1 }}月 {{day}} 日
      </div>
      todolist
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
          
    }
  },
  created(){
    this.initDate()
  },
  methods:{
    initDate(){
      this.year = this.$route.params.year;
      this.month = this.$route.params.month;
      this.day = this.$route.params.day;
    },
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.main-box {
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 1px 2px 3px 1px rgb(0 0 0 / 20%);
}
.main-header {
  height: 30px;
  width: 100%;
  line-height: 30px;
  text-align: center;
}
.main-body {
  width: 100%;
}
</style>
