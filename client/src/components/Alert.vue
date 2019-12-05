<template>
<v-card>
  <v-snackbar
    v-model="$store.state.alert.status"
    :color="$store.state.alert.color"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    <div>
    {{ $store.state.alert.message }}
    </div>
  </v-snackbar>
</v-card>
</template>

<script>
export default {
  name: 'Alert',
  data () {
    return {
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
