<template>
  <b-row no-gutters @click="gotoDetail(articleId)">
    <b-col>
      <b-card class="mb-2 border-dark bg-secondary">
        <b-row class="text-dark align-items-center">
          <b-col class="text-center" cols="2">
            <b class="text-white">{{ no }}</b>
          </b-col>
          <b-col class cols="6">
            <b class="text-white">{{ title }}</b>
          </b-col>
          <b-col cols="2" class="text-center text-white"> ${{ price }}</b-col>
          <b-col class="text-center text-white" cols="2">
            <p class="m-0">
              {{ status ? 'Success' : 'Pending' }}
            </p>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Gamelistbar',
  props: {
    title: String,
    price: Number,
    status: Boolean,
    articleId: String,
    no: Number
  },
  data () {
    return {}
  },
  methods: {
    gotoDetail (_id) {
      // this.$router.push({ path: `/admin/edit-game/1221`});
    }
  },
  created () {
    console.log(this.tags)
  }
}
</script>

<style>

</style>
