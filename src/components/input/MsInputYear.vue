<template>
  <div class="work-year-content text-truncate">
    <div class="year-left">
      <span>{{ label }}</span>
    </div>
    <div class="year-content">
      <input
        type="text"
        :placeholder="placeholder"
        :disabled="disabled || false"
        :value="years"
        readonly="false"
      />
    </div>

    <div class="year-right">
      <ms-tooltip content="Lên" placement="bottom">
        <div
          class="iconyear-top"
          :class="[
            'app-icon icon--top',
            topIcon,
            disabled ? 'disabled-icon' : '',
          ]"
          v-if="topIcon"
          @click="years++"
        ></div>
      </ms-tooltip>
      <ms-tooltip content="Xuống" placement="bottom">
        <div
          class="iconyear-bottom"
          :class="[
            'app-icon icon--bottom',
            bottomIcon,
            disabled ? 'disabled-icon' : '',
          ]"
          v-if="bottomIcon"
          @click="years--"
        ></div>
      </ms-tooltip>
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
} from "vue";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
export default {
  name: "MsInputYear",
  components: {
    MsTooltip,
  },
  props: {
    label: {
      default: null,
      type: String,
    },
    placeholder: {
      default: null,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    topIcon: {
      default: null,
      type: String,
    },
    bottomIcon: {
      default: null,
      type: String,
    },
  },
  methods: {
    handleYear() {
      return new Date().getFullYear();
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const years = ref(2022);
    return {
      years,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/MsInputYear.scss";
</style>
