<template>
  <div class="grid-container">
    <div class="grid-view">
      <table>
        <thead>
          <tr>
            <ms-th ref="th" v-for="col in columns" :key="col" :config="col">
              {{ col.title }}
            </ms-th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in allData" :key="item">
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
            <td colspan="3">
              <div>
                <div
                  class="tfooter--left"
                  style="font-size: 11px; margin-left: 4px"
                >
                  Tổng số:
                  <span
                    style="font-size: 11px; font-weight: 700; margin: 0 4px"
                    >{{ allData.length }}</span
                  >
                  bản ghi
                </div>
                <div class="tfooter--right"></div>
              </div>
            </td>
            <td colspan="3">
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
  </div>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  defineComponent,
} from "vue";
import ColumnType from "@/commons/constant/ColumnType";
import MsTh from "./MsTh.vue";
import MsTd from "./MsTd.vue";
import CommonFunction from "@/commons/commonFunction.js";
export default defineComponent({
  name: "MsGrid",
  components: { MsTh, MsTd },
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

    const dataSelected = ref([]);
    const changeValue = function (value, select, config) {
      if (select) {
        let item = proxy.allData.find((x) => x[config.field] == value);
        proxy.selected.push(item);
      } else {
        let i = proxy.selected.findIndex((x) => x[config.field] == value);

        proxy.selected.splice(i, 1);
      }
      console.log(proxy.selected);
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
    function handleSum(value) {
      let sumA = 0;
      this.allData.forEach((data) => {
        sumA += data[value];
      });
      return new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
      }).format(sumA);
    }
    return {
      selected,
      handleSum,
      changeValue,
      changeSelected,
      dataSelected,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/scss/components/MsGid.scss";
</style>
