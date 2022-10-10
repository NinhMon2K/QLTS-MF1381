<template>
  <li
    class="item-combobox"
    tabindex="-1"
    @click="emitClick"
    @keyup.enter="emitClick"
    @keyup.space="emitClick"
  >
    <div class="app-icon">
      <input type="checkbox" />
    </div>
    <div class="text-item">{{ dataItem.fixed_asset_category_name }}</div>
  </li>
</template>
<script>
import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
export default {
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
  },
  methods: {
    emitClick(e) {
      this.$emit("menu-item-click", this.dataItem);
    },
  },
  setup(props, { emit }) {
    // const { proxy } = getCurrentInstance();

    return {};
  },
};
</script>
<style lang="scss" scoped>
.item-combobox {
  width: 100%;
  overflow: hidden;
  padding: 4px 0;
  outline: none;
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
  }
}
</style>
