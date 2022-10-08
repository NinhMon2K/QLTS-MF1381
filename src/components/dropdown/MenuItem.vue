<template>
  <li
    class="item-dropdown"
    tabindex="-1"
    @click="emitClick"
    @keyup.enter="emitClick"
    @keyup.space="emitClick"
    @mouseover="isShowIcon = true"
    @mouseleave="isShowIcon = false"
  >
    <div class="app-icon icon_left-dropdown"></div>

    <div class="text-item">{{ dataItem.display }}</div>
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
.item-dropdown {
  width: 100%;

  overflow: hidden;
  &:active,
  &:focus,
  &:focus-within {
    transition: 0.5s;
    background-color: #c7e0f5;
    .icon_left-dropdown {
      background-image: url("./../../assets/images/icons/icons8-v-24.png");
    }
  }
  &:hover {
    transition: 0.2s;
    background-color: #c7e0f5;
  }
  .icon_left-dropdown {
    margin: 0 18px 0 10px;
  }
  .text-item {
    font-size: 14px;
  }
}
</style>
