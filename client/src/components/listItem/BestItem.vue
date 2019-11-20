<template>
  <div id="bestitem">
    <div id="cover_item" v-for="item in fetchItem" :key="item._id">
      <div id="item">
        <img :src="item.image" alt="bestitem1" width="100px" height="100px" />
      </div>
      <p>{{ item.name }}</p>
      <p style="color: red;">rps: {{item.rps}}</p>
      <p style="color: blue;">stock: {{item.stock}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "bestitem",
  computed: {
    fetchItem() {
      return this.$store.state.bestItem;
    }
  },
  created() {
    this.$store.dispatch("fetchBestItem");
  }
};
</script>

<style scoped>
#bestitem {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
#item {
  padding: 8px 8px;
  background-color: #b2afaf;
}
#cover_item {
  display: flex;
  flex-direction: column;
  max-width: 116px;
}
</style>
