<template>
<div>
  <div class="container">
      <div class="row">
          <div class="col-sm-10 offset-1 border">
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
                              <div class="row">
                                  <div class="col-sm-4">
                                      <p>Name</p>
                                      <p>Email</p>
                                      <p>Membership</p>
                                  </div>
                                  <div class="col-sm-8">
                                      <p>{{user.username}}</p>
                                      <p>{{user.email}}</p>
                                      <p>{{user.membership}}</p>
    <b-button v-b-modal.modal-prevent-closing class="btn  my-2 my-sm-0" href="" ><i class="fa fa-plus pr-1"></i>add product</b-button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


  </div>
    <UserStore></UserStore>
    <AddProductModal></AddProductModal>


</div>
</template>

<script>
import AddProductModal from '@/components/AddProductModal'
import UserStore from '@/components/UserStore'

export default {
    components : {
        AddProductModal,
        UserStore
    },
    data() {
        return {
            
        }
    },
    computed: {
        user () {
            return this.$store.state.user
        }
  }
}
</script>

<style>

</style>