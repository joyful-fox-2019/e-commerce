<template>
  <div id="newitem">
    <div id="cover_item">
      <div id="item">
        <img src="../../assets/images/items/newitem1.jpg" alt="newitem1" width="100px" height="100px">
      </div>
      <p>Inventory Expansion</p>
      <p style="color: red;">rps 4000</p>
    </div>
    <div id="cover_item">
      <div id="item">
        <img src="../../assets/images/items/newitem2.jpg" alt="newitem1" width="100px" height="100px">
      </div>
      <p>Bronze Word - 7 days</p>
      <p style="color: red;">rps 360</p>
    </div>
    <div id="cover_item">
      <div id="item">
        <img src="../../assets/images/items/newitem3.jpg" alt="newitem1" width="100px" height="100px">
      </div>
      <p>Craydeneh's card (Top)</p>
      <p style="color: red;">rps 490</p>
    </div>
    <div id="cover_item">
      <div id="item">
        <img src="../../assets/images/items/newitem4.jpg" alt="newitem1" width="100px" height="100px">
      </div>
      <p>Craydeneh's card</p>
      <p style="color: red;">rps 490</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newitem'
}
</script>

<style scoped>
  #newitem {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  #item {
    padding: 5px 5px;
    background-color: #B2AFAF;
  }
  #cover_item {
    display: flex;
    flex-direction: column;
    max-width: 110px;
  }
</style>
