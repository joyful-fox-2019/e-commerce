<template>
  <div id="newitem">
    <div id="cover_item" v-for="item in fetchItem" :key="item._id">
      <div @click="buy(item._id)" id="item">
        <img :src="item.image" :alt="newitem+item._id" width="100px" height="100px" />
      </div>
      <p @click="buy(item._id)" id="itemName">{{item.name}}</p>
      <p @click="buy(item._id)" id="itemRps" style="color: red;">
        <img src="../../assets/images/rps.gif" alt="rps" />
        {{item.rps}}
      </p>
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
#item:hover {
  cursor: pointer;
}
#itemName:hover {
  cursor: pointer;
  color: yellowgreen;
}
#itemRps:hover {
  cursor: pointer;
  color: yellow;
}
#cover_item {
  display: flex;
  flex-direction: column;
  max-width: 110px;
}
</style>
