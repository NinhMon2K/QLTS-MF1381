<template>
  <div class="message-toast">
    <div class="toast-container">
      <div class="toast-top">
        <div class="toast-title"></div>
      </div>
      <div class="toast-content">
        <div class="toast-content__left">
          <div
            :class="[
              'app-icon icon--left',
              leftIcon,
              disabled ? 'disabled-icon' : '',
            ]"
            v-if="leftIcon"
          ></div>
        </div>
        <div class="toast-content__right">
          <div class="text-message">
            <span v-if="disabledValueLeft">{{ valueMessageBox }}</span>
            {{ textMessageBox }}
            <span v-if="disabledValueRight">{{ valueMessageBox }}</span>
            <span v-if="disabledValueRight" class="span__right">?</span>
          </div>
        </div>
      </div>
      <div class="toast-bottom">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
// import MsButton from "@/components/tooltip/MsTooltip.vue";
export default {
  name: "MsMessageBox",
  components: {
    // MsTooltip,
  },
  props: {
    valueMessageBox: {
      default: null,
      type: [Number, String],
    },
    leftIcon: {
      default: null,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    textMessageBox: {
      default: null,
      type: String,
    },
    disabledValueLeft: {
      default: false,
      type: Boolean,
    },
    disabledValueRight: {
      default: false,
      type: Boolean,
    },
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/MsMessageBox.scss";
</style>
