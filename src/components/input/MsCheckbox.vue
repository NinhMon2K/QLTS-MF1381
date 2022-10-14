<template>
  <label for="" class="input-checkbox">
    <input
      type="checkbox"
      class="checkbox-control"
      v-model="isValue"
      @change="changeValue"
      :readonly="readonly"
      :disabled="disabled"
    />
  </label>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  computed,
  resolveComponent as _resolveComponent,
  mergeProps as _mergeProps,
} from "vue";
export default {
  name: "MsCheckbox",
  props: {
    modelValue: {
      default: false,
      type: [Boolean, Number],
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    checked: {
      type: [Boolean, Number],
      default: false,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    window.a = proxy;
    const isValue = ref(false);
    const changeValue = function (e) {
      proxy.$emit("update:modelValue", proxy.isValue);
    };
    return {
      isValue,
      changeValue,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/MsCheckBox.scss";
</style>
