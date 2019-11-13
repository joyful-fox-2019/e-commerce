<template>
<div>  
  <div class="blog-card">
    <div class="meta">
      <div class="photo" style="background-image: url(https://storage.cloud.google.com/defaultimage/ecommerce-trend.jpg?authuser=1)"></div>
      <ul class="details">
        <li class="author"><a href="http://instagram.com/dreamcarr_" target="_">Instagram</a></li>
      </ul>
    </div>
    <div class="description">
      <h1>Hello {{ name }}, let's fill in your store details!</h1>
      <h2><textra :data='words' :timer="3.1" :infinite='true' filter="press"/></h2>
      <div class="insideDescription">
        <div class="leftInside col-3">
          <label class='labell'>Name</label>
        </div>
        <div class="rightInside col-9">
          <input type='text' v-model='nameStore' placeholder="the name of the store cannot be changed anymore">
        </div>
      </div>
      <div class="insideDescription mt-2">
        <div class="leftInside col-3">
          <label class='labell'>Link Store</label>
        </div>
        <div class="rightInside col-9">
          <div class="nameLink col-4">
            <small>..dreamcarofficial.com/</small>
          </div>
          <div class="inputlink col-8">
            <input type='text' v-model='linkStore' placeholder="username or something">
          </div>
        </div>
      </div>
      <div class="insideDescription mt-2">
        <div class="leftInside col-3">
          <label class='labell'>City</label>
        </div>
        <div class="rightInside col-9">
          <input type='text' v-model='cityStore' placeholder="your city">
        </div>
      </div>
      <p class="read-more">
        <a href="#" @click.prevent='createStore'>Create Store</a>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import axios from '@/apis/server.js'

export default {
  data () {
    return {
      words: ["Get more profit", "Get new benefit", "Create your store now", "Easy Money", "Hope you enjoyed"],
      cityStore: null,
      nameStore: null,
      linkStore: null
    }
  },
  computed: {
    name () {
      return this.$store.state.userSignin.username
    }
  },
  methods: {
    createStore () {
      const payload = {
        name: this.nameStore,
        city: this.cityStore,
        link: this.linkStore
      }
      this.$awn.asyncBlock(
        this.$store.dispatch('createStoreAction', payload),
        null,
        null
      )
        .then(msg => {
          setTimeout(() => {
            this.$awn.success(msg);
            this.$router.push('/');
          }, 1000);
        })
        .catch(err => {
          this.$awn.warning(err)
        })
    }
  }
}
</script>

<style lang='scss'>
.rightInside {
  display:flex
}
.insideDescription {
  display: flex;
}
.labell {
  margin-right: 20px
}
.description input {
  border-radius: 10px;
  text-align: center;
  width: 100%
}
.blog-card {
  display: flex;
  flex-direction: column;
  margin: 20rem auto;
  box-shadow: 0 3px 7px -1px rgba(#000, .1);
  margin-bottom: 1.6%;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
  background-color: white !important;
  a {
    color: inherit;
  }
  .meta {
    position: relative;
    z-index: 0;
    height: 200px;
  }
  .photo {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    transition: transform .2s;
  }
  .details,
  .details ul {
    margin: auto;
    padding: 0;
    list-style: none;
  }

  .details {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    margin: auto;
    transition: left .2s;
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    font-size: .9rem;
    a {
      text-decoration: dotted underline
    }
    ul li {
      display: inline-block;
    }
    .author:before {
      font-family: FontAwesome;
      margin-right: 10px;
      content: "\f007";
    }

    .date:before {
      font-family: FontAwesome;
      margin-right: 10px;
      content: "\f133";
    }

    .tags {
      ul:before {
        font-family: FontAwesome;
        content: "\f02b";
        margin-right: 10px;
      }
      li {
        margin-right: 2px;
        &:first-child {
          margin-left: -4px;
        }
      }
    }
  }
  .description {
    padding: 1rem;
    position: relative;
    background-color: white;
    z-index: 1;
    h1,
    h2 {
      font-family: Poppins, sans-serif;
    }
    h1 {
      line-height: 1;
      margin: 0;
      font-size: 1.7rem;
    }
    h2 {
      font-size: 1rem;
      font-weight: 300;
      text-transform: uppercase;
      margin-top: 5px;
    }
    .read-more {
      text-align: right;
      a {
        display: inline-block;
        position: relative;
        &:after {
          content: "\f061";
          font-family: FontAwesome;
          margin-left: -10px;
          opacity: 0;
          vertical-align: middle;
          transition: margin .3s, opacity .3s;
        }

        &:hover:after {
          margin-left: 5px;
          opacity: 1;
        }
      }
    }
  }
  p {
    position: relative;
    margin: 1rem 0 0;
    &:first-of-type {
      margin-top: 1.25rem;
      &:before {
        content: "";
        position: absolute;
        height: 5px;
        width: 35px;
        top: -0.75rem;
        border-radius: 3px;
      }
    }
  }
  &:hover {
    .details {
      left: 0%;
    }
  }


  @media (min-width: 640px) {
    flex-direction: row;
    max-width: 50vw;
    .meta {
      flex-basis: 40%;
      height: auto;
    }
    .description {
      flex-basis: 60%;
      &:before {
        transform: skewX(-3deg);
        content: "";
        background: #fff;
        width: 30px;
        position: absolute;
        left: -10px;
        top: 0;
        bottom: 0;
        z-index: -1;
      }
    }
    &.alt {
      flex-direction: row-reverse;
      .description {
        &:before {
          left: inherit;
          right: -10px;
          transform: skew(3deg)
        }
      }
      .details {
        padding-left: 25px;
      }
    }
  }
}
</style>