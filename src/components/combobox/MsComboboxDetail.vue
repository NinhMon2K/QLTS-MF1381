<template>
   <ms-tooltip :content="dataItem.fixed_asset_category_name" placement="right">
  <li
    class="item-combobox"
    tabindex="-1"
    @click="emitClick"
    @keyup.enter="emitClick"
    @keyup.space="emitClick"
  >
    <div class="app-icon">
      <input type="checkbox" v-model="select" @change="changeValue" />
    </div>
   
    <div class="text-item">{{ dataItem.fixed_asset_category_name }}</div>
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
export default {
  components:{MsTooltip},
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
    selected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitClick(e) {
      this.$emit("menu-item-click", this.dataItem, this.selected);
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const select = ref(false);

    const changeValue = function (e) {
      proxy.$emit("change-value", proxy.dataItem, proxy.select);
    };

    return { changeValue, select };
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
    background-color: #c7e0f5;
    cursor: pointer;
    .icon_left-combobox {
      background-image: url("./../../assets/images/icons/icons8-v-24.png");
    }
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
</style>
