<template>
  <ms-tooltip :content="dataItem[displayField]" placement="right">
    <li
      class="item-combobox"
      tabindex="-1"
      :class="select ? 'active' : ''"
      @click="emitClick"
      @keyup.enter="emitClick"
      @keyup.space="emitClick"
    >
      <div class="app-icon">
        <ms-checkbox class="ic-checked" v-model="select"></ms-checkbox>
      </div>

      <div class="text-item">{{ dataItem[displayField] }}</div>
    </li>
  </ms-tooltip>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
import MsCheckbox from "@/components/input/MsCheckbox.vue";
export default {
  components: { MsTooltip, MsCheckbox },
  props: {
    icon: {
      type: [Array, String],
      default: null,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    dataItem: {
      default: {},
    },
    valueField: {
      default: null,
      type: String,
    },
    displayField: {
      default: null,
      type: String,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitClick(e) {
      this.$emit("menu-item-click", this.dataItem, this.select);
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const select = ref(false);

    !window.ac && (window.ac = proxy);

    onMounted(() => {
      proxy.select = proxy.selected;
    });

    watch(
      () => select.value,
      () => {
        nextTick(() => {
          proxy.$emit("change-value", proxy.dataItem, proxy.select);
        });
      }
    );

    return { select };
  },
};
</script>
<style lang="scss" scoped>
.item-combobox {
  width: 100%;
  overflow: hidden;
  padding: 4px 0;
  outline: none;
  display: flex;
  align-items: center;
  .app-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
  }
  &:active,
  &:focus,
  &:focus-within {
    transition: 0.5s;
    /* background-color: #c7e0f5; */
    cursor: pointer;
  }
  &:hover {
    transition: 0.2s;
    background-color: #c7e0f5;
    cursor: pointer;
  }
  .icon_left-combobox {
    margin: 0 18px 0 10px;
  }
  .text-item {
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 18px;
  }
}
/* input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  background-color: #d5d5d5;
  border-radius: 4px;
  cursor: pointer;
  &::after {
  }
} */
.active {
  background-color: #c7e0f5;
}
</style>
