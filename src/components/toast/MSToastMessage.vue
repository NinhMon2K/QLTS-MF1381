<template>
  <div class="toast-wrapper">
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
export default {
  name: "MsMessage",
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
  setup() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/MsToastMessage.scss";
</style>
