<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    current-page.sync="currentPage"
    :page-size="countRecordPageRecord"
    layout=" prev, pager, next"
    :total="totalCount"
  >
  </el-pagination>
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
  toRefs,
  defineComponent,
} from "vue";
export default {
  props: {
    modelValue: {
      default: null,
    },
    totalCount: {
      default: null,
      type: [String, Number],
    },
    countRecordPageRecord: {
      default: null,
      type: [String, Number],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.page = proxy;
    /**
     * Trang hiện tại đứng
     * @author NNNinh(03/11/2022)
     */
    const currentPage = ref(1);
    const handleCurrentChange = (val) => {
      nextTick(() => {
        emit("totalPagge", val);
      });
    };
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };

    return {
      currentPage,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep() {
  .el-pager {
    li {
      padding: 0;
      margin: 0;
    }
    .more {
      width: 20px !important;
      min-width: 20px !important;
      height: 20px;
      margin: 0 2px 0 -2px;
    }
    .number {
      width: 20px !important;
      min-width: 20px !important;
      height: 20px;
      font-size: 11px !important;
      margin-right: 7px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      &.is-active {
        font-weight: 700;
        color: #000;
      }
      &:last-child {
        margin-left: 3px;
      }
      &:first-child {
        margin-right: 9px;
      }
    }
  }
  .btn-prev {
    width: 20px !important;
    min-width: 20px !important;
    height: 20px;
    margin-top: -2px;
    margin-right: 10px;
  }
  .btn-next {
    width: 20px !important;
    min-width: 20px !important;
    height: 20px;
    margin-top: -2px;
    margin-left: 3px;
  }
}
</style>
