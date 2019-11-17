<template>
  <div>
    <h2 class="mt-5 mt-md-2 mb-4"> <b></b> Create Article </h2>
    <form>
      <b-form-input required v-model="title" placeholder="Article Title"></b-form-input>
      <b-form-file
        class="mt-3"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a image or drop it here..."
        drop-placeholder="Drop image here..."
      ></b-form-file>
    <b-form-input required v-model="tags" class="mt-3" placeholder="Tags"></b-form-input>
    <b-button @click="postArticle()" variant="info" class="mt-3">Post Article</b-button>
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
      tags: null,
      editorOption: {},
      file: null
    }
  },
  components: {
    
  },
  methods: {
      // postArticle(){
      //   Swal.showLoading()
      //   const formData = new FormData()
      //   formData.append('imgUrl', this.file)
      //   formData.append('title', this.title)
      //   formData.append('description', this.content)
      //   formData.append('tags', this.tags === null ? '' : this.tags)

      //   axios({
      //     url: '/articles',
      //     method: 'post',
      //     data: formData,
      //     headers: {
      //       access_token: localStorage.getItem('access_token')
      //     }
      //   })
      //   .then(({ data }) => {
      //     console.log(data)
      //     this.successToast('Article Successfuly published!')
      //     console.log("masuk")
      //     this.$router.push({ path: `/admin/list-article/${localStorage.getItem('userid')}` })
      //   })
      //   .catch(err => {
      //     console.log(err.response.data)
      //     this.next(err.response.data)
      //   })
      // }
    },
    computed: {},
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
}
</script>

<style>
  .ql-editor{
    height: 50vh;
  }
</style>