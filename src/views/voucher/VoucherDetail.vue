<template>
  <teleport to="body">
    <div class="model" v-show="isShowPopupDetail">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">Thêm chứng từ ghi tăng</div>
          <v-tooltip content="Hủy" placement="bottom" right="bottom">
            <div ref="btnClose" class="form-asset__close app-icon ic-close"></div>
          </v-tooltip>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="voucher-detaill">
              <div class="voucher-detaill__title"><p>Thông tin chứng từ</p></div>
              <div class="voucher-detaill__content">
                <div class="detaill__content-top">
                  <div class="form-group">
                    <v-input
                      label="Mã chứng từ"
                      tabindex="101"
                      hasLabel
                      hasInput
                      :maxLength="50"
                      :radius="false"
                      :disabledMessage="true"
                      message="Lỗi 1"
                    ></v-input>
                  </div>
                  <div class="form-group">
                    <v-input-date
                      label="Ngày bắt đầu sử dụng"
                      hasLabel
                      hasInput
                      tabindex="109"
                      rightIcon="ic-date"
                      :radius="true"
                    ></v-input-date>
                  </div>
                  <div class="form-group">
                    <v-input-date
                      label="Ngày ghi tăng"
                      hasLabel
                      hasInput
                      tabindex="109"
                      rightIcon="ic-date"
                      :radius="true"
                    ></v-input-date>
                  </div>
                </div>
                <div class="detaill__content-bottom">
                  <v-input
                    label="Ghi chú"
                    tabindex="101"
                    hasLabel
                    :maxLength="50"
                    :radius="false"
                    :disabledMessage="true"
                    message="Lỗi 1"
                  ></v-input>
                </div>
              </div>
            </div>
            <div class="voucher__assets-details--title">
              <h4>Thông tin chi tiết</h4>
            </div>
            <div class="voucher__assets-details">
              <div class="details__toolbars">
                <div class="details__toolbars--left">
                  <v-input
                    id="txt-search"
                    :hasLabel="false"
                    :radius="true"
                    leftIcon="ic-search"
                    placeholder="Tìm kiếm theo mã, tên tài sản"
                    :disabledMessage="false"
                    :tabindex="'1'"
                  ></v-input>
                </div>
                <div class="details__toolbars--right">
                  <v-button
                    tabindex="201"
                    text="Chọn tài sản"
                    @click="handleShowPopupSelect"
                    type="secodary"
                    radius
                  ></v-button>
                </div>
              </div>
              <div class="details__tables">
                <div class="form_container--table">
                  <v-grid
                    :columns="columns"
                    :allData="allData"
                    :selectedCol="false"
                    :dataTotal="dataTotal"
                    v-model:active="active"
                    :disableFooter="true"
                    ref="table"
                    @deleteOnKey="handleShowMessBox"
                    v-model:selectedData="dataSelected"
                    @currentPage="handleTotalPage"
                    @changeTabView="handleChangeTab"
                  >
                  </v-grid>
                </div>
                <div class="container_footer--table">
                  <table class="gr-footer">
                    <tfoot>
                      <v-tfoot
                        :columns="columns"
                        :spanCol="4"
                        :dataTotal="dataTotalPaging"
                        @currentPage="handleTotalPage"
                        @changeTabView="handleChangeTab"
                      ></v-tfoot>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-popup">
          <div class="form-asset__footer">
            <!-- Buttom hủy
                    @author NNNINH (22/11/2022) -->
            <v-tooltip content="Hủy" placement="top" right="top">
              <v-button
                text="Hủy"
                tabindex="112"
                type="secodary"
                ref="btnClosePopup"
                radius
              >
              </v-button>
            </v-tooltip>
            <!-- Buttom lưu dữ liệu
                    @author NNNINH (22/11/2022) -->
            <v-tooltip content="Lưu và cất" placement="top" right="top">
              <v-button text="Lưu" tabindex="111" radius :disabled="false"></v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>
  </teleport>
  <teleport to="body">
    <v-loading v-if="isLoading"></v-loading>
  </teleport>
  <voucher-select-assets v-if="isShowPopupSelect"></voucher-select-assets>
</template>

<style lang="scss" scoped></style>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import VButton from "@/components/button/VButton.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VInput from "@/components/input/VInput.vue";
import VGrid from "@/components/grid/VGrid.vue";
import assetAPI from "@/apis/api/assetAPI.js";
import ResourceTable from "@/assets/js/resource/resourceTable";
import VLoading from "@/components/loading/VLoading.vue";
import VInputDate from "@/components/date/VInputDate.vue";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";
import VoucherSelectAssets from "./VoucherSelectAssets.vue";
import VTfoot from "@/components/grid/VTfoot.vue";
export default {
  components: {
    VButton,
    VTooltip,
    VInput,
    VGrid,
    VLoading,
    VInputDate,
    VoucherSelectAssets,
    VTfoot,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.popupSelect = proxy;
    const isLoading = ref(false);
    const allData = ref([]);
    const txtSearch = ref(" ");
    const currentPage = ref(0);
    const tableView = ref(0);
    const isShowPopup = ref(false);
    const dataAssetID = ref({});
    const active = ref(-1);
    const dataSelected = ref([]);
    const isShowPopupDetail = ref(true);
    const isShowPopupSelect = ref(false);
    let pram = ref({});
    const dataTotal = ref({});
    const dataTotalPaging = ref({});

    const handleShowPopupSelect = () => {
      proxy.isShowPopupDetail = false;
      proxy.isShowPopupSelect = true;
    };
    // Sự kiện change giới hạn bản ghi
    const handleChangeTab = (val) => {
      proxy.tableView = val;
      proxy.loadDataAsset();
    };
    // Sự kiện change page number
    const handleTotalPage = (tableView, val) => {
      proxy.tableView = tableView;
      proxy.currentPage = val;
      proxy.loadDataAsset();
    };
    /**
     * Lấy dữ liệu tài sản
     * @Author: NNNinh (13/11/2022)
     */
    async function loadDataAsset() {
      try {
        proxy.isLoading = true;
        // Mảng lưu dữ liệu mã loại tài sản
        let arrCategory = [];
        // Mảng lưu dữ liệu mã bộ phận sử dụng
        let arrDepartment = [];

        // Đối tượng paging tài sản
        let pagingAsset = {
          keyword: proxy.txtSearch, // Giá trị tìm kiếm tài sản
          listDepartment: [], // Mảng dữ liệu mã bộ phận sử dụng
          listCategory: [], // Mảng dữ liệu mã loại tài sản
          limit: proxy.tableView, // Số bản ghi hiện lên một trang
          page: proxy.currentPage, // Trang hiện tại
        };

        // Gọi API lấy dữ liệu tài sản
        let res = await assetAPI.filters("Assets/Filters", pagingAsset);
        proxy.isLoading = false;
        proxy.dataTotalPaging.totalCount = res.totalCount; // Lấy giá trị tổng số bản ghi
        proxy.dataTotal.quantity = res.totalQuantity; // Lấy giá trị tổng số lượng
        proxy.dataTotal.cost = res.totalCost; // Lấy giá trị tổng số nguyên giá
        proxy.dataTotal.depreciation_year = res.totalDepreciation; // Lấy tổng số khấu hao hao mòn lũy kế
        proxy.dataTotal.depreciation_residual = res.totalRemain; // Lấy tổng số giá trị còn lại
        let data = res?.data;
        let o = (proxy.currentPage - 1) * proxy.tableView;
        data.forEach((x, i) => {
          x.STT = i + 1 + o;
          x.depreciation_residual = x.cost - x.depreciation_year;
        });
        proxy.allData = data;
      } catch (error) {
        proxy.isLoading = false;
        console.log(error);
      }
    }

    /**
     * Xác định cột cho table
     * @param {string} type giá trị là number,text hay checked
     * @param {string} field trường để map dữ liệu
     * @param {string} title text hiện thị lên giao diện
     * @param {string} width độ rộng của cột
     * @param {string} align vị trí bên trái, phải, center
     * @Author: NNNinh (16/10/2022)
     */
    const columns = ref([
      {
        field: ResourceTable.FieldAsset.STT,
        title: ResourceTable.lblTableAssets.STT,
        type: "Number",
        width: 40,
        align: "Center",
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetCode,
        title: ResourceTable.lblTableAssets.lblAssetCode,
        type: "Text",
        width: 80,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetName,
        title: ResourceTable.lblTableAssets.lblAssetName,
        type: "Text",
        minWidth: 140,
      },

      {
        field: ResourceTable.FieldDepartment.departmentName,
        title: ResourceTable.lblTableAssets.lblDepartmentName,
        type: "Text",
        width: 165,
      },

      {
        field: ResourceTable.FieldAsset.cost,
        title: ResourceTable.lblTableAssets.lblCost,
        type: "Number",
        summary: "sum",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.depreciationYear,
        title: "Hao mòn năm",
        type: "Number",
        summary: "sum",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.depreciationResidual,
        title: ResourceTable.lblTableAssets.lblAsset,
        type: "Number",
        summary: "sum",
        width: 110,
      },
    ]);
    return {
      columns,
      loadDataAsset,
      isLoading,
      allData,
      txtSearch,
      currentPage,
      tableView,
      isShowPopup,
      dataAssetID,
      active,
      dataSelected,
      pram,
      dataTotal,
      handleTotalPage,
      handleChangeTab,
      isShowPopupDetail,
      handleShowPopupSelect,
      isShowPopupSelect,
      dataTotalPaging,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/voucher/VoucherDetail.scss";
</style>
