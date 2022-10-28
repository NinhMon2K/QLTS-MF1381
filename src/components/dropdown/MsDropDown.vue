<template>
  <div class="filter-dropdown" :class="disabledMess ? 'mg-9' : false">
    <label class="text-label" v-if="hasLabel">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>
    <button
      class="dropdown-menu-toggle"
      ref="dropdown"
      :class="disabledMessage ? 'error__message' : ''"
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
        v-model="disp"
        :tabindex="tabindex"
        ref="input"
        :placeholder="placeholder"
        :readonly="readonly"
        v-on="eventListsioner"
        @keyup="search"
        @click="isShowMenu = true"
      />
      <div
        :class="[
          'app-icon icon--right',
          rightIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="rightIcon"
        @click="isShowMenu = !isShowMenu"
        v-click-outside="hideDropdown"
      ></div>
    </button>

    <teleport to="body">
      <div class="dropdown-menu" :style="style" v-if="isShowMenu">
        <div class="dropdown-content">
          <ul class="list-item--dropdown">
            <dropdown-item
              v-for="item in data"
              :key="item"
              :dataItem="item"
              :displayField="displayField"
              :class="[
                modelValue && modelValue == item[valueField] ? 'selected' : '',
              ]"
              @menu-item-click="itemClick"
            >
            </dropdown-item>
          </ul>
        </div>
      </div>
    </teleport>
    <span v-if="disabledMessage" class="error-message">{{
      message ? message : ""
    }}</span>
  </div>
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
import DropdownItem from "./MenuItem.vue";
export default {
  name: "MsDropdown",
  components: {
    DropdownItem,
  },
  props: {
    modelValue: {
      default: null,
    },
    texts: {
      default: null,
      type: String,
    },
    leftIcon: {
      default: null,
      type: String,
    },
    dataAll: {
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
    readonly: {
      default: false,
      type: Boolean,
    },
    tabindex: {
      default: null,
      type: String,
    },
    message: {
      default: null,
      type: String,
    },
    disabledMessage: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const data = ref(props.dataAll);
    const disp = ref("");

    window.cb = proxy;

    const selected = computed(() => {
      if (proxy.modelValue) {
        return proxy.data.find((x) => x[proxy.valueField] == proxy.modelValue);
      } else {
        return null;
      }
    });
    onMounted(() => {
      proxy.data = proxy.dataAll;

      watch(
        () => proxy.dataAll,
        () => {
          search();
        }
      );
    });

    const search = function (e) {
      setTimeout(() => {
        let val = proxy.$refs.input.value;
        proxy.data = proxy.dataAll.filter((x) =>
          x[props.displayField]?.includes(val)
        );
      }, 100);
    };

    const display = computed(
      () => proxy.selected && proxy.selected[proxy.displayField]
    );

    const offsetPosi = reactive({
      top: 0,
      left: 0,
    });
    const offsetDropdown = reactive({
      width: 0,
      height: 0,
    });

    const isShowMenu = ref(false);

    /**
     * Xet style cho dropdown
     * Author: NNNinh (14/10/2022)
     */
    const style = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosi.top}px`);
      arr.push(`left: ${offsetPosi.left}px`);
      arr.push(`width: ${offsetDropdown.width}px`);
      arr.push(`height: ${offsetDropdown.height}px`);
      return arr.join("; ");
    });

    /**
     * Theo dõi biến isShowMenu là true hay false
     * Author: NNNinh (14/10/2022)
     */
    watch(
      () => isShowMenu.value,
      (newVal) => {
        if (newVal) {
          proxy.setPosition();
        }
      }
    );

    /**
     * Xự kiện click itemdropdown
     * Author: NNNinh (16/10/2022)
     */
    const itemClick = (item) => {
      emit("update:modelValue", item[proxy.valueField]);
      nextTick(() => {
        emit("item-click", item);
      });
    };

    watch(
      () => proxy.modelValue,
      (newVal) => {
        disp.value = display.value;
      }
    );
    onMounted(() => {
      proxy.setPosition();
      proxy.setDropdown();
      proxy.initEvent();
    });

    /**
     * Set vị trí cho dropdown
     * Author: NNNinh (16/10/2022)
     */
    function setPosition() {
      let offset = proxy.$refs.dropdown.getBoundingClientRect();
      offsetPosi.top = offset.bottom;
      offsetPosi.left = offset.left;
    }

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

    const hideDropdown = (evt, el) => {
      document.addEventListener("click", (e) => {
        if (proxy.isShowMenu) {
          let target = e.target;
          let cbo =
            target.closest(".dropdown-menu") ||
            target.closest(".dropdown-menu-toggle");
          if (!cbo) {
            proxy.isShowMenu = false;
          }
        }
      });
    };
    // const onBlur = (e) => {};
    const eventListsioner = computed(() => {
      const me = this;
      return {
        click: (e) => {
          proxy.cancelEvent(e);
          proxy.isShowMenu = !proxy.isShowMenu;
        },
        blur: (e) => {
          proxy.cancelEvent(e);
          // proxy.onBlur(e);
        },
        focus: (e) => {
          proxy.cancelEvent(e);
          // proxy.onFocus(e);
        },
        change: (e) => {
          proxy.cancelEvent(e);
          // proxy.changeValue(e);
        },
        keydown: (e) => {
          emit("keydown", e);
        },
        keyup: (e) => {
          emit("keyup", e);
        },
      };
    });

    /**
     * Set width,height cho dropdown
     * Author: NNNinh (16/10/2022)
     */
    function setDropdown() {
      let offset = proxy.$refs.dropdown.getBoundingClientRect();
      offsetDropdown.width = offset.width;
      offsetDropdown.height = 200.5 - this.heightCb;
    }

    /**
     *Đóng menu dropdown khi windown click
     * Author: NNNinh (15/10/2022)
     */
    function initEvent() {
      document.addEventListener("click", (e) => {
        if (proxy.isShowMenu) {
          let target = e.target;
          let cbo =
            target.closest(".dropdown-menu") ||
            target.closest(".dropdown-menu-toggle");
          if (!cbo) {
            proxy.isShowMenu = false;
          }
        }
      });
    }

    return {
      itemClick,
      cancelEvent,
      eventListsioner,
      setPosition,
      setDropdown,
      style,
      isShowMenu, //Show menu dropdown
      display,
      selected,
      initEvent, //Đóng menu dropdown khi windown click,
      search,
      data,
      disp,
      hideDropdown,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/MsDropdown.scss";
</style>
