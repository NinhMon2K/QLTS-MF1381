<template>
  <div class="filter-combobox">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>
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
      <input type="text" :value="display" :placeholder="placeholder" :id="id" />
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
      <div class="combobox-menu" :style="style" v-if="isShowMenu">
        <div class="combobox-content">
          <ul class="list-item--combobox">
            <ms-combobox-detail
              v-for="item in datax"
              :key="item"
              :dataItem="item"
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
export default {
  name: "MsCombobox",
  components: {
    MsComboboxDetail,
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
    id: {
      default: null,
      type: String,
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

    const selected = ref([]);
    // const objSelected = ref({});
    window.c = proxy;

    window.ab = proxy;

    const display = computed(() =>
      proxy.selected.map((x) => x[props.displayField]).join(";")
    );

    const objSelected = computed(() =>
      proxy.datax.reduce(
        (o, x) => ({
          ...o,
          [x[proxy.valueField]]: proxy.selected.includes(x),
        }),
        {}
      )
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

    const changeValue = function (item, select) {
      if (select) {
        proxy.selected.push(item);
      } else {
        let i = proxy.selected.findIndex(
          (x) => x[proxy.valueField] == item[proxy.valueField]
        );

        proxy.selected.splice(i, 1);
      }
      proxy.$emit("change-value", proxy.selected, proxy.dataItem);
    };

    return {
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
