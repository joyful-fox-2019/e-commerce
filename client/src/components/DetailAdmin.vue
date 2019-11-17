<template>
    <div class="card-detail">
        <h5 class="title is-5">{{product.name}}</h5>
        <hr>
        <h2 class="title is-2 price">Rp.{{product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</h2>
        <p class="subtitle stock" v-if="product.stock <=100"><b>Stock tersisa : {{product.stock}} lagi!</b></p>
        <div class="number-input">
            <p><b>Description: </b> {{product.description}}</p>
        </div><br>
        <b-button @click="editProduct(product._id)" type="is-success btn edit"><i class="fas fa-edit" style="margin:5px;"></i>Edit</b-button>
        <b-button type="is-danger btn btn-delete" outlined><i class="fas fa-trash" style="margin:5px;"></i>Delete</b-button>
    </div>
</template>

<script>
export default {
  name: 'DetailForAdmin',
  props: ['product'],
  methods: {
    editProduct (id) {
      this.$router.push(`/editProduct/${id}/detail`)
    }
  }
}
</script>
<style scoped>
.card-detail {
    margin-top: 30px;
}
.stock {
    font-size: 14px;
    padding-top: 40px;
}
.btn {
    width: 30%;
    margin-right: 20px;
}
.edit:hover {
    color: #7e2e44 !important;
}
.btn-delete:hover {
    color: white !important;
}
.far {
    color: #c44f70;
    padding-top: 20px;
}
.price {
    color: #d71149;
}
</style>
