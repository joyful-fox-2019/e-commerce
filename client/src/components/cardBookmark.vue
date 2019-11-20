<template>
  <div>
  <b-card
      :title="item.name"
      :img-src="item.imgUrl[0]"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2 mr-2 cardHover"
    >
    <b-card-text>
        price : Rp.{{Number(item.price)*Number(item.quantities)}}
    </b-card-text>
    <b-card-text>
        Qty : {{item.quantities}} pcs
    </b-card-text>
    <b-button variant="success" @click="update">Update</b-button>
    <b-button variant="danger" @click="deleted(item._id)" class="ml-1">delete</b-button>

  </b-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
export default {
  props: [
    'item'
  ],
  data () {
    return {
        show: false
    }
  },
  methods: {
    update(){
      this.$store.commit('SET_UPDATE_DATA',this.item)
      this.$router.push('/addproduct/updateproduct')
    },
    deleted(id){
        let form = {
          id: id
        }
        this.$store.dispatch('deleteProduct', form)
          .then(({ data })=>{
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Delete successfully'
              })
              this.$store.dispatch('getMyProduct')
          })
          .catch(err=>{
              Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Delete Failed!"
              });
          })
        this.$store.dispatch('getMyProduct')
    },
    mounted () {
      this.$store.dispatch('getMyProduct')
    },
  },
  computed: mapState(["isLogin"])
}
</script>

<style>
/* what is nice 😇 */
.btn:focus, .btn:active {
  outline: none !important;
  box-shadow: none !important;
}
/* -- */
.btnNone{
    transition: 0.5s;
}
.btnNone:hover{
    color: orange
}
</style>
