Vue.createApp({
  data() {
    return {
      newTodo: "",
      todoList: [],
      temp: "",
      tempId: "",
      selected: "all"
    };
  },
  computed: {
    //過濾列表
    filterData() {
      switch (this.selected) {
        case "all":
          return this.todoList;
        case "undo":
          return this.todoList.filter(item => item.isCompleted === false);
        case "completed":
          return this.todoList.filter(item => item.isCompleted === true);
      }
    }
  },
  methods: {
    addTodoService() {
      this.addItem();
      this.setLocalStorage();
    },
    removeTodoService(item) {
      this.removeItem(item);
      this.setLocalStorage();
    },
    doneEditService() {
      this.doneEdit();
      this.setLocalStorage();
    },
    checkTodoService(item) {
      this.checkTodo(item);
      this.setLocalStorage();
    },
    // 新增資料
    addItem() {
      this.todoList.push({
        id: this.todoList.length + 1,
        text: this.newTodo,
        isCompleted: false
      });
      this.newTodo = "";
    },
    // 移除資料
    removeItem(item) {
      const index = this.todoList.findIndex(obj => obj.id === item.id);
      this.todoList.splice(index, 1);
    },
    // 編輯資料
    editItem(item) {
      this.temp = { ...item };
      this.tempId = this.temp.id;
    },
    doneEdit() {
      const index = this.todoList.findIndex(obj => obj.id === this.temp.id);
      this.todoList[index] = this.temp;
      this.temp = {};
      this.tempId = "";
    },
    checkTodo(item) {
      const index = this.todoList.findIndex(obj => obj.id === item.id);
      this.todoList[index].isCompleted = !this.todoList[index].isCompleted;
    },
    removeAllItem() {
      this.todoList = [];
      localStorage.setItem("data", JSON.stringify([]));
    },
    /**
     * 加入LocalStorage
     */
    setLocalStorage() {
      console.log("儲存");
      localStorage.setItem("data", JSON.stringify(this.todoList));
    },
    /**
     * 讀取LocalStorage
     */
    getLocalStorage() {
      const oldRecord = JSON.parse(localStorage.getItem("data"));
      this.todoList = oldRecord;
    }
  },
  mounted() {
    this.getLocalStorage();
  }
}).mount("#app");
