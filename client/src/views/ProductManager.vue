<template>
  <div id="product-manager" style="margin: 30px 0;">
    <div class="container is-fluid">
      <div>
      <!-- {{articles}} -->
        <div class="card" v-for="num in 5" :key="num">
          <div class="card-content">
            <div class="columns">
              <div class="column is-half">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">ASUS ROG</p>
                    <div class="columns">
                      <div class="column">
                        <p class="subtitle is-6">sisa stok: 3</p>
                      </div>
                      <div class="column">
                        <!-- <b-taglist>
                          <span
                            v-for="(tag, index) in article.tags"
                            :key="index"
                            @click="filterTag(tag)"
                            style="cursor: pointer;"
                            class="tag is-light"
                          >{{tag}}</span>
                        </b-taglist> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column"></div>
              <div class="column is-1">
                <div class="media-content">
                  <figure class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/256x256.png" alt="Image" />
                  </figure>
                </div>
              </div>
              <div
                class="column is-1"
                style="display: flex; align-items: center; padding: 0 50px 0 50px;"
              >
                <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                  <b-icon icon="dots-horizontal" slot="trigger"></b-icon>
                  <b-dropdown-item aria-role="listitem">Update</b-dropdown-item>
                  <b-dropdown-item aria-role="listitem">Delete</b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
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
.card {
  width: 100%;
  height: 120px;
}
</style>
