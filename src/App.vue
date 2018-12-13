<template>
  <Root/>
</template>

<script lang="ts">
import Vue from "vue";
import Root from "./components/Root.vue";

export default Vue.extend({ components: { Root } });
</script>

<style>
*,
*:before,
*:after {
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
}
</style>
