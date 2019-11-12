<template>
  <div>
    <div class="createStore">
      <div class="comStore">
        <CreateStore />
      </div>
    </div>
  </div>
</template>

<script>
import CreateStore from '@/components/CreateStore.vue';

export default {
  components: {
    CreateStore
  }
}
</script>

<style>
.createStore {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>