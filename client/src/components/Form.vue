<template>
<div class="container">
    <h3 class="py-3">{{ formName }}</h3>
    <b-form @submit="onSubmit">
      <b-form-group v-for="(field, i) in fields" :key="i"
        :label="field.name"
        :label-for="field.name"
      >
        <b-form-input
          v-model="field.name"
          :type="field.type"
          required
          :placeholder="field.name"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</div>
</template>

<script>
export default {
  props: ['fields', 'formName'],
  data () {
    return {
      Email: '',
      Name: '',
      Password: ''
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style>

</style>
