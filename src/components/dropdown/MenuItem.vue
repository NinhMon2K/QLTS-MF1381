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
      <label class="text-item">{{ dataItem[displayField] }}</label>
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
  height: 36px !important;
  min-height: 36px;
  overflow: hidden;
  padding: 4px 0;
  outline: none;
  display: flex;
  align-items: center;
  &:active,
  &:focus,
  &:focus-within {
    transition: 0.5s;

    cursor: pointer;
    .icon_left-dropdown {
      background-color: #c7e0f5;

      width: 36px;
      height: 36px;
      min-width: 36px;
      background-image: url("./../../assets/images/icons/icons8-v-24.png");
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  &:hover {
    transition: 0.2s;
    background-color: #c7e0f5;
    cursor: pointer;
    border-radius: 4px;
    .icon_left-dropdown {
      background-image: url("./../../assets/images/icons/icons8-v-24.png") !important;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .selected {
    .icon_left-dropdown {
      background-image: url("./../../assets/images/icons/icons8-v-24.png") !important;
    }
  }
  .icon_left-dropdown {
    width: 36px;
    height: 36px;
    min-width: 36px;
    background-image: none;
  }
  .text-item {
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 16px;
  }
}
.selected {
  transition: 0.2s;

  .inline-block {
    .item-dropdown {
      .icon_left-dropdown {
        background-color: #c7e0f5;
        width: 36px;
        height: 36px;
        min-width: 36px;
        background-image: url("@/assets/images/icons/icons8-v-24.png") !important;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 4px;
      }
    }
  }
}
</style>
