<template>
  <div class="ms-number" :class="disabledMessage ? 'mg-9' : false">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">&#8727;</span>
    </label>
    <div
      class="flex-row"
      :class="[
        leftIcon ? 'has-icon' : '',
        disabledMessage ? 'input__error' : '',
        radius ? 'row-radius' : ''
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
        ref="inputRef"
        type="text"
        :tabindex="tabindex"
        :placeholder="placeholder"
        :disabled="disabled || false"
        :readonly="hasReadonly || false"
        :max="max"
        :min="min"
        v-on="eventListsioner"
        style="text-align: right"
      />
      <div
        :class="['icon--right', disabledRight ? 'disabled-icon' : '']"
        v-if="disabledRight"
      >
        <v-tooltip content="Lên" placement="bottom">
          <div
            :class="[
              'app-icon icon--top',
              topIcon,
              disabledIconTop ? 'disabled-icon' : '',
            ]"
            v-if="topIcon"
          ></div>
        </v-tooltip>

        <v-tooltip content="Xuống" placement="bottom">
          <div
            :class="[
              'app-icon icon--bottom',
              bottomIcon,
              disabledIconBottom ? 'disabled-icon' : '',
            ]"
            v-if="bottomIcon"
          ></div>
        </v-tooltip>
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
  nextTick,
  reactive,
  onMounted,
  onUpdated,
} from "vue";
import { useCurrencyInput } from "vue-currency-input";
import { watchDebounced } from "@vueuse/core";
import VTooltip from "../tooltip/VTooltip.vue";
export default {
  name: "VInputMoney",
  components: {
    VTooltip,
  },
  props: {
    modelValue: {
      default: null,
      type: Number,
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
    valueField: {
      default: null,
      type: String,
    },
    tabindex: {
      default: null,
      type: String,
    },
    options: {
      default: {},
    },
    radius : {
      default: false,
      type: Boolean,
    }
  },
  emits: ["update:modelValue", "blur", "focus", "changeValue", "change"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.iNumbers = proxy;
    const isValue = ref(0);
    const { inputRef, numberValue, setValue } = useCurrencyInput(
      props.options,
      false
    );
    watchDebounced(numberValue, (value) => {
      proxy.isValue = value;
      emit("update:modelValue", isValue),
        {
          debounce: 1000,
        };
    });
    const cancelEvent = (e) => {
      if (e) {
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
      }
    };
    const onBlur = (e) => {
      emit("blur", proxy.isValue, proxy.valueField);
    };
    const onFocus = (e) => {
      emit("focus", proxy.isValue, proxy.valueField);
    };
    const eventListsioner = computed(() => {
      const me = this;
      return {
        blur: (e) => {
          cancelEvent(e);
          proxy.onBlur(e);
        },
        focus: (e) => {
          cancelEvent(e);
          proxy.onFocus(e);
        },
      };
    });
    const less = () => {
      if (proxy.isValue <= 0) {
        proxy.isValue = 1;
        emit("plus", proxy.isValue, proxy.valueField);
      } else {
        proxy.isValue = proxy.isValue - proxy.step;
        emit("changeValue", proxy.isValue, proxy.valueField);
      }
    };

    /**
     * Xử lý cập nhật modelValue cho isValue
     *  @author NNNinh(18/10/2021)
     */
    const changeValue = function (val) {
      // Chờ thay đổi trạng thái thì cập lại giá trị
      nextTick(() => {
        emit("changeValue", proxy.isValue, proxy.valueField);
      });
    };

    /**
     * Xử lý sự kiện click lên
     *  @author NNNinh(16/10/2021)
     */
    const plus = () => {
      if (proxy.isValue > proxy.max) {
        emit("plus", proxy.isValue, proxy.valueField);
      } else {
        proxy.isValue = proxy.isValue + proxy.step;
        emit("changeValue", proxy.isValue, proxy.valueField);
      }
    };
    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );
    return {
      inputRef,
      cancelEvent,
      isValue,
      eventListsioner,
      onBlur,
      onFocus,
      less,
      plus,
      changeValue,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/v_input_number.scss";
.input-text{
  padding-right: 10px !important;
}
</style>
