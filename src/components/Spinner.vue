<template>
  <div/>
</template>

<style scoped>
div {
  width: 2.4em;
  height: 2.4em;
  border-radius: 50%;
  border: 4px solid #4169e1;
  border-right-color: transparent;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

