<template>
  <div id="bestpick">
    <div class="sub_content" style="margin-top:0px; margin-left:0px; height: auto;">
      <div id="title">
        <span>Best Pick Of The Month</span>
      </div>
      <div class="list_item" style=" display: flex; flex-direction: row;">
        <div id="cover_item">
          <div id="item">
            <img
              src="../../assets/images/items/bestitem2.jpg"
              alt="bestpick"
              width="100px"
              height="100px"
            />
          </div>
        </div>
        <div id="keterangan" style="max-width: 120px; margin-top: 30px;">
          <p style="margin-bottom: 3px;">Bronze Word of Blessing - (7 days)</p>
          <p style="color: red; margin-bottom: 2px;">
            <img src="../../assets/images/rps.gif" alt="rps" />360
          </p>
          <a href>
            <img src="../../assets/images/btn_gotomall.png" alt="gotomall" />
          </a>
        </div>
        <div id="group-item">
          <div style="margin-top: 35px; margin-left: 8px; width: 20px;">
            <img src="../../assets/images/left.png" alt="left" />
          </div>
          <div id="item-g1">
            <img
              src="../../assets/images/items/bestpick1.jpg"
              alt="bestpick"
              width="70px"
              height="70px"
            />
          </div>
          <div id="item-g1">
            <img
              src="../../assets/images/items/bestpick2.jpg"
              alt="bestpick"
              width="70px"
              height="70px"
            />
          </div>
          <div id="item-g1">
            <img
              src="../../assets/images/items/bestpick3.jpg"
              alt="bestpick"
              width="70px"
              height="70px"
            />
          </div>
          <div style="margin-top: 35px; margin-left: 2px; width: 20px;">
            <img src="../../assets/images/right.png" alt="left" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bestpick"
};
</script>

<style scoped>
#item-g1 {
  margin: 12px 3px 12px 15px;
  padding: 2px 2px;
  max-width: 74px;
  background-color: white;
  height: 73px;
}
#group-item {
  margin: 50px 10px 30px 40px;
  background-color: #b2afaf;
  width: 335px;
  display: flex;
}
p {
  font-size: 14px;
}
#item {
  padding: 8px 8px;
  background-color: #b2afaf;
}
#cover_item {
  margin: 30px 10px 30px 40px;
  max-width: 116px;
}
span {
  margin-top: 3px;
}
#title {
  display: flex;
  justify-content: center;
  height: 30px;
  background-color: rgb(207, 206, 204);
  color: blue;
}
#bestpick {
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 8px;
  background-color: rgb(213, 219, 214);
}
.sub_content {
  background-color: rgb(213, 219, 214);
  margin-top: 10px;
  margin-left: 5px;
  height: auto;
  width: 100%;
}
</style>
