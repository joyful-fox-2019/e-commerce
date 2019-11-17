<template>
  <div
    class="modal fade"
    id="loginmodal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document" style="width: 50%;">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel"
            style="width:100%; padding-left:40%; font-weight: bolder;  font-size: 18px;"
          >Sign in</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <form>
                  <div class="form-group">
                    <label for="loginEmail" style="font-size: 14px;">Email address</label>
                    <input
                      v-model="loginEmail"
                      type="email"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      style="font-size: 14px;"
                    />
                  </div>
                  <div class="form-group">
                    <label for="loginPassword" style="font-size: 14px;">Password</label>
                    <input
                      v-model="loginPassword"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      style="font-size: 14px;"
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      @click.prevent="login"
                      type="submit"
                      class="mt-2 btn btn-light"
                      style="font-size: 14px;"
                    >Submit</button>
                  </div>
                </form>
              </div>
              <slot></slot>
              <div></div>
            </div>
          </div>
        </div>

        <p
          class="btn"
          style="font-size: 12.5px;
          color: black;
          font-family: Montserrat, sans-serif;"
        >
          new to us ?
          <a
            id="closee"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#modalregister"
            class="btncard"
            style="font-size: 12.5px;
            color: blue;
            font-family: Montserrat, sans-serif;"
          >Sign up</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import ModalRegister from "@/components/ModalRegister";

export default {
  components: { ModalRegister },
  data() {
    return {
      loginEmail: "",
      loginPassword: ""
    };
  },
  created() {},
  methods: {
    login() {
      let payload = {
        email: this.loginEmail,
        password: this.loginPassword
      };
      console.log(`trigger`, payload);
      this.$store
        .dispatch("login", payload)
        .then(_ => {
          Swal.fire("welcome");
          $("#closee").submit(function(e) {
            e.preventDefault();
            $("#modalregister").modal("hide");
            $("#loginmodal").modal("hide");
            return false;
          });
          this.loginEmail = "";
          this.loginPassword = "";
        })
        .catch(({ response }) => {
          console.log(response, "masuk err comp");

          Swal.fire("Error", `Cannot Login ${response.data.message}`, "error");
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans|Montserrat|Source+Sans+Pro&display=swap");
.btncard {
  background-color: transparent;
  font-size: 12px;
  /* color: black; */
  color: blue;
  border-style: 1px solid rgb(233, 233, 233) !important;
  font-family: "Montserrat", sans-serif;
}

.btncard:hover {
  background-color: rgb(230, 230, 230);
  cursor: pointer;
}
</style>
