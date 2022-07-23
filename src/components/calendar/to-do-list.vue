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
      <ul style="padding:16px;margin:0" ref="list">
        <li v-for="(item, index) in todoList" class="list-item" :key="index">
          <span>{{ item }}</span>
          <span>
            <img
              src="../../assets/fonts/close.svg"
              style="float:right;cursor:pointer;height:20px;aspect-ratio:1/1"
              @click="delItem(index)"
            />
            <img
              src="../../assets/fonts/edit.svg"
              style="float:right;cursor:pointer;height:20px;aspect-ratio:1/1"
              @click="editItem(index)"
            />
          </span>
        </li>
      </ul>
      <div class="edit-area">
        <textarea type="text" class="w-input" v-model="todoContent" />
        <img
          src="../../assets/fonts/addcircle.svg"
          style="float:right;cursor:pointer;height:20px;aspect-ratio:1/1"
          @click="addToDoList"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoContent: ""
    };
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

    editItem(index) {
      const parent = this.$refs["list"];
      const curItem = parent.children[index];
      const preCurItemStyle = curItem.style;
      const curTextArea = document.createElement("div");
      const width = curItem.clientWidth;
      const height = curItem.clientHeight;
      curTextArea.value = this.todoList[index];
      curTextArea.setAttribute(
        "style",
        `font-family:Microsoft YaHei;font-size:16px;width:${width -
          8}px;outline:none`
      );
      curTextArea.innerText = this.todoList[index];
      curTextArea.className = "list-item";
      curTextArea.contentEditable = "true";
      parent.insertBefore(curTextArea, curItem);
      curTextArea.focus();
      this.keepLastIndex(curTextArea);
      curTextArea.addEventListener("blur", () => {
        if (curTextArea.innerText.length > 0) {
          this.todoList[index] = curTextArea.innerText;
          curItem.children[0].innerText = curTextArea.innerText;
          curItem.style = preCurItemStyle;
        } else {
          this.todoList.splice(index, 1);
        }
        curTextArea.remove();
        this.saveChanged();
      });
      curItem.style="display:none"
    },

    delItem(index) {
      const parent = this.$refs["list"];
      const curItem = parent.children[index];
      curItem.remove();
      this.todoList.splice(index, 1);
      this.saveChanged();
    },

    saveChanged() {
      window.localStorage.setItem(
        `${this.year}-${this.month + 1}-${this.day}`,
        JSON.stringify(this.todoList)
      );
    },

    keepLastIndex(textArea) {
      if (window.getSelection) {
        //ie11 10 9 ff safari
        textArea.focus(); //解决ff不获取焦点无法定位问题
        const range = window.getSelection(); //创建range
        range.selectAllChildren(textArea); //range 选择textArea下所有子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document.selection) {
        //ie10 9 8 7 6 5
        const range = document.selection.createRange(); //创建选择对象
        //const range = document.body.createTextRange();
        range.moveToElementText(textArea); //range定位到textArea
        range.collapse(false); //光标移至最后
        range.select();
      }
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
  .list-item {
    word-wrap: break-word;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: transparent;
    backdrop-filter: blur(2px);
    border-radius: 4px;
    animation: fadeIn 0.5s 1 linear;
    padding: 4px 4px;
    margin: 4px;
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .edit-area {
    display: grid;
    grid-template-columns: 1fr 30px;
    align-items: center;
    justify-items: stretch;
    margin: 18px;
    margin-top: 0;
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
