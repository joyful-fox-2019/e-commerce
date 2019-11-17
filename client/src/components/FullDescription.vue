<template>
    <div class="card-detail">
        <h5 class="title is-5">{{product.name}}</h5>
        <hr>
        <h2 class="title is-2 price">Rp.{{product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</h2>
        <p class="subtitle stock" v-if="product.stock <=100"><b>Stock tersisa : {{product.stock}} lagi!</b></p>
        <div class="number-input">
            <p><b>Description: </b> {{product.description}}</p>
        </div><br>
        <div style="display: inline;margin: 25px 5px;" v-for="(tag, index) in product.category" :key="index">
            <b-tag style="background-color: #f085a3; height:20px;">{{ tag }}</b-tag>
        </div>
    </div>
</template>

<script>
export default {
  name: 'fullDescription',
  props: ['product']
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
