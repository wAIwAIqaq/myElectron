<template>
  <div
    style="display: flex;
    justify-content: center;padding-top:100px"
  >
    <div class="main-box">
      <div class="main-header">
        <img
          src="../../assets/fonts/back.svg"
          style="float:left;cursor:pointer;height:20px;aspect-ratio:1/1"
          @click="back"
        />
        {{ year }} 年 {{ month + 1 }}月 {{ day }} 日
      </div>
      <ul>
        <li v-for="(item, index) in todoList" :key="index">
          {{ item }}
        </li>
      </ul>
      <input
        type="text"
        ref="edit-input"
        v-show="isEdit"
        v-model="todoContent"
      />
      <img
        src="../../assets/fonts/addcircle.svg"
        style="float:right;cursor:pointer;height:20px;aspect-ratio:1/1"
        @click="addToDoList"
        v-show="isEdit"
      />
      <img
        src="../../assets/fonts/add.svg"
        style="float:left;cursor:pointer;height:20px;aspect-ratio:1/1"
        @click="toEdit"
        v-show="!isEdit"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
      todoContent: ""
    };
  },
  mounted() {},
  computed: {
    year() {
      return this.$route.params.year;
    },
    month() {
      return this.$route.params.month;
    },
    day() {
      return this.$route.params.day;
    },
    todoList() {
      const curTodoList = JSON.parse(
        window.localStorage.getItem(
          `${this.year}-${this.month + 1}-${this.day}`
        )
      );
      return Array.isArray(curTodoList) ? curTodoList : [];
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toEdit() {
      this.isEdit = !this.isEdit;
      this.$refs["edit-input"].focus()
    },
    addToDoList() {
      if (this.todoContent.length === 0) {
        return;
      }
      const year = this.year;
      const month = this.month;
      const day = this.day;
      window.localStorage.setItem(
        `${year}-${month + 1}-${day}`,
        JSON.stringify([...this.todoList, this.todoContent])
      );
      this.isEdit = !this.isEdit;
      this.todoList.push(this.todoContent);
      this.todoContent = "";
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
  li::marker {
    color: rgb(18, 150, 219);
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
