<template>
  <div
    class="wrap-left"
    :class="{ 'menu-hide': collapsed }"
    :style="{ width: sideBarWidth }"
  >
    <div class="wrap-logo">
      <div class="logo app-icon ic-home"></div>
      <span class="abc">MISA QLTC</span>
    </div>
    <div class="menu">
      <div class="menu-group">
        <a
          class="menu-item"
          v-for="(item, index) in menuItems"
          :key="index"
          :href="item.path"
          :title="collapsed ? item.text : ''"
          :class="[item.path == activeItem?.path ? 'active' : '']"
          @click.prevent="() => clickMenu(item)"
        >
          <div :class="['app-icon', item.icon]"></div>
          <span class="text-menu">{{ item.text }}</span>
          <div class="arrow-menu misa-icon app-icon" :class="item.arrow"></div>
        </a>
      </div>
    </div>

    <div class="wrap-bottom-menu">
      <ms-tooltip :content="collapsed ? 'Mở ra' : 'Thu vào'" placement="top" right="top">
      <div
        class="menu-resize"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleSideBar"
      >
        <div class="resize-icon app-icon ic-back"></div>
      </div>
    </ms-tooltip>
    </div>
  </div>
</template>
<script>
//import { getCurrentInstance } from "vue";
import Resource from "../../resource/dictionary/resource.js";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
import { collapsed, sideBarWidth } from "./../../commons/state.js";
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";

export default {
  name: "LeftMenu",
  components: {MsTooltip},
  data() {
    return {};
  },
  computed: {
    menuItems() {
      return this.getMenuItems();
    },
  },

  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const isActive = ref(false);

    const activeItem = ref(null);

    function setActive() {
      proxy.isActive = true;
    }

    onMounted(() => {
      proxy.activeMenu();
    });

    watch(
      () => isActive.value,
      (newVal) => {
        if (newVal) {
          // console.log(isActive.value);
        }
      }
    );

    function activeMenu() {
      let pathName = location.pathname.toLowerCase();
      let item = proxy.menuItems.find((x) => x.path == pathName);
       proxy.activeItem = item;
      // proxy.activeItem = item || proxy.menuItems[1];
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

    const Listsioner = computed(() => {
      const me = this;
      return {
        click: (event) => {
          cancelEvent(event);
        },
        mousedown: (event) => {
          cancelEvent(event);
        },
        keydown: (event) => {
          cancelEvent(event);
          emit("keydown", event);
        },
        focus: (event) => {
          cancelEvent(event);
          emit("keydown", event);
        },
      };
    });
    const collapsed = ref(false);
    const toggleSideBar = () => {
      collapsed.value = !collapsed.value;
    };

    const getMenuItems = () => {
      let menuItems = [
        {
          path: "/dashboard",
          icon: "ic-overview",
          text: Resource.LeftMenu.Dashboard,
          arrow: "",
        },
        {
          path: "/asset",
          icon: "ic-car",
          text: Resource.LeftMenu.FA,
          arrow: "ic-angle-down",
        },
        {
          path: "",
          icon: "ic-asset",
          text: Resource.LeftMenu.HTDBAsset,
          arrow: "ic-angle-down",
        },
        {
          path: "",
          icon: "ic-tools",
          text: Resource.LeftMenu.SU,
          arrow: "ic-angle-down",
        },
        {
          path: "",
          icon: "ic-dictionary",
          text: Resource.LeftMenu.Dictionary,
          arrow: "",
        },
        {
          path: "",
          icon: "ic-menu__search",
          text: Resource.LeftMenu.Search,
          arrow: "ic-angle-down",
        },
        {
          path: "/report",
          icon: "ic-report ",
          text: Resource.LeftMenu.Report,
          arrow: "ic-angle-down",
        },
      ];
      return menuItems;
    };

    function clickMenu(item) {
      proxy.$router.push(item.path);
    }

    return {
      getMenuItems,
      collapsed,
      toggleSideBar,
      sideBarWidth,
      Listsioner,
      isActive,
      clickMenu,
      activeItem,
      activeMenu,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/layouts/leftMenu.scss";
</style>
