<template>
  <div id="bestitem">
    <div id="cover_item">
      <div id="item">
        <img src="../../assets/images/items/bestitem1.jpg" alt="bestitem1" width="100px" height="100px">
      </div>
      <p>Old Knight's Approval (10)</p>
      <p style="color: red;">rps 1350</p>
    </div>
    <div id="cover_item">
      <div id="item">
        <img src="../../assets/images/items/bestitem2.jpg" alt="bestitem1" width="100px" height="100px">
      </div>
      <p>Bronze Pouch - 3 Hr</p>
      <p style="color: red;">rps 150</p>
    </div>
    <div id="cover_item">
      <div id="item">
        <img src="../../assets/images/items/bestitem3.jpg" alt="bestitem1" width="100px" height="100px">
      </div>
      <p>Old Knight's Approval</p>
      <p style="color: red;">rps 150</p>
    </div>
    <div id="cover_item">
      <div id="item">
        <img src="../../assets/images/items/bestitem4.jpg" alt="bestitem1" width="100px" height="100px">
      </div>
      <p>Green Suit (Permanent)</p>
      <p style="color: red;">rps 1890</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bestitem'
}
</script>

<style scoped>
  #bestitem {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  #item {
    padding: 8px 8px;
    background-color: #B2AFAF;
  }
  #cover_item {
    display: flex;
    flex-direction: column;
    max-width: 116px;
  }
</style>
