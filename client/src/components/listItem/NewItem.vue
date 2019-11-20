<template>
  <div id="newitem">
    <div id="cover_item" v-for="item in fetchItem" :key="item._id">
      <div id="item">
        <img :src="item.image" :alt="newitem+item._id" width="100px" height="100px" />
      </div>
      <p>{{item.name}}</p>
      <p style="color: red;">rps: {{item.rps}}</p>
      <p style="color: blue;">stock: {{item.stock}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "newitem",
  computed: {
    fetchItem() {
      return this.$store.state.newItem;
    }
  },
  created() {
    this.$store.dispatch("fetchNewItem");
  }
};
</script>

<style scoped>
#newitem {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
#item {
  padding: 5px 5px;
  background-color: #b2afaf;
}
#cover_item {
  display: flex;
  flex-direction: column;
  max-width: 110px;
}
</style>
