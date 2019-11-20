<template>
  <div class="body">
    <audio controls autoplay loop style="display:none;">
      <source src="../assets/music/login.mp3" type="audio/mpeg" />
    </audio>
    <app-formlogin v-if="formNowIn" @statusLogin="statusLogin" />
    <router-view></router-view>
  </div>
</template>

<script>
import FormLogin from "@/components/formLogin/FormLogin.vue";
import { mapGetters } from "vuex";

export default {
  name: "login",
  computed: {
    ...mapGetters(["formNowIn"])
  },
  created() {},
  components: {
    "app-formlogin": FormLogin
  },
  data() {
    return {};
  },
  methods: {
    statusLogin(value) {
      this.$snotify.warning("Username/Password Wrong!", {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: "leftBottom"
      });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lora:400i&display=swap");
.body {
  font-family: "Lora", serif;
  padding: 0%;
  margin: 0%;
  width: 100%;
  height: 100vh;
  background-image: url("../assets/images/backgroundLogin.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
</style>
