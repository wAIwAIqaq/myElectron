<template>
  <div class="main-body" ref="main-body">
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
      class="body-cell cur-month-day"
      v-for="item in curMonthDays"
      :key="item + Math.random()"
      @click="jumpToToDoPage(item)"
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
    this.getMonthDays(this.year, this.month);
  },
  activated() {
    this.getMonthDays(this.year, this.month);
  },
  methods: {
    getMonthDays(year, month) {
      let monthFirstDay = new Date(year, month, 1).getDay();
      if (monthFirstDay == 0) monthFirstDay = 7;
      const d = new Date(year, month + 1, 0);
      const days = d.getDate();
      const curMonthDays = [];
      let prevMonthDay = new Date(year, month, 0).getDate();
      const prevMonthDays = [];
      let i = 0;
      while (i < monthFirstDay) {
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
      this.$nextTick(() => {
        this.initCurrentDay();
        this.initTodoListDay();
      });
    },

    initCurrentDay() {
      const curDate = new Date();
      const curYear = curDate.getFullYear();
      const curMonth = curDate.getMonth();
      const curDay = Number(String(curDate).split(" ")[2]);
      const days = this.$refs["main-body"].children;
      if (curYear === this.year && curMonth === this.month) {
        days[this.prevMonthDays.length + 6 + curDay].className += " today";
      }
    },

    initTodoListDay() {
      const days = this.$refs["main-body"].children;
      let i = 7;
      while (i < days.length) {
        const curTodoList = JSON.parse(
          window.localStorage.getItem(
            `${this.year}-${this.month + 1}-${days[i].children[0].innerHTML}`
          )
        );
        if (Array.isArray(curTodoList) && curTodoList.length > 0) {
          days[i].className += " todo";
        }
        i++;
      }
    },

    jumpToToDoPage(day) {
      this.$router.push({
        name: "ToDoList",
        params: {
          year: this.year,
          month: this.month,
          day
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-body {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0% 0%;
  background: transparent;
  display: grid;
  box-sizing: border-box;
  border-left: 1px solid rgb(235, 235, 235);
  border-top: 1px solid rgb(235, 235, 235);
  grid-template-columns: repeat(7, 1fr);
  .body-header {
    background: transparent;
    height: 20px;
    line-height: 20px;
    width: 100%;
  }
  .body-cell {
    box-sizing: border-box;
    text-align: center;
    font-size: 10px;
    border-bottom: 1px solid rgb(235, 235, 235);
    border-right: 1px solid rgb(235, 235, 235);
    position: relative;
    cursor: pointer;
    aspect-ratio: 1/1;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .todo::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    top: 5px;
    right: 5px;
    border-radius: 50%;
    background-color: red;
  }
  .cur-month-day:not(.today) {
    span:hover {
      position: abosolute;
      height: 24px;
      aspect-ratio: 1;
      border-radius: 50%;
      line-height: 24px;
      color: #fff;
      background-color: rgb(18, 150, 219);
      box-shadow: inset 2px 2px 1px rgba(0, 0, 0, 0.15),
        inset -2px -2px 1px rgba(255, 255, 255, 0.15),
        2px 2px 1px rgba(0, 0, 0, 0.15), -2px -2px 1px rgba(255, 255, 255, 0.15);
    }
  }
  .today {
    background: rgb(18, 150, 219);
    border-radius: 10%;
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.15),
      inset -5px -5px 5px rgba(255, 255, 255, 0.15);
    color: #fff;
  }
  .disabled {
    cursor: not-allowed;
    color: #c0c4cc;
    display: table-cell;
  }
}
</style>
