<template>
  <div id="itemMall" style="height: auto">
        <div class="sub_content" style="margin-top:0px; margin-left:0px; height: auto;">
            <div class="list_item">
                <router-view />
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'itemmall',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
  .list_item {
    padding-top: 20px;
  }
  .sub_content {
    background-color: rgb(213, 219, 214);
    margin-top: 10px;
    margin-left: 5px;
    height: auto;
    width: 100%;
  }
</style>
