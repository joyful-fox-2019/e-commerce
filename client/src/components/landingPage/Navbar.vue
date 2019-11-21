<template>
  <div class="navbar" style="z-index:1;">
    <header>
      <img class="logo" src="../../assets/images/logoHome.png" alt="logoHome" />
      <nav class="navbod">
        <ul class="nav_links">
          <li>
            <p @click="showModal">Add RPS</p>
          </li>
          <li>
            <p>Support</p>
          </li>
          <li>
            <p>Forum</p>
          </li>
        </ul>
      </nav>
      <p @click="logout" class="cta">
        <button id="btn-logout">Log Out</button>
      </p>
    </header>
    <!--modal-->
    <b-modal ref="my-modal" hide-footer title="Hello Seal Lovers">
      <div class="d-block text-center">
        <h3>Add Your RPS</h3>
      </div>
      <b-form @submit.prevent="onSubmit" v-if="show">
        <b-form-group id="input-group-3" label="Category:" label-for="input-3">
          <b-form-select
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="rps"
            :options="listRps"
            id="inline-form-custom-select-pref"
          ></b-form-select>
        </b-form-group>
        <b-button class="mt-3" type="submit" block variant="primary">Submit</b-button>
      </b-form>
      <b-button class="mt-3" variant="danger" block @click="hideModal">Close Me</b-button>
    </b-modal>
    <!--endmodal-->
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000";
export default {
  name: "navbar",
  data() {
    return {
      rps: 0,
      listRps: [
        { text: "Select Rps", value: 0 },
        100,
        300,
        500,
        1000,
        1500,
        2000,
        5000
      ],
      show: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      this.$store.dispatch("clearUserLogin");
      this.$router.push("/");
    },
    showModal() {
      this.$refs["my-modal"].show();
      this.show = true;
      this.$store.dispatch("addRps");
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      this.rps = 0;
    },
    onSubmit() {
      axios({
        url: baseUrl + `/users/addrps/${localStorage.getItem("email")}`,
        method: "PATCH",
        data: {
          rps: Number(this.rps) + Number(this.$store.state.rpsNow)
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.rps = 0;
          this.$store.dispatch("addRps");
          this.hideModal();
          this.$snotify.success(`Success Add Rps, Your Rps Now ${data.rps}`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          console.log(err);
          this.$snotify.danger(`Failed Add New Item`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        });
    }
  },
  computed: {
    fetchRps() {
      return this.$store.state.rpsNow;
    }
  },
  created() {
    this.$store.dispatch("addRps");
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500&display=swap");
.navbar {
  font-family: "Montserrat", sans-serif;
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
  background-image: url("../../assets/images/navtop.png");
  clear: both;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  position: fixed;
}
.navbod {
  padding-top: 10px;
}
li,
p,
button {
  font-weight: 500;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10%;
  top: 0;
  width: 100%;
}
.logo {
  cursor: pointer;
  width: 70px;
  height: 50px;
  background: rgba(0, 0, 0, 0);
  margin-bottom: 10px;
}
.nav_links {
  list-style: none;
}
.nav_links li {
  display: inline-block;
  padding: 0px 20px;
  top: 10px;
}
.nav_links li p {
  transition: all 0.3s ease 0s;
}
.nav_links li p:hover {
  color: #0088a9;
  text-decoration: none;
  cursor: pointer;
}
#btn-logout {
  margin: 2px 0px;
  padding: 9px 25px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}
button:hover {
  color: red;
}
</style>
