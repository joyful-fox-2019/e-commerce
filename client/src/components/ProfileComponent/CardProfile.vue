<template>
<div>
      <div>
        <h5 style='text-align: center;'>{{ user.username }}</h5>
        <div class="isOnline">
          <small>Online</small>
        </div>
      </div>
      <div class="card-body profileBody">
        <div class="profilePic">
          <a :href='user.profile_image' target="_"><img class="avatar" :src="user.profile_image" alt="Username"></a>
        </div>
        <div class="profileInfo">
          <div class='fol'>
            <div >
              <b-form-file
              class='formFile'
                ref="file"
                type="file"
                name='file'
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer actions">
        <form enctype="multipart/form-data" @submit.prevent='updateImage'>
          <input type="submit" value="Save Change">
        </form>
      </div>
  </div>
</template>

<script>
import axios from '@/apis/server.js'

export default {
  data () {
    return {
      file: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.userSignin
    }
  },
  watch: {
    user: {
      handler (val) {
        if(val) {
          this.user = val
        }
      }
    }
  },
  methods: {
    updateImage () {
      this.$awn.asyncBlock(
        this.updateImageAction(),
        null,
        null
      )
        .then(msg => {
          this.$awn.success(msg)
        })
        .catch(err => {
          this.$awn.warning(err)
        })
    },
    updateImageAction () {
      let formData = new FormData();
      formData.append('image', this.file);
      return new Promise ((resolve, reject) => {
        axios({
          method: 'patch',
          url: '/users/upload',
          data: formData,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.user = data.user.profile_image;
            this.$store.commit('CHANGE_PICTURE', data.user.profile_image)
            this.$router.push('/profile')
            resolve(data.msg)
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    }
  }
}
</script>

<style>
.profileName {
  background:transparent;
  border:0;
  border-radius: 20px;
  text-align:center;
  font-size:16px;
  font-weight:800;
  color:#eee;
}

.lock {
  width: 25px;
}
.isVerified {
  fill: #eee;
  margin:5px;
}

.card-body {
  color:#eee;
  height: 60%;
  margin-top:1.5em;
}
.avatar {
  border-radius:50%;
  max-width:128px;
  transform: scale(0.95);
  transition:all .5s;
  cursor:pointer;
}
.avatar:hover {
  transform: scale(1);
  box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.2);
}
.profilePic {
  text-align:center;
  margin-top: -35px;
  height: 180px
}
.isOnline {
  text-align:center;
  color:#eee;
}
.profileInfo {
  margin-top:1em;
  font-weight:200;
  font-size:20px;
  color:#eee;
  text-align:center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
.actions {
  background:transparent;
  border:0;
  color:#fff;
  display: flex;
  justify-content: center;
}
.actionFirst, .actionSecond {
  width:50%;
  text-align:center;
  fill:#ddd;
  transform: scale(0.8);
  transition:all .3s;
  cursor:pointer;
}
.actionFirst:hover, .actionSecond:hover {
  transform: scale(1);
  fill:#fff;
}
</style>