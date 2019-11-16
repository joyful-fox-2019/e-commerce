<template>
  <div class="detail-info">
    <div class="field">
      Published:
    </div>
    <div>
      {{ formattedPublishedDate }}
    </div>
    <div class="field mt-5">
      Writer:
    </div>
    <div>
      {{ product.writer }}
    </div>
    <div class="field mt-5">
      Penciler:
    </div>
    <div>
      {{ product.penciler }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailInfo',
  props: {
    product: Object
  },
  computed: {
    formattedPublishedDate () {
      const published = new Date(this.product.published)
      const month = published.toLocaleString('default', { month: 'long' })
      const date = published.getDate()
      const year = published.getFullYear()
      return `${month} ${date}, ${year}`
    }
  }
}
</script>

<style>
.field {
  font-weight: bold;
}
.detail-info {
  opacity: 0.9;
}
</style>
