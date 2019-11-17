<template>
  <b-row no-gutters @click="gotoDetail(articleId)">
    <b-col>
      <b-card class="mb-2 border-secondary">
        <b-row class="text-dark align-items-center">
          <b-col class="text-center" cols="1">
            <b>{{ no }}</b>
          </b-col>
          <b-col class cols="5">
            <b>{{ title }}</b>
          </b-col>
          <b-col cols="3">{{ date }}</b-col>
          <b-col class="text-center" cols="3">
            <p class="m-0">
              <span v-for="(tag, index) in tags" :key="index"> {{tag}}</span>
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
  props:{
    title: String,
    date: String,
    tags: Array,
    articleId: String,
    no: Number
  },
  data() {
    return {}
  },
  methods: {
    gotoDetail(_id) {
      this.$router.push({ path: `/admin/edit-article/${_id}`});
    }
  },
  created(){
    console.log(this.tags)
  }
}
</script>

<style>

</style>