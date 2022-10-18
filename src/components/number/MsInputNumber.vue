<template>
  <div class="ms-number">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>
    <div class="flex-row" :class="[leftIcon ? 'has-icon' : '']">
      <div class="icon-filter">
        <span :class="[
          'app-icon icon--left',
          leftIcon,
          disabled ? 'disabled-icon' : '',
        ]" v-if="leftIcon"></span>
      </div>

      <input :id="id ? id : ''" class="input-text" type="number" v-model="isValue" :placeholder="placeholder"
        :disabled="disabled || false" :readonly="hasReadonly || false" />
      <div :class="['icon--right', disabledRight ? 'disabled-icon' : '']">
        <div :class="[
          'app-icon icon--top',
          topIcon,
          disabledIconTop ? 'disabled-icon' : '',
        ]" v-if="topIcon"></div>
        <div :class="[
          'app-icon icon--bottom',
          bottomIcon,
          disabledIconBottom ? 'disabled-icon' : '',
        ]" v-if="bottomIcon"></div>
      </div>
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
  watch,
  getCurrentInstance,
  reactive,
  onMounted,
} from "vue";
import Resource from "@/resource/dictionary/resource.js"
export default defineComponent({
  name: "MsInput",
  props: {
    modelValue: {
      default: 0,
      type: [Number, String]
    },
    configStyle: {
      default: {},
    },
    typeValue: {
      default: null,
      type: String
    },
    placeholder: {
      default: null,
      type: [Number, String],
    },
    leftIcon: {
      default: null,
      type: String,
    },
    topIcon: {
      default: null,
      type: String,
    },
    bottomIcon: {
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
    disabledRight: {
      default: false,
      type: Boolean,
    },
    disabledIconTop: {
      default: false,
      type: Boolean,
    },
    disabledIconBottom: {
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

    min: {
      default: -99999999999999,
      type: [Number, String]
    },
    max: {
      default: 99999999999999,
      type: [Number, String]
    },
    step: {
      default: 1,
      type: [Number, String]
    }
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const isValue = ref(0);
    watch(
      () => proxy.modelValue,
      (newVal) => {
        proxy.isValue = newVal;
      }
    );
    onMounted(() => {
      proxy.changeValue();
    })
    function formatMoney(money) {
      money = new Intl.NumberFormat(Resource.LanguageCode.VN, {}).format(money)
      return money
    }
    const display = ()=> {
      if (proxy.typeValue == 'number') {
        if (proxy.isValue < 10) {
          return `0${proxy.isValue}`;
        }
        else {
          return proxy.isValue;
        }

      }
      else if (proxy.typeValue == 'money') {
        return formatMoney(proxy.isValue)
      }
      else {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(proxy.isValue)
      }
    }
    const changeValue = function (e) {
      proxy.$emit("update:modelValue", proxy.isValue);
    };
    return { isValue, changeValue, formatMoney, display };
  },
});
</script>
<style lang="scss" scope="">
@import "./../../assets/scss/components/MsInputNumber.scss";
</style>
