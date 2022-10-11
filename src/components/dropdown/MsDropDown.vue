<template>
  <div class="filter-dropdown">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>
    <button
      class="dropdown-menu-toggle"
      ref="input"
      @click="isShowMenu = !isShowMenu"
    >
      <div
        :class="[
          'app-icon icon--left',
          leftIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="leftIcon"
      ></div>
      <input
        type="text"
        :value="display"
        :placeholder="placeholder"
        readonly="false"
      />
      <div
        :class="[
          'app-icon icon--right',
          rightIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="rightIcon"
      ></div>
    </button>
    <teleport to="body">
      <div class="dropdown-menu" :style="style" v-if="isShowMenu">
        <div class="dropdown-content">
          <ul class="list-item--dropdown">
            <dropdown-item
              v-for="item in datax"
              :key="item"
              :dataItem="item"
              :class="[selected == item ? 'selected' : '']"
              @menu-item-click="itemClick"
            >
            </dropdown-item>
          </ul>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import DropdownItem from "./MenuItem.vue";
export default {
  name: "MsDropdown",
  components: {
    DropdownItem,
  },
  props: {
    texts: {
      default: null,
      type: String,
    },
    leftIcon: {
      default: null,
      type: String,
    },
    datax: {
      default: [],
    },
    rightIcon: {
      default: null,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: null,
      type: [Number, String],
    },
    valueField: {
      default: null,
      type: String,
    },
    displayField: {
      default: null,
      type: String,
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
    heightCb: {
      default: 0,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const selected = ref(null);

    window.ab = proxy;

    const display = computed(() => {
      if (selected.value) {
        return selected.value[props.displayField];
      } else {
        return null;
      }
    });

    const offsetPosi = reactive({
      top: 0,
      left: 0,
    });
    const offsetDropdown = reactive({
      width: 0,
      height: 0,
    });

    const isShowMenu = ref(false);

    const style = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosi.top}px`);
      arr.push(`left: ${offsetPosi.left}px`);
      arr.push(`width: ${offsetDropdown.width}px`);
      arr.push(`height: ${offsetDropdown.height}px`);
      return arr.join("; ");
    });

    watch(
      () => isShowMenu.value,
      (newVal) => {
        if (newVal) {
          proxy.setPosition();
        }
      }
    );

    const itemClick = (item) => {
      selected.value = item;
      emit("item-click", item);
    };

    onMounted(() => {
      proxy.setPosition();
      proxy.setDropdown();
    });
    function setPosition() {
      let offset = proxy.$refs.input.getBoundingClientRect();
      offsetPosi.top = offset.bottom;
      offsetPosi.left = offset.left;
    }
    function setDropdown() {
      let offset = proxy.$refs.input.getBoundingClientRect();
      offsetDropdown.width = offset.width;
      offsetDropdown.height = 200.5 - this.heightCb;
    }

    return {
      itemClick,
      setPosition,
      setDropdown,
      style,
      isShowMenu,
      display,
      selected,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/MsDropdown.scss";
</style>
