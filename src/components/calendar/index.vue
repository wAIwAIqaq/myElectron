<template>
  <div
    style="display: flex;
    justify-content: center;padding-top:100px"
  >
    <div class="main-box">
      <div class="main-header">
        <button style="float:left" @click="toPrevMounth">上月</button>
        {{ year }} {{ month + 1 }}月
        <button style="float:right" @click="toNextMounth">下月</button>
      </div>
      <calendar-body ref="body" :month="month" :year="year" :day="today" />
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
    toPrevMounth() {
      if (this.month === 0) {
        this.month = 11;
        this.year -= 1;
        this.$refs["body"].getMonthDays(this.year, this.month);
        return;
      }
      this.month -= 1;
      this.$refs["body"].getMonthDays(this.year, this.month);
    },
    toNextMounth() {
      if (this.month === 11) {
        this.month = 0;
        this.year += 1;
        this.$refs["body"].getMonthDays(this.year, this.month);
        return;
      }
      this.month += 1;
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
