<template>
  <transition name="modal">
    <div class="mask" @click="close">
      <div class="container" @click.stop>
        <div class="header">
          <h4>{{title}}</h4>
          <button @click="close">
            <Close/>
          </button>
        </div>
        <div class="body">
          <slot/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Close from "./icons/Close.vue";

export default Vue.extend({
  components: { Close },
  props: ["title"],
  mounted() {
    document.body.style.overflow = "hidden";
    addEventListener("keyup", this.close, { passive: true });
  },
  destroyed() {
    document.body.style.overflow = "";
    removeEventListener("keyup", this.close);
  },
  methods: {
    close(event: KeyboardEvent | MouseEvent) {
      if ((event instanceof KeyboardEvent && event.keyCode === 27) || event instanceof MouseEvent) {
        this.$emit("close");
      }
    }
  }
});
</script>

<style scoped>
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 600px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: transform 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 0.625em 1em;
  background: #4169e1;
  color: #fff;
}

.header h4 {
  margin: 0;
  line-height: 24px;
}

.header button {
  font: inherit;
  appearance: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  color: currentColor;
}

.header button svg {
  width: 24px;
  height: 24px;
  margin: 0;
}

.body {
  padding: 1em;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .container,
.modal-leave-active .container {
  transform: scale(1.1);
}
</style>

