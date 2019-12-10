<template>
  <div>
    <Navbar></Navbar>
    <ListProduct></ListProduct>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import ListProduct from './ListProduct'

export default {
  name: 'home',
  components: {
    Navbar,
    ListProduct
  },
  data () {
    return {
      navigation: 'home'
    }
  }
}
</script>
