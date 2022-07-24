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
        <div>
          <div
            ref="year"
            style="display:inline-block;border:2px solid transparent"
            @click="editYear"
          >
            {{ year }}
          </div>
          <span style="border:1px solid transparent">年</span>
          <div
            ref="month"
            style="display:inline-block;border:2px solid transparent"
            @click="editMonth"
          >
            {{ month + 1 < 10 ? `0` + (month + 1) : month + 1 }}
          </div>
          <span style="border:1px solid transparent">月</span>
        </div>

        <img
          src="./../../assets/fonts/rightArrow.svg"
          style="cursor:pointer;height:20px;aspect-ratio:1/1;float:right"
          @click="toNextMonth"
        />
      </div>
      <div class="box">
        <calendar-body ref="body" :month="month" :year="year" :day="today" />
      </div>
    </div>
  </div>
</template>

<script>
import CalendarBody from "./calendar-body.vue";
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
  watch: {
    month(newVal, val) {
      console.log(newVal, val);
    }
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
    },

    editYear() {
      const curItem = this.$refs["year"];
      curItem.style.outline = "none";
      curItem.contentEditable = true;
      curItem.style.borderBottom = "2px solid #333";
      const saveFn = () => {
        let curYear = Number(curItem.innerText);
        if (curYear > 2099) {
          this.year = 2099;
        } else if (curYear < 1970) {
          this.year = 1970;
        } else {
          this.year = curYear;
        }
        curItem.style.borderBottom = "2px solid transparent";
        this.$refs["body"].getMonthDays(this.year, this.month);
      };
      curItem.addEventListener("blur", saveFn, { once: true });
    },

    editMonth() {
      const curItem = this.$refs["month"];
      curItem.style.outline = "none";
      curItem.contentEditable = true;
      curItem.style.borderBottom = "2px solid #333";
      const saveFn = () => {
        let curMonth = Number(curItem.innerText);
        if (curMonth > 11) {
          this.month = 11;
        } else if (curMonth < 0) {
          this.month = 0;
        } else {
          this.month = curMonth - 1;
        }
        curItem.style.borderBottom = "2px solid transparent";
        this.$refs["body"].getMonthDays(this.year, this.month);
      };
      curItem.addEventListener("blur", saveFn, { once: true });
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
