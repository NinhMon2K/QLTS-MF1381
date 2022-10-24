<template>
  <div class="grid-container">
    <div class="grid-view">
      <table>
        <thead>
          <tr>
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
          <tr v-for="item in allData" :key="item" @dblclick="handleClick(item)">
            <ms-td
              v-for="col in columns"
              :key="col"
              :config="col"
              :value="item[col.field]"
              @change-value="changeSelected"
            >
            </ms-td>
          </tr>
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
    <ms-popup-asset v-if="isShowPopup" :formModel="pram"></ms-popup-asset>
  </div>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  reactive,
  defineComponent,
} from "vue";
import ColumnType from "@/commons/constant/ColumnType";
import MsTh from "./MsTh.vue";
import MsTd from "./MsTd.vue";
import CommonFunction from "@/commons/commonFunction.js";
import Enum from "@/resource/dictionary/enum.js";
import MsPopupAsset from "@/components/popup/MsPopupAsset.vue";
import Resource from "@/resource/dictionary/resource.js";
export default defineComponent({
  name: "MsGrid",
  components: { MsTh, MsTd, MsPopupAsset },
  props: {
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
    // selected: {
    //   default: [],
    //   type: Array,
    // },
    // data: {
    //   default: [],
    //   type: Array,
    // },
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
    let pram = reactive({
      mode: 0,
      fixed_asset_id: "",
    });
    const dataPageging = ref([1, 2, 4, 3]);
    const dataSelected = ref([]);
    const handleClick = (item) => {  
      proxy.pram.mode = Enum.Mode.Update;
      proxy.pram.fixed_asset_id = item.fixed_asset_id;
      proxy.isShowPopup = true;
    };
    const changeValue = function (value, select, config) {
      if (select) {
        let item = proxy.allData.find((x) => x[config.field] == value);
        proxy.selected.push(item);
      } else {
        let i = proxy.selected.findIndex((x) => x[config.field] == value);

        proxy.selected.splice(i, 1);
      }
      proxy.$emit("change-value", proxy.selected);
    };
    onMounted(() => {
      proxy.handleSum();
    });
    const changeSelected = function (value, select, config) {
      if (select) {
        let item = proxy.allData.find((x) => x[config.field] == value);
        proxy.dataSelected.push(item);
      } else {
        let i = proxy.dataSelected.findIndex((x) => x[config.field] == value);

        proxy.dataSelected.splice(i, 1);
      }
      proxy.$emit("update:modelValue", proxy.dataSelected);
      proxy.$emit("change-value", proxy.dataSelected);
    };
    function formatPrice(value) {
      try {
        let val = (value / 1).toFixed(0).replace(".", ".");
        return val.toString().replace(/\B(?=(\d{0})+(?!\d))/g, ".");
      } catch (error) {
        console.log(error);
      }
    }
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
      changeValue,
      formatPrice,
      changeSelected,
      dataSelected,
      handleClick,
      dataPageging,
      pram,
      isShowPopup,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/scss/components/MsGid.scss";
</style>
