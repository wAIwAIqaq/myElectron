<template>
  <div
    style="display: flex;
    justify-content: center;padding-top:100px"
  >
    <div class="main-box">
      <div class="main-header">
        <button style="float:left" @click="back">Back</button>
        {{ year }} 年 {{ month + 1 }}月 {{ day }} 日
      </div>
      <ul>
        <li v-for="(item, index) in todoList" :key="index">
          {{ item }}
        </li>
      </ul>
      <input type="text" v-show="isEdit" v-model="todoContent" />
      <button @click="addToDoList" v-show="isEdit">save</button>
      <button @click="isEdit = !isEdit" v-show="!isEdit">add</button>
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
  mounted() {
  },
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
    addToDoList() {
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
