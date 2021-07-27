Vue.createApp({
  data() {
    return {
      firstNum: "",
      secondNum: "",
      operator: "",
      answer: "",
      record: []
    };
  },
  methods: {
    /**
     * 計算答案
     */
    calculate() {
      switch (this.operator) {
        case "+":
          this.answer = this.firstNum + this.secondNum;
          break;
        case "-":
          this.answer = this.firstNum - this.secondNum;
          break;
        case "*":
          this.answer = this.firstNum * this.secondNum;
          break;
        case "/":
          this.answer = this.firstNum / this.secondNum;
          break;
      }
    },
    /**
     * 紀錄算式
     */
    addRecord() {
      let fomula = "";
      switch (this.operator) {
        case "+":
          fomula = this.firstNum + " + " + this.secondNum + " = " + this.answer;
          break;
        case "-":
          fomula = this.firstNum + " - " + this.secondNum + " = " + this.answer;
          break;
        case "*":
          fomula = this.firstNum + " * " + this.secondNum + " = " + this.answer;
          break;
        case "/":
          fomula = this.firstNum + " ÷ " + this.secondNum + " = " + this.answer;
          break;
      }
      if (this.record.length === 10) {
        this.record.splice(0, 1);
      }
      this.record.push(fomula);
    },
    /**
     * 加入LocalStorage
     */
    setLocalStorage() {
      localStorage.setItem("data", JSON.stringify(this.record));
    },
    calService() {
      this.calculate();
      this.addRecord();
      this.setLocalStorage();
    },
    /**
     * 讀取LocalStorage
     */
    getLocalStorage() {
      const oldRecord = JSON.parse(localStorage.getItem("data"));
      this.record = oldRecord;
    },
    /**
     * 清除record , LocalStorage
     */
    clear() {
      this.record = [];
      localStorage.setItem("data", JSON.stringify([]));
    }
  },
  mounted() {
    this.getLocalStorage();
  }
}).mount("#app");
