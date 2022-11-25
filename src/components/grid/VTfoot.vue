<template>
  <tr>
    <th :colspan="spanCol">
      <div class="container-tfooter-left">
        <div class="tfooter--left" style="font-size: 11px">
          <span>Tổng số:</span>
          <span style="font-size: 11px; font-weight: 700; margin: 0 4px">{{
            dataTotal.totalCount
          }}</span>
          <span>bản ghi</span>
        </div>
        <div class="total-page">
          <select
            id="total-page_size"
            v-model="tableView"
            @change="handleChangeTab"
          >
            <option
              v-show="true"
              id="item-total"
              v-for="item in dataTotalPage"
              :key="item"
              :value="item"
              selected
              @click="handleTotalPage"
              @change="handleTotalPage"
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
            v-model="tableView"
            :dataTotal="dataTotal"
            @currentPage="handleTotalPage"
          ></v-pageding>
        </div>
      </div>
    </th>

    <th
      class="th-foot"
      v-for="col in column"
      :key="col.field"
      :style="{
        width: col.width + 'px',
      }"
    >
      {{ getValue(col) }}
    </th>
    <th></th>
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
import commonFunction from "@/assets/js/commons/commonFunction.js";
import { columns } from "element-plus/es/components/table-v2/src/common";
export default {
  components: {
    VPageding,
  },
  props: {
    columns: {
      default: [],
    },
    spanCol: {
      default: 0,
    },
    dataTotal: {
      default: {},
    },
    page: {
      default: {},
    },
  },
  emits: ["currentPage", "changeTabView"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.tfoot = proxy;
    const dataTotalPage = ref([20, 50, 100, 200]);
    // Số trang hiển thị
    const tableView = ref(20);
    const handleTotalPage = (val) => {
      emit("currentPage", proxy.tableView, val);
    };

    const column = computed(() =>
      proxy.columns?.filter((x, i) => i >= proxy.spanCol)
    );

    const handleChangeTab = () => {
      emit("changeTabView", proxy.tableView);
    };

    function getValue(col) {
      switch (col.summary) {
        case "sum":
          return commonFunction.formatNumber(proxy.dataTotal[col.field] || 0);

        case "number":
          return proxy.dataTotal[col.field] || 0;
      }
    }

    return {
      dataTotalPage,
      tableView,
      handleTotalPage,
      handleChangeTab,
      commonFunction,
      getValue,
      column,
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
    span {
      &:last-child {
        font-weight: 500;
      }
      &:first-child {
        font-weight: 500;
        margin-left: -11px;
      }
    }
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
  #item-total {
    widows: 100%;
    height: 36px !important;
  }
}
.th-foot {
  font-size: 13px;
  text-align: right;
}
#total-page_size {
}

</style>
