<template>
  <div class="text-center">
    <v-dialog
      v-model="$store.state.loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="#E6252A"
        dark
      >
        <v-card-text>
          Wait for a moment...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-overlay :value="$store.state.loading">
    </v-overlay>
  </div>
</template>

<style>

</style>
