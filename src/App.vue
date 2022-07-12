<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url(./assets/style/index.scss);
#app {
  width: 100%;
  height: 100%;
}
</style>
