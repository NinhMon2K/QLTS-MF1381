<template>
  <div class="ms-number">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>
    <div class="flex-row" :class="[leftIcon ? 'has-icon' : '']">
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
        type="number"
        v-model="display"
        :placeholder="placeholder"
        :disabled="disabled || false"
        :readonly="hasReadonly || false"
        max="9999999999999"
      />
      <div :class="['icon--right', disabledRight ? 'disabled-icon' : '']">
        <ms-tooltip content="Lên" placement="bottom">
          <div
            :class="[
              'app-icon icon--top',
              topIcon,
              disabledIconTop ? 'disabled-icon' : '',
            ]"
            v-if="topIcon"
            @click="plus"
          ></div>
        </ms-tooltip>

        <ms-tooltip content="Xuống" placement="bottom">
          <div
            :class="[
              'app-icon icon--bottom',
              bottomIcon,
              disabledIconBottom ? 'disabled-icon' : '',
            ]"
            v-if="bottomIcon"
            @click="less"
          ></div>
        </ms-tooltip>
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
import Resource from "@/resource/dictionary/resource.js";
import CommonFunction from "@/commons/commonFunction.js";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
export default defineComponent({
  name: "MsInput",
  components: {
    MsTooltip,
  },
  props: {
    modelValue: {
      default: 0,
      type: [Number, String],
    },
    configStyle: {
      default: {},
    },
    typeValue: {
      default: "number",
      type: String,
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
      type: [Number, String],
    },
    max: {
      default: 99999999999999,
      type: [Number, String],
    },
    step: {
      default: 1,
      type: [Number, String],
    },
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
    });
    function formatMoney(money) {
      money = new Intl.NumberFormat(Resource.LanguageCode.VN, {}).format(money);
      return money;
    }
    const display = computed(() => {
      if (proxy.typeValue == "money") {
        return CommonFunction.formatNumber(proxy.isValue);
      } else {
        if (proxy.isValue < 10 && proxy.isValue > 0) {
          return `0${proxy.isValue}`;
        } else {
          return proxy.isValue;
        }
      }
    });

    const plus = () => {
      if (proxy.isValue > proxy.max) {
        proxy.disabledMessage = true;
        proxy.message = "Bạn đã nhập số quá mức quy định!";
      } else {
        console.log("Lên");
        proxy.isValue = proxy.isValue + proxy.step;
        return proxy.isValue;
      }
    };
    const less = () => {
      if (proxy.isValue < 0) {
        proxy.disabledMessage = true;
        console.log(proxy.disabledMessage);
        proxy.message = "Bạn phải nhập số không được âm!";
      } else {
        console.log("X");
        proxy.isValue = proxy.isValue - proxy.step;
        return proxy.isValue;
      }
    };

    const changeValue = function (e) {
      proxy.$emit("update:modelValue", proxy.isValue);
    };
    return { isValue, changeValue, formatMoney, display, plus, less };
  },
});
</script>
<style lang="scss" scope="">
@import "./../../assets/scss/components/MsInputNumber.scss";
</style>
