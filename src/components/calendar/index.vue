<template>
  <div
    style="display: flex;
    justify-content: center;padding-top:100px"
  >
    <div class="main-box">
      <div class="main-header">
        <img
          src="./../../assets/fonts/leftArrow.svg"
          style="cursor:pointer;height:20px;aspect-ratio:1/1"
          @click="toPrevMonth"
        />
        {{ year }} 年 {{ month + 1 }}月
        <img
          src="./../../assets/fonts/rightArrow.svg"
          style="cursor:pointer;height:20px;aspect-ratio:1/1;float:right"
          @click="toNextMonth"
        />
      </div>
      <div class="box">
        <calendar-body
          ref="body"
          :month="month"
          :year="year"
          :day="today"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CalendarBody from "./calendar-body.vue";
import DayMap from "./ultils";
export default {
  data() {
    return {
      today: 0,
      year: 1970,
      month: 0,
      now: ""
    };
  },
  components: {
    CalendarBody
  },
  created() {
    this.initRightNow();
  },
  methods: {
    initRightNow() {
      const date = new Date();
      this.today = date.getDay();
      this.year = date.getFullYear();
      this.month = date.getMonth();
    },
    toPrevMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year -= 1;
      } else {
        this.month -= 1;
      }
      this.$refs["body"].getMonthDays(this.year, this.month);
    },

    toNextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year += 1;
      } else {
        this.month += 1;
      }
      this.$refs["body"].getMonthDays(this.year, this.month);
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
  .box {
    position: relative;
    aspect-ratio: 1/1;
  }
}
.main-header {
  height: 30px;
  width: 100%;
  line-height: 30px;
  padding-bottom: 8px;
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  justify-items: center;
}
</style>
