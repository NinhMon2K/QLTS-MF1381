<template>
  <ms-tooltip :content="dataItem[displayField]" placement="right">
    <li
      class="item-dropdown"
      tabindex="-1"
      @click="emitClick"
      @keyup.enter="emitClick"
      @keyup.space="emitClick"
    >
      <div class="app-icon icon_left-dropdown"></div>
      <div class="text-item">{{ dataItem[displayField] }}</div>
    </li>
  </ms-tooltip>
</template>
<script>
import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
export default {
  name: "MsItem",
  components: {
    MsTooltip,
  },
  props: {
    icon: {
      type: [Array, String],
      default: null,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    displayField: {
      default: null,
      type: String,
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
  padding: 4px 0;
  outline: none;
  display: flex;
  align-items: center;
  &:active,
  &:focus,
  &:focus-within {
    transition: 0.5s;
    background-color: #c7e0f5;
    cursor: pointer;
    .icon_left-dropdown {
      background-image: url("./../../assets/images/icons/icons8-v-24.png");
    }
  }
  &:hover {
    transition: 0.2s;
    background-color: #c7e0f5;
    cursor: pointer;
  }
  .selected {
    .icon_left-dropdown {
      background-image: url("./../../assets/images/icons/icons8-v-24.png") !important;
    }
  }
  .icon_left-dropdown {
    margin: 0 18px 0 10px;
  }
  .text-item {
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.selected {
  transition: 0.2s;
  background-color: #c7e0f5;
  .inline-block {
    .item-dropdown {
      .icon_left-dropdown {
        background-image: url("@/assets/images/icons/icons8-v-24.png") !important;
      }
    }
  }
}
</style>
