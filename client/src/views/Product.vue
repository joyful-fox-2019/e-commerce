<template>

  <div class="about">
    <h1>This is a user page</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //       name: '',
  //       price: '',
  //       file: null,
  //       description: '',
  //       stock: 0
  //   }
  // },
  // methods: {
  //   createProduct() {

  //     let body = new FormData()
  //       body.append('name', this.name)
  //       body.append('price', this.price)
  //       body.append('description', this.description)
  //       body.append('stock', this.stock)
  //       body.append('file', this.file)

  //     this.axios.post('/products',body, {
  //       headers: {
  //         token: localStorage.getItem('token')
  //       }
  //     })
  //       .then(({ data }) => {
  //         console.log(data, "create new productttt")
  //         this.$router.push('/')
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })

  //   }
  // }
}
</script>

<style>

</style>
