<template>
  <div class="grid-container">
    <div class="grid-view">
      <div class="grid-header" :class="allData.length < 20 ? 'mg' : ''">
        <table>
          <thead>
            <tr>
              <th v-if="selectedCol" style="width: 50px">
                <div class="th-inner">
                  <v-checkbox v-model="allSelected"></v-checkbox>
                </div>
              </th>
              <v-th
                ref="th"
                v-for="col in columns"
                :key="col"
                :config="col"
                :allData="allData"
              >
                {{ col.title }}
              </v-th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="grid-body">
        <table id="tbl_tbody" v-if="allData.length > 0">
          <tbody>
            <v-tr
              v-for="(item, i) in allData"
              :class="[
                selectedIndex[i] ? 'active-tr' : '',
                active == i ? 'active-row' : '',
              ]"
              :key="item"
              :data="item"
              :columns="columns"
              :selectedCol="selectedCol"
              v-model:selected="selectedIndex[i]"
              @click="handleClick(i)"
              @dblclick="handleDoubleClick(item, i)"
            >
            </v-tr>
          </tbody>
        </table>
        <div class="container_no--data" v-else>
          <div class="no-data app-icon ic-no__data"></div>
        </div>
      </div>

      <div class="grid-footer">
        <table class="gr-footer">
          <tfoot>
            <v-tfoot
              :columns="columns"
              :spanCol="4"
              :dataTotal="dataTotal"
              @currentPage="handleTotalPage"
              @changeTabView="handleChangeTab"
            ></v-tfoot>
          </tfoot>
        </table>
      </div>
    </div>
    <v-popup-asset
      v-if="isShowPopup"
      :formModel="pram"
      :allData="pramData"
      @handle-close="handlClosePopup"
      @show-message="handleShowMess"
    ></v-popup-asset>
  </div>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  reactive,
  nextTick,
  computed,
  onUpdated,
  defineComponent,
} from "vue";
import VTh from "./VTh.vue";
import VTr from "./VTr.vue";
import VPopupAsset from "@/components/popup/VPopupAsset.vue";
import VCheckbox from "@/components/input/VCheckbox.vue";
import VTfoot from "@/components/grid/VTfoot.vue";
import Resource from "@/assets/js/resource/resource.js";
import Enum from "@/assets/js/enums/enum.js";

export default defineComponent({
  name: "MsGrid",
  components: { VTh, VTr, VPopupAsset, VCheckbox, VTfoot },
  props: {
    selectedCol: {
      default: false,
      type: Boolean,
    },

    columns: {
      default: [],
    },
    allData: {
      default: [],
    },
    idField: {
      default: "",
    },
    modelValue: {
      default: [],
    },
    selectedField: {
      default: "",
    },
    selectedData: {
      default: [],
    },
    dataTotal: {
      default: {},
    },
    page: {
      default: {},
    },
    active: {
      default: 0,
    },
    // filters: {
    //   default: [],
    //   type: Array,
    // },
    // active: {
    //   default: null,
    //   type: Object,
    // }
  },
  emits: [
    "currentPage",
    "selected",
    "selectedData",
    "changeTabView",
    "update:selected",
    "update:selectedData",
    "update:active",
  ],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.tables = proxy;
    const selected = ref([]);
    const isShowPopup = ref(false);
    let pram = reactive({
      mode: 0,
    });
    let pramData = ref({});
    const confirmMessage = reactive({
      iconMessage: "",
      textMessage: "",
      isShow: false,
    });

    const allSelected = ref(false);
    // Lấy ra những vị trí checked
    const selectedIndex = ref([]);
    const dataPageging = ref([1, 2, 4, 3]);
    const dataSelected = computed(() =>
      selectedIndex.value.map((x, i) => x && proxy.allData[i]).filter((x) => x)
    );

    // Reset lại giá trị show toast message
    onUpdated(() => {
      if (proxy.confirmMessage.isShow == true) {
        setTimeout(() => {
          proxy.confirmMessage.isShow = false;
        }, 2500);
      }
    });

    // Cập nhật dataSelected vào selectedData
    onMounted(() => {
      watch(
        () => proxy.dataSelected,
        (newVal) => {
          emit("update:selected", newVal);
          nextTick(() => {
            emit("update:selectedData", proxy.dataSelected);
          });
        }
      );
    });

    //Theo dõi biến allSelected kiểm tra là true thì lấy tất cả dữ liệu
    watch(
      () => allSelected.value,
      (newVal) => {
        if (newVal) {
          proxy.selectedIndex = proxy.allData.map((x) => true);
        } else {
          proxy.selectedIndex = [];
        }
      }
    );

    /**
     * Xử lý sự kiện double click tr
     *  @author NNNinh(01/11/2022)
     * @pram {object} item dữ liệu asset khi click tr
     */
    const handleDoubleClick = (item, i) => {
      proxy.pram.mode = Enum.Mode.Update;
      proxy.pramData = item;
      proxy.isShowPopup = true;
      emit("update:active", i);
    };

    /**
     * Xử lý sự kiện bỏ checked 1 dòng
     *  @author NNNinh(01/11/2022)
     */
    const handleClick = (index) => {
      if (proxy.selectedIndex[index]) {
        proxy.selectedIndex[index] = false;
      } else {
        proxy.selectedIndex[index] = true;
      }

      emit("update:active", index);
    };

    //Sự kiện đóng popup
    const handlClosePopup = (value) => {
      proxy.isShowPopup = value;
    };

    const handleShowMess = (mode, isShowMessage) => {
      emit("show-message", mode, isShowMessage);
    };

    const handleChangeTab = (val) => {
      emit("changeTabView", val);
    };

    const handleTotalPage = (tableView, val) => {
      emit("currentPage", tableView, val);
    };

    function reset() {
      proxy.selectedIndex = [];
    }

    return {
      handleTotalPage,
      selected,
      handleChangeTab,
      dataSelected,
      handleDoubleClick,
      dataPageging,
      pram,
      isShowPopup,
      allSelected,
      selectedIndex,
      handleClick,
      handlClosePopup,
      confirmMessage,
      handleShowMess,
      reset,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/scss/components/v_gid.scss";
.active-tr,
.active-row {
  background-color: rgba(26, 164, 200, 0.2);
}

#tbl_tbody {
  tbody {
    tr {
      .text-center {
        &:first-child {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
