<template>
  <div class="filter-combobox">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>
    <ms-tooltip :content="display" placement="top" right="top">
      <button
        class="combobox-menu-toggle"
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
          :id="id"
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
    </ms-tooltip>
    <teleport to="body">
      <div class="combobox-menu" :style="style" v-if="isShowMenu">
        <div class="combobox-content">
          <ul class="list-item--combobox">
            <ms-combobox-detail
              v-for="item in dataAll"
              :key="item"
              :dataItem="item"
              :displayField="displayField"
              :valueField="valueField"
              :class="[selected == item ? 'selected' : '']"
              @change-value="changeValue"
            >
            </ms-combobox-detail>
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
import MsComboboxDetail from "./MsComboboxDetail.vue";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
export default {
  name: "MsCombobox",
  components: {
    MsComboboxDetail,
    MsTooltip,
  },
  props: {
    modelValue: {
      default: null,
    },
    // Icon bên trái combobox
    leftIcon: {
      default: null,
      type: String,
    },
    dataAll: {
      default: [],
    },
    id: {
      default: null,
      type: String,
    },
    // Icon bên phải combobox
    rightIcon: {
      default: null,
      type: String,
    },
    // trạng thái icon
    disabled: {
      default: false,
      type: Boolean,
    },
    // chú giải
    placeholder: {
      default: null,
      type: [Number, String],
    },
    // trường dữ liệu
    valueField: {
      default: null,
      type: String,
    },
    // hiển thị dữ liệu nào
    displayField: {
      default: null,
      type: String,
    },
    //lable combobox
    label: {
      default: null,
      type: String,
    },
    // có bắt buộc nhập hay không
    hasInput: {
      default: false,
      type: Boolean,
    },
    // trạng thái lable mặc định false
    hasLabel: {
      default: false,
      type: Boolean,
    },
    // Giảm đi height list-item
    heightCb: {
      default: 0,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const selected = ref([]);
    window.cb = proxy;
    const display = computed(() =>
      proxy.selected.map((x) => x[props.displayField]).join("; ")
    );

    const objSelected = computed(() =>
      proxy.dataAll.reduce(
        (o, x) => ({
          ...o,
          [x[proxy.valueField]]: proxy.selected.includes(x),
        }),
        {}
      )
    );

    /**
     * Xet positon cho combobox
     * @param {top,left} type top: vị trí top,left: vị trí left
     * Author: NNNinh (16/10/2022)
     */
    const offsetPosi = reactive({
      top: 0,
      left: 0,
    });

    /**
     * Xet positon cho combobox
     * @param {width,height} type width: chiều dài list-item, height: chiều cao list-item
     * Author: NNNinh (18/10/2022)
     */
    const offsetDropdown = reactive({
      width: 0,
      height: 0,
    });

    //Biến show list item
    const isShowMenu = ref(false);

    //Xét style cho list
    const style = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosi.top}px`);
      arr.push(`left: ${offsetPosi.left}px`);
      arr.push(`width: ${offsetDropdown.width}px`);
      arr.push(`height: ${offsetDropdown.height}px`);
      return arr.join("; ");
    });

    //Theo dõi show list
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
      proxy.initEvent();
    });
    function setPosition() {
      let offset = proxy.$refs.input.getBoundingClientRect();
      offsetPosi.top = offset.bottom;
      offsetPosi.left = offset.left;
    }

    /**
     *Xet width, height cho combobox
     * Author: NNNinh (15/10/2022)
     */
    function setDropdown() {
      let offset = proxy.$refs.input.getBoundingClientRect();
      offsetDropdown.width = offset.width;
      offsetDropdown.height = 200.5 - this.heightCb;
    }

    const changeValue = function (item, select) {
      proxy.$emit("update:modelValue", proxy.selected);
      if (select) {
        proxy.selected.push(item);
        console.log(proxy.selected);
      } else {
        let i = proxy.selected.findIndex(
          (x) => x[proxy.valueField] == item[proxy.valueField]
        );

        proxy.selected.splice(i, 1);
      }
      proxy.$emit("change-value", proxy.selected, proxy.dataItem);
    };

    /**
     *Sự kiện event click windown ẩn list combobox
     * Author: NNNinh (15/10/2022)
     */
    function initEvent() {
      document.addEventListener("click", (e) => {
        if (proxy.isShowMenu) {
          let target = e.target;
          let cbo =
            target.closest(".combobox-menu") ||
            target.closest(".combobox-menu-toggle");
          if (!cbo) {
            proxy.isShowMenu = false;
          }
        }
      });
    }

    return {
      initEvent,
      itemClick,
      setPosition,
      setDropdown,
      style,
      isShowMenu,
      display,
      selected,
      changeValue,
      objSelected,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/MsCombobox.scss";
</style>
