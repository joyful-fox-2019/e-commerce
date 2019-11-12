<template>
  <div>
    <h1>Ini adalah halaman Profile</h1>
    <ul v-for="(profile, index) in profiles" :key="index">
      <li @click="changePage(profile.id)">{{ profile.id }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      profiles: [
        {
          id: 1,
          name: 'Danang Putra Bahari',
          email: 'danangbahari89@gmail.com',
          phone: '087862115871'
        },
        {
          id: 2,
          name: 'Dimas Bagus Hafizhan',
          email: 'dimasbagus01@gmail.com',
          phone: '087862115872'
        },
        {
          id: 3,
          name: 'Brahmantya Sukma',
          email: 'sukmabrahmantya@gmail.com',
          phone: '087862115873'
        }
      ]
    }
  },
  methods: {
    changePage (id) {
      this.$router.push(`/${id}`)
    }
  }
}
</script>

<style>
</style>
