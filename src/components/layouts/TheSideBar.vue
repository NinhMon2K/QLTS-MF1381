<template>
  <div
    class="wrap-left"
    :class="{ 'menu-hide': collapsed }"
    :style="{ width: sideBarWidth }"
  >
    <div class="wrap-logo">
      <div class="logo app-icon ic-home"></div>
      <span class="title--logo">{{ Resource.LeftMenu.TitleLogo }}</span>
    </div>
    <div class="menu">
      <div class="menu-group">
        <div class="group__item" v-for="(item, index) in menuItems" :key="index">
          <v-tooltip
            :content="collapsed ? item.title : ''"
            placement="right"
            right="right"
          >
            <div
              class="menu-item"
              :href="item.path"
              :class="[item.path == activeItem?.path ? 'active' : '']"
              @click="() => clickMenu(item)"
            >
              <div :class="['app-icon', item.icon]"></div>
              <span class="text-menu">{{ item.text }}</span>
              <div
                class="arrow-menu misa-icon app-icon"
                @click="hanhdleShowItemChildrens(index)"
                :class="item.arrow"
              ></div>
            </div>
          </v-tooltip>
          <div class="sidebar__sub-menu">
            <div
              class="sidebar-sub__group"
              v-for="(itemChildrens, i) in item.childrens"
              :key="i"
            >
              <div
                class="sidebar-sub"
                :href="itemChildrens.path"
                :class="[itemChildrens.path == activeItem?.path ? 'active' : '']"
                @click="() => clickMenu(itemChildrens)"
                v-if="Childrens"
              >
                <a class="sidebar-sub__item">
                  <span class="text-menu">{{ itemChildrens.text }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-bottom-menu">
      <v-tooltip :content="collapsed ? 'Mở ra' : 'Thu vào'" placement="top" right="top">
        <div
          class="menu-resize"
          :class="{ 'rotate-180': collapsed }"
          @click="toggleSideBar"
        >
          <div class="resize-icon app-icon ic-back"></div>
        </div>
      </v-tooltip>
    </div>
  </div>
</template>
<script>
//import { getCurrentInstance } from "vue";
import Resource from "@/assets/js/resource/resource.js";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import { collapsed, sideBarWidth } from "@/assets/js/commons/state.js";
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";

export default {
  name: "LeftMenu",
  components: { VTooltip },
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

    window.sideBar = proxy;
    const isActive = ref(false);
    const activeItem = ref(null);
    const Childrens = ref(false);
    function setActive() {
      proxy.isActive = true;
    }
    onMounted(() => {
      proxy.activeMenu();
    });

    watch(
      () => activeItem.value,
      (newVal) => {
        if (newVal) {
          proxy.activeMenu();
        }
      }
    );

    function activeMenu() {
      let pathName = location.pathname.toLowerCase();
      let item = proxy.menuItems.find((x) => x.path == pathName);
      proxy.activeItem = item || proxy.menuItems[1];
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

    function hanhdleShowItemChildrens(index, e) {
      let id = 0;
      proxy.menuItems.forEach((item) => {
        item.childrens.forEach((element) => (id = element.itemID));
      });
      if ((index = id)) {
        proxy.Childrens = !proxy.Childrens;
      } else {
        proxy.Childrens = false;
      }
    }
    const getMenuItems = () => {
      let menuItems = [
        {
          itemID: 1,
          path: "/voucher",
          icon: "ic-overview",
          text: Resource.LeftMenu.Dashboard,
          arrow: "",
          title: Resource.LeftMenu.Dashboard,
          childrens: [],
        },
        {
          itemID: 2,
          path: "/asset",
          icon: "ic-car",
          text: Resource.LeftMenu.FA,
          arrow: "ic-angle-down",
          title: Resource.LeftMenu.FA,
          childrens: [
            {
              itemID: 2,
              path: "/voucher",
              text: "Ghi tăng",
              arrow: "",
            },
            {
              itemID: 2,
              path: "/voucher",
              text: "Thay đổi thông tin",
              arrow: "",
            },
            {
              itemID: 2,
              path: "/voucher",
              text: "Đánh giá lại",
              arrow: "",
            },
            {
              itemID: 2,
              path: "/voucher",
              text: "Tính hao mòn",
              arrow: "",
            },
            {
              itemID: 2,
              path: "/voucher",
              text: "Điều chuyển tài sản",
              arrow: "",
            },
            {
              itemID: 2,
              path: "/voucher",
              text: "Ghi giảm",
              arrow: "",
            },
            {
              itemID: 2,
              path: "/voucher",
              text: "Kiểm kê",
              arrow: "",
            },
            {
              itemID: 2,
              path: "/voucher",
              text: "Khác",
              arrow: "",
            },
          ],
        },
        {
          itemID: 3,
          path: "",
          icon: "ic-asset",
          text: Resource.LeftMenu.HTDBAsset,
          arrow: "ic-angle-down",
          title: Resource.LeftMenu.HTDBAssetTT,
          childrens: [],
        },
        {
          itemID: 4,
          path: "",
          icon: "ic-tools",
          text: Resource.LeftMenu.SU,
          arrow: "ic-angle-down",
          title: Resource.LeftMenu.SU,
          childrens: [],
        },
        {
          itemID: 5,
          path: "",
          icon: "ic-dictionary",
          text: Resource.LeftMenu.Dictionary,
          arrow: "",
          title: Resource.LeftMenu.Dictionary,
          childrens: [],
        },
        {
          itemID: 6,
          path: "",
          icon: "ic-menu__search",
          text: Resource.LeftMenu.Search,
          arrow: "ic-angle-down",
          title: Resource.LeftMenu.Search,
          childrens: [],
        },
        {
          itemID: 7,
          path: "/report",
          icon: "ic-report ",
          text: Resource.LeftMenu.Report,
          arrow: "ic-angle-down",
          title: Resource.LeftMenu.Report,
          childrens: [],
        },
      ];
      return menuItems;
    };

    function clickMenu(item) {
      proxy.$router.push(item.path);
    }

    return {
      getMenuItems,
      hanhdleShowItemChildrens,
      collapsed,
      toggleSideBar,
      sideBarWidth,
      Listsioner,
      isActive,
      clickMenu,
      activeItem,
      activeMenu,
      Resource,
      Childrens,
      setActive,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/layouts/the_sidebar.scss";
</style>
