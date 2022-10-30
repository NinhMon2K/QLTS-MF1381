<template>
  <div class="grid-container">
    <div class="grid-view">
      <table>
        <thead>
          <tr>
            <th v-if="selectedCol" style="width: 50px">
              <div class="th-inner">
                <ms-checkbox v-model="allSelected"></ms-checkbox>
              </div>
            </th>

            <ms-th
              ref="th"
              v-for="col in columns"
              :key="col"
              :config="col"
              :allData="allData"
            >
              {{ col.title }}
            </ms-th>
          </tr>
        </thead>
        <tbody>
          <ms-tr
            v-for="(item, i) in allData"
            :class="selectedIndex[i] ? 'active-tr' : ''"
            :key="item"
            :data="item"
            :columns="columns"
            :selectedCol="selectedCol"
            v-model:selected="selectedIndex[i]"
            @click="handleClick(i)"
            @dblclick="handleDoubleClick(item)"
          >
          </ms-tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6">
              <div class="container-tfooter-left">
                <div class="tfooter--left" style="font-size: 11px">
                  Tổng số:
                  <span
                    style="font-size: 11px; font-weight: 700; margin: 0 4px"
                    >{{ allData.length }}</span
                  >
                  bản ghi
                </div>
                <div class="total-page">
                  <select>
                    <option class="item-total" value="20" selected>20</option>
                    <option class="item-total" value="50">50</option>
                    <option class="item-total" value="100">100</option>
                    <option class="item-total" value="200">200</option>
                  </select>
                  <div class="icon-bottom app-icon ic-angle_down"></div>
                </div>

                <div class="tfooter--right">
                  <div class="pagering">
                    <div class="page--left">
                      <div class="app-icon ic-angle-left"></div>
                    </div>
                    <div class="page--content">
                      <div
                        style="font-size: 11px; font-weight: 700"
                        class="item-page"
                      >
                        1
                      </div>
                      <div style="font-size: 11px" class="item-page">2</div>
                      <div style="font-size: 11px" class="item-page">..</div>
                      <div style="font-size: 11px" class="item-page">10</div>
                      <div style="font-size: 11px" class="item-page">11</div>
                    </div>
                    <div class="page--right">
                      <div class="app-icon ic-angle-right"></div>
                    </div>
                  </div>
                </div>
              </div>
            </td>

            <td style="font-size: 13px; font-weight: 700">
              {{ handleSum("quantity") }}
            </td>

            <td style="font-size: 13px; font-weight: 700">
              {{ handleSum("cost") }}
            </td>
            <td style="font-size: 13px; font-weight: 700">
              {{ handleSum("cost") }}
            </td>
            <td style="font-size: 13px; font-weight: 700">
              {{ handleSum("cost") }}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <ms-popup-asset v-if="isShowPopup" :formModel="pram" :dataPram="pramData"></ms-popup-asset>
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
import ColumnType from "@/commons/constant/ColumnType";
import MsTh from "./MsTh.vue";
import MsTd from "./MsTd.vue";
import MsTr from "./MsTr.vue";
import CommonFunction from "@/commons/commonFunction.js";
import Enum from "@/resource/dictionary/enum.js";
import MsPopupAsset from "@/components/popup/MsPopupAsset.vue";
import Resource from "@/resource/dictionary/resource.js";
import MsCheckbox from "@/components/input/MsCheckbox.vue";

export default defineComponent({
  name: "MsGrid",
  components: { MsTh, MsTr, MsPopupAsset, MsCheckbox },
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
    // filters: {
    //   default: [],
    //   type: Array,
    // },
    // active: {
    //   default: null,
    //   type: Object,
    // }
  },

  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const selected = ref([]);
    const isShowPopup = ref(false);
    window.tables = proxy;
    let pram = reactive({
      mode: 0,
      fixed_asset_id: "",
    });
    let pramData = ref({  });

    const allSelected = ref(false);
    // Lấy ra những vị trí checked
    const selectedIndex = ref([]);
    const dataPageging = ref([1, 2, 4, 3]);
    const dataSelected = computed(() =>
      selectedIndex.value.map((x, i) => x && proxy.allData[i]).filter((x) => x)
    );

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

    const handleDoubleClick = (item) => {
      proxy.pram.mode = Enum.Mode.Update;
      proxy.pramData = item;
      proxy.isShowPopup = true;
    };
    const handleClick = (index) => {
      if (proxy.selectedIndex[index]) {
        proxy.selectedIndex[index] = false;
      } else {
        proxy.selectedIndex[index] = true;
      }
    };

    onMounted(() => {
      proxy.handleSum();
    });

    function formatMoney(money) {
      money = new Intl.NumberFormat(Resource.LanguageCode.VN, {}).format(money);
      return money;
    }
    function handleSum(value) {
      let sumA = 0;
      this.allData.forEach((data) => {
        sumA += data[value];
      });
      return formatMoney(sumA);
    }
    return {
      selected,
      handleSum,
      dataSelected,
      handleDoubleClick,
      dataPageging,
      pram,
      isShowPopup,
      allSelected,
      selectedIndex,
      handleClick,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/scss/components/MsGid.scss";
.active-tr {
  background-color: rgba(26, 164, 200, 0.2);
}
</style>
