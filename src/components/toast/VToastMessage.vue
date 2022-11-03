<template>
  <div class="toast-wrapper" v-if="displayToast">
    <div class="toast-content">
      <div
        class="icon-message"
        :class="[
          'app-icon icon--left',
          iconMessage,
          disabled ? 'disabled-icon' : '',
        ]"
      ></div>
      <div class="toast__text">{{ textMessage }}</div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  computed,
  ref,
  getCurrentInstance,
  reactive,
  onMounted,
  watch,
} from "vue";
export default {
  name: "VMessage",
  props: {
    textMessage: {
      default: null,
      type: [String, Number],
    },
    iconMessage: {
      default: null,
      type: String,
    },
    disabled: {
      default: null,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const displayToast = ref(false);
    onMounted(() => {
      proxy.displayToast = true;
      setTimeout(() => {
        proxy.displayToast = false;
      }, 3000);
    });
    return {
      displayToast,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/v_toast_message.scss";
</style>
