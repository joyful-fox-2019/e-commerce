<template>
  <div>
    <h2 class="mt-5 mt-md-2 mb-4 text-white"> Edit Game </h2>
    <form enctype="multipart/form-data" @submit.prevent="updateData()">
      <b-form-input required v-model="title" placeholder="Game Title"></b-form-input>
      <b-form-input required v-model="tags" class="mt-3" placeholder="Price"></b-form-input>
      <b-form-input required v-model="tags" class="mt-3" placeholder="Quantity"></b-form-input>
      <b-form-file
        class="mt-3"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a image or drop for edit game here..."
        drop-placeholder="Drop image here..."
      ></b-form-file>
      <b-button @click="goBack" variant="secondary" class="mt-3 mr-2">Back</b-button>
      <b-button variant="dark" type="submit" class="mt-3 mr-2">Edit Game</b-button>
      <b-button @click="deleteArticle()" variant="danger" class="mt-3 mr-2">Delete Game</b-button>
      <img :src="imgUrl" class="mt-3" width="100%">
    </form>
  </div>
</template>

<script>
import axios from '../config/getdata'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      title:'',
      content: '',
      tags: '',
      editorOption: {},
      file: null,
      imgUrl: 'https://66.media.tumblr.com/a065703190ad984d19db0b695de70085/b5c7edb4358aa7e7-13/s540x810/decb5e16ae095f7b853b2c26e37197cb1731c3f7.jpg',
    }
  },
  components: {
    
  },
  methods: {
    goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  computed: {
    
  },
  created(){
    
  }
}
</script>

<style>
  .ql-editor{
    height: 50vh;
  }
</style>