<template>

    <div class="edit-profile-container d-flex justify-content-center">
        <div class="profile-pic">
            <h5>Profile Pic</h5>
            <img :src="user.profilePic" alt="">
            <!-- <button class="btn btn-success">input gambar</button> -->
                <input class="my-4" type="file" @change="onFileSelected" ref="file"  accept="image/*" />
        </div>
        <div class="profile-info">
            <h5>Profile</h5>
            <form @submit.prevent="update" class="d-flex flex-column m-3" action="">
                <input v-model="user.firstName" type="text" placeholder="first name">
                <input v-model="user.lastName" type="text" placeholder="last name">
                <input v-model="user.address"  type="text" placeholder="address">
                <input type="submit" value="Update" class="btn btn-success">
            </form>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'edit-profile',
  data () {
    return {
      selectedFile: null,
      file: ''
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      this.file = this.selectedFile
    },
    update () {
      const fd = new FormData()
      fd.append('firstName', this.user.firstName)
      fd.append('lastName', this.user.lastName)
      fd.append('address', this.user.address)
      fd.append('file', this.file)
      this.$store.dispatch('UPDATE_PROFILE', fd)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.$store.dispatch('GET_PROFILE')
  }

}
</script>

<style scoped>

.edit-profile-container{
    width: 100%;
    padding: 50px;
}

.profile-pic{
    padding: 20px;
    width: 300px;
    height: 330px;
    border-radius: 15px ;
    box-shadow: 6px 4px 20px 0px rgba(0, 0, 0, 0.171);
    background: #11998e;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.profile-pic img{
    width: 200px;
    height: 200px;
    border-radius: 50% ;
    margin-bottom: 10px;
}

.profile-info input{
    width: 300px ;
    margin: 10px 0;
    padding: 5px 15px;
}

</style>
