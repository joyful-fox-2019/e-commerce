<template>
<div>
  <div class="container">
      <div class="row">
          <div class="col-sm-10 offset-1 border py-3">
              <div class="container">
              <h2>Biodata</h2>
                  <div class="row">
                      <div class="col-sm-4 ">
                            <div class="card">
                                <img :src="user.photo" class="card-img-top" alt="...">                                
                            </div>                          
                      </div>
                      <div class="col-sm-8 border">
                          <div class="container">
                              <div class="row py-2">
                                  <div class="col-sm-4">
                                      <p>Name</p>
                                      <p>Email</p>
                                      <p>Membership</p>
                                  </div>
                                  <div class="col-sm-8">
                                      <p>{{user.username}}</p>
                                      <p>{{user.email}}</p>
                                      <p>{{user.membership}}</p>
                                     <b-button v-b-modal.modal-prevent-closing class="btn btn-success  my-2 my-sm-0" href="" ><i class="fa fa-plus pr-1"></i>add product</b-button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
                <UserStore></UserStore>
          </div>
      </div>
  </div>  
  <AddProductModal></AddProductModal>
  <EditProduct></EditProduct>  
</div>
</template>

<script>
import AddProductModal from '@/components/AddProductModal'
import UserStore from '@/components/UserStore'
import EditProduct from '@/components/EditProduct'

export default {
    components : {
        AddProductModal,
        UserStore,
        EditProduct
    },
    data() {
        return {
            
        }
    },
    computed: {
        user () {
            return this.$store.state.user
        }
    },
    methods : {
        checkLogin(state) {
            console.log('masuk checkLogin')
            if (localStorage.getItem('token')) {
                this.$store.dispatch('findUser')
                this.$store.commit('setLogin', true)
                this.$store.dispatch('findTransaction')
            } else {
                this.$store.commit('setLogin', false)
            }
        }
    },
    created() {
        this.checkLogin()
        this.$store.dispatch('getAllProducts')
        this.$store.commit('setUserProduct')
    }
}
</script>

<style>

</style>