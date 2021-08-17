import {
  createApp,
  ref,
  onMounted,
  computed,
} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js";

const app = createApp({
  setup() {
    const newTodo = ref("");
    const todoList = ref([]);
    const temp = ref("");
    const tempId = ref("");
    const selected = ref("all");

    const filterData = computed(() => {
      switch (selected.value) {
        case "all":
          return todoList.value;
        case "undo":
          return todoList.value.filter((item) => item.isCompleted === false);
        case "completed":
          return todoList.value.filter((item) => item.isCompleted === true);
      }
    });

    onMounted(() => {
      getLocalStorage();
    });

    // Wrapper
    function addTodoService() {
      addItem();
      setLocalStorage();
    }
    function removeTodoService(item) {
      removeItem(item);
      setLocalStorage();
    }
    function doneEditService() {
      doneEdit();
      setLocalStorage();
    }
    function checkTodoService(item) {
      checkTodo(item);
      setLocalStorage();
    }

    /**
     * 加入LocalStorage
     */
    function setLocalStorage() {
      localStorage.setItem("data", JSON.stringify(todoList.value));
    }
    /**
     * 讀取LocalStorage
     */
    function getLocalStorage() {
      const oldRecord = JSON.parse(localStorage.getItem("data"));
      todoList.value = oldRecord;
    }

    //addItem
    function addItem() {
      todoList.value.push({
        id: todoList.value.length + 1,
        text: newTodo.value,
        isCompleted: false,
      });
      newTodo.value = "";
    }

    //移除資料
    function removeItem(item) {
      const index = todoList.value.findIndex((obj) => obj.id === item.id);
      todoList.value.splice(index, 1);
    }
    // 編輯資料
    function editItem(item) {
      temp.value = { ...item };
      tempId.value = temp.value.id;
    }
    function doneEdit() {
      const index = todoList.value.findIndex((obj) => obj.id === temp.value.id);
      todoList[index].value = temp.value;
      temp.value = {};
      tempId.value = "";
    }
    function checkTodo(item) {
      const index = todoList.value.findIndex((obj) => obj.id === item.id);
      todoList.value[index].isCompleted = !todoList.value[index].isCompleted;
    }
    function removeAllItem() {
      todoList.value = [];
      localStorage.setItem("data", JSON.stringify([]));
    }

    return {
      todoList,
      newTodo,
      filterData,
      temp,
      tempId,
      selected,
      editItem,
      addTodoService,
      removeAllItem,
      removeTodoService,
      doneEditService,
      getLocalStorage,
      checkTodoService,
    };
  },
});
app.mount("#app");
