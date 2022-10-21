<template>
  <div class="input-field" :class="disabledMessage ? 'mg-8' : false">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>
    <div
      class="flex-row"
      :class="[
        leftIcon ? 'has-icon' : '',
        disabledMessage ? 'input__error' : '',
      ]"
    >
      <div class="icon-filter">
        <span
          :class="[
            'app-icon icon--left',
            leftIcon,
            disabled ? 'disabled-icon' : '',
          ]"
          v-if="leftIcon"
        ></span>
      </div>

      <input
        :id="id ? id : ''"
        class="input-text"
        type="text"
        v-model="isValue"
        :placeholder="placeholder"
        :disabled="disabled || false"
        :readonly="hasReadonly || false"
        @change="changeValue"
        @blur="changeValue"
      />
      <div
        :class="[
          'app-icon icon--right',
          rightIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="rightIcon"
      ></div>
    </div>
    <span v-if="disabledMessage" class="error-message">{{
      message ? message : ""
    }}</span>
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
  nextTick,
  watch,
} from "vue";

export default defineComponent({
  name: "msInput",
  props: {
    modelValue: {
      default: null,
    },
    configStyle: {
      default: {},
    },
    placeholder: {
      default: null,
      type: [Number, String],
    },
    leftIcon: {
      default: null,
      type: String,
    },
    rightIcon: {
      default: null,
      type: String,
    },
    inputBoder: {
      default: true,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    disabledMessage: {
      default: false,
      type: Boolean,
    },
    customWarring: {
      default: null,
      type: Object,
    },
    label: {
      default: null,
      type: String,
    },
    hasInput: {
      default: false,
      type: Boolean,
    },
    hasLabel: {
      default: false,
      type: Boolean,
    },
    hasReadonly: {
      default: false,
      type: Boolean,
    },
    id: {
      default: null,
      type: String,
    },
    message: {
      default: null,
      type: String,
    },
    valueField: {
      default: null,
      type: String,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const isValue = ref("");

    watch(
      () => proxy.modelValue,
      (newVal) => {
        proxy.isValue = newVal;
      }
    );
    const changeValue = function (e) {
      proxy.$emit("update:modelValue", proxy.isValue);
      nextTick(() => {
        emit("changeValue", proxy.isValue, proxy.valueField);
      });
    };
    return { isValue, changeValue };
  },
});
</script>
<style lang="scss" scope="">
@import "./../../assets/scss/components/MsInput.scss";
</style>
