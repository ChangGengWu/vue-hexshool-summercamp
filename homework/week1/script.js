Vue.createApp({
  data: function() {
    return {
      data: [],
      photoPixel: [
        { type: "清晰", value: "large" },
        { type: "中等", value: "medium" },
        { type: "模糊", value: "thumbnail" }
      ],
      currentPixel: 0
    };
  },
  methods: {
    fetchUsers: function() {
      return axios
        .get("https://randomuser.me/api/?results=6")
        .then(response => {
          response.data.results.forEach(element => {
            element.isLike = false;
          });
          this.data = response.data.results;
        });
    },
    updatePixel: function() {
      this.currentPixel = this.currentPixel < 2 ? (this.currentPixel += 1) : 0;
    }
  },
  mounted: function() {
    this.fetchUsers();
  }
}).mount("#app");
