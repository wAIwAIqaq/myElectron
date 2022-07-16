<template>
  <div class="main-body">
    <div
      class="body-cell body-header"
      v-for="(item, index) in dayEnums"
      :key="index"
    >
      {{ item[1] }}
    </div>
    <div
      class="body-cell disabled"
      v-for="item in prevMonthDays"
      :key="item + Math.random()"
    >
      <span>{{ item }}</span>
    </div>
    <div
      class="body-cell"
      v-for="item in curMonthDays"
      :key="item + Math.random()"
    >
      <span>{{ item }}</span>
    </div>
    <div
      class="body-cell disabled"
      v-for="item in nextMonthDays"
      :key="item + Math.random()"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import DayMap from "./ultils";
export default {
  props: {
    year: {
      type: Number,
      default: () => 1970
    },
    month: {
      type: Number,
      default: () => 0
    },
    day: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      dayEnums: [...DayMap],
      curMonthDays: [],
      prevMonthDays: [],
      nextMonthDays: []
    };
  },
  mounted() {
    this.getMonthDays(this.year, this.month, this.day);
  },
  watch: {},
  methods: {
    getMonthDays(year, month, day) {
      const d = new Date(year, month + 1, 0);
      const days = d.getDate();
      const curMonthDays = [];
      let prevMonthDay = new Date(year, month, 0).getDate();
      const prevMonthDays = [];
      let i = 0;
      while (i < day) {
        prevMonthDays.unshift(prevMonthDay);
        prevMonthDay--;
        i++;
      }
      i = 0;
      while (i < days) {
        curMonthDays.push(i + 1);
        i++;
      }
      i = 1;
      const nextMonthDays = [];
      while (i <= 42 - prevMonthDays.length - curMonthDays.length) {
        nextMonthDays.push(i);
        i++;
      }
      this.prevMonthDays = prevMonthDays;
      this.curMonthDays = curMonthDays;
      this.nextMonthDays = nextMonthDays;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-body {
  display: grid;
  box-sizing: border-box;
  border-left: 1px solid rgb(235, 235, 235);
  border-top: 1px solid rgb(235, 235, 235);
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  .body-header {
    background: #f0f0f0;
    height: 20px;
    line-height: 20px;
  }
  .body-cell {
    text-align: center;
    font-size: 10px;
    border-bottom: 1px solid rgb(235, 235, 235);
    border-right: 1px solid rgb(235, 235, 235);
    position: relative;
    cursor: pointer;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .disabled {
    cursor: not-allowed;
    color: #c0c4cc;
    display: table-cell;
  }
}
</style>
