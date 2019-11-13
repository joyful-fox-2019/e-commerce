<template>
<v-card>
  <v-snackbar
    v-model="$store.state.alertStatus"
    :bottom="y === 'bottom'"
    :color="color"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    {{ $store.state.errMessages }}
  </v-snackbar>
</v-card>
</template>

<script>
export default {
  name: 'Alert',
  data () {
    return {
      color: 'error',
      mode: '',
      timeout: 2000,
      x: 'right',
      y: 'top'
    }
  }
}
</script>

<style>

</style>
