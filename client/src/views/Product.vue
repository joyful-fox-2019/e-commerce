<template>
  <div id="product" style="margin: 30px 0;">
    <div class="container is-fluid">
      <div class="media">
        <div class="media-left">
          <figure class="image is-square" style="width: 300px;">
            <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">ASUS ROG</p>
          <p class="subtitle is-6"><strong>Rp 12.000.000</strong></p>
          <b-taglist>
            <b-tag type="is-info">First</b-tag>
            <b-tag type="is-info">Second</b-tag>
            <b-tag type="is-info">Third</b-tag>
            <b-tag type="is-info">Fourth</b-tag>
            <b-tag type="is-info">Fifth</b-tag>
          </b-taglist>
          <div class="buttons">
            <b-button type="is-info"
              icon-left="cart">
              Add to Cart
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.media {
  width: 100%;
}
.media-content {
  padding: 20px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
