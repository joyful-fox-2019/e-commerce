<template>
    <Form :fields=fields :formName=formName />
</template>

<script>
import Form from '@/components/Form.vue'
export default {
  name: 'login',
  data () {
    return {
      fields: [],
      formName: 'Login'
    }
  },
  components: {
    Form
  },
  methods: {
    renderFields () {
      let result = [
        {
          name: 'Email',
          type: 'email'
        },
        {
          name: 'Password',
          type: 'password'
        }
      ]
      this.fields = result
    }
  },
  created () {
    this.renderFields()
  }
}
</script>

<style>

</style>
