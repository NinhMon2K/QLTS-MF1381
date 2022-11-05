<template>
  <tr>
    <td colspan="6">
      <div class="container-tfooter-left">
        <div class="tfooter--left" style="font-size: 11px">
          Tổng số:
          <span style="font-size: 11px; font-weight: 700; margin: 0 4px">{{
            allData.length
          }}</span>
          bản ghi
        </div>
        <div class="total-page">
          <select id="total-page_size" v-model="tableView">
            <option
              class="item-total"
              v-for="item in dataTotalPage"
              :key="item"
              :value="item"
              selected
            >
              {{ item }}
            </option>
          </select>
          <label class="icon-total_page" for="total-page_size">
            <div class="icon-bottom app-icon ic-angle_down"></div>
          </label>
        </div>

        <div class="tfooter--right">
          <v-pageding
            :v-model="20"
            :totalCount="500"
            :countRecordPageRecord="tableView"
            @totalPagge="handleTotalPage"
          ></v-pageding>
        </div>
      </div>
    </td>

    <td style="font-size: 13px; font-weight: 700; text-align: right">
      {{ handleSum(ResourceTable.FieldAsset.quantity) }}
    </td>
    <td style="font-size: 13px; font-weight: 700; text-align: right">
      {{ handleSum(ResourceTable.FieldAsset.cost) }}
    </td>
    <td style="font-size: 13px; font-weight: 700; text-align: right">
      {{ handleSum(ResourceTable.FieldAsset.cost) }}
    </td>
    <td style="font-size: 13px; font-weight: 700; text-align: right">
      {{ handleSum(ResourceTable.FieldAsset.cost) }}
    </td>
    <td></td>
  </tr>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
  onBeforeMount,
  toRefs,
} from "vue";
import VPageding from "@/components/grid/VPageding.vue";
import Resource from "@/assets/js/resource/resource.js";
import ResourceTable from "@/assets/js/resource/resourceTable.js";
export default {
  components: {
    VPageding,
  },
  props: {
    totalCount: {
      default: null,
      type: Number,
    },
    totalCost: {
      default: null,
      type: Number,
    },
    totalQuantity: {
      default: null,
      type: Number,
    },
    totalRemain: {
      default: null,
      type: Number,
    },
    allData: {
      default: [],
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.tfoot = proxy;
    const dataTotalPage = ref([20, 50, 100, 200]);

    const dataAsset = toRefs(props.allData);
    // Số trang hiển thị
    const tableView = ref(20);

    const dataPage = reactive({
      totalCount: "",
      totalPagge: "",
    });
    const handleTotalPage = (val) => {
      console.log(val);
      proxy.dataPage.totalPagge = val;
    };

    watch(
      () => props.allData,
      (newVal) => {
        proxy.dataAsset = newVal;
      }
    );
    // format tiền
    function formatMoney(money) {
      money = new Intl.NumberFormat(Resource.LanguageCode.VN, {}).format(money);
      return money;
    }

    // Tính tổng giá trị số lượng nguyên giá,HM/KH lũy kế, giá trị còn lại
    function handleSum(value) {
      let sumA = 0;
      console.log(proxy.dataAsset);
      proxy.dataAsset.forEach((data) => {
        sumA += data[value];
      });
      return formatMoney(sumA);
    }
    return {
      dataTotalPage,
      tableView,
      handleTotalPage,
      dataPage,
      handleSum,
      dataAsset,
      Resource,
      ResourceTable,
    };
  },
};
</script>

<style lang="scss" scoped>
.container-tfooter-left {
  display: flex;
  align-items: center;
  .tfooter--left {
    width: 150px;
    padding-left: 17px;
  }
  .total-page {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-right: 20px;
    .icon-total_page {
      position: absolute;
      right: 12px;
      cursor: pointer;
    }
  }
}
#total-page_size {
  background-color: #ffffff;
  border-radius: 2.625px;
  border: 1px solid #afafaf;
  width: 59px;
  height: 25px;
  overflow: hidden;
  font-size: 11px;
  padding-left: 13px;
  outline: none;
  -webkit-appearance: none;
}
</style>
