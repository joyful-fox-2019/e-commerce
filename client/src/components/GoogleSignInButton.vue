<template>
    <button
      id="google-sign-in-button"
      class="button is-fullwidth"
      v-google-signin-button="clientId"
    >
      <img
        id="google-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png"
        alt="google-icon"
      />
      Continue with Google
    </button>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import axios from "../../config/axios";

export default {
  name: "google-sign-in-button",
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId:
      "1089954317756-4ljc3adqvhgg635s1dv0at3camnp1io2.apps.googleusercontent.com"
  }),
  methods: {
    toast(message) {
      this.$buefy.toast.open(message);
    },
    success(message) {
      this.$buefy.toast.open({
        message: message,
        type: "is-success"
      });
    },
    danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: "is-bottom",
        type: "is-danger"
      });
    },
    OnGoogleAuthSuccess(idToken) {
      // console.log("ini env host server", process.env.HOST_SERVER);
      axios({
        method: "post",
        url: "/users/googleSignIn",
        headers: {
          googleidtoken: idToken
        }
      })
        .then(({ data }) => {
          document.write("ini data di google auth", data);
          localStorage.setItem("access_token", data.access_token);
          this.$emit("check-token");
          this.toast(data.message);
        })
        .catch(err => {
          document.write(err);
          this.danger(err.response.data.messages[0])
        });
    },
    OnGoogleAuthFail(error) {
      this.danger(error.error)
    }
  }
};
</script>

<style scoped>
.btn {
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
}
#google-icon {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}
</style>