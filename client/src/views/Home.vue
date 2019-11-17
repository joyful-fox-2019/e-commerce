<template>
  <div>
    <Navbar @search='setquery'></Navbar>
    <div id="content">
      <div id="titleHome">
        <h6> List Products </h6>
      </div>
      <card-holder :query='query'></card-holder>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CardHolder from '@/components/CardHolder.vue'


export default {
  name: 'home',
  components: {
    Navbar,
    CardHolder
  },
  data(){
    return{
      query: ''
    }
  },
  methods : {
    redirectGithub(){
      if(window.location.search){
        const query = window.location.search.substring(1)
        const position = query.search("msg")
        if (position === -1){
          const token = query.split('token=')[1].split('&')[0]
          localStorage.setItem('token',token)
          localStorage.setItem('gitSuccess','success login with github')
          window.location = 'http://localhost:8080'
           this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Logged in'
          })
        } else {
          const msg = query.split('msg=')[1].split('%27')[1].split('%20').join(' ')
          localStorage.setItem('msg',msg)
          window.location = 'http://localhost:8080'
        }
      }
    },
    showErrGithub(){
      if(localStorage.getItem('msg')){
        let msg = localStorage.getItem('msg')
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: `${msg}`
          })
        setTimeout(()=>{
          localStorage.removeItem('msg')
        },2000)
      }
      if(localStorage.getItem('gitSuccess')){
           this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Logged in'
          }) 
        setTimeout(()=>{
        localStorage.removeItem('gitSuccess')
        },2000)
      }
    },
    setquery(search){
      this.query = search
    }
  },
  created(){
    this.redirectGithub()
    if (localStorage.getItem('token')){
      this.$store.dispatch('users/getProfile')
    }
    this.showErrGithub()
    localStorage.removeItem('admin')
    this.$store.commit('SET_STATE',false)
  }
}
</script>

<style scoped>
#content{
  width: 90%;
  margin: 10px auto;
  background-color: rgba(224, 224, 224, 0.377);
  border-radius: 10px;
  padding: 2px
}
#content h6{
  margin: 0;
  font-weight: 700
}
</style>