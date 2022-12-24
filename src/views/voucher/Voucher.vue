<template>
  <div class="container__voucher">
    <div class="voucher__header">
      <div class="voucher__header--left"><h2>GHI TĂNG TÀI SẢN</h2></div>
      <div class="voucher__header--right">
        <div class="box_buttom--left">
          <v-tooltip content="Thêm mới" placement="bottom" right="bottom">
            <!-- buttom thêm mới -->
            <v-button
              text="Thêm"
              id="btn-add"
              @click="isShowPopupUpdate = true"
              :radius="true"
              :tabindex="'4'"
            >
            </v-button>
          </v-tooltip>
        </div>
        <div class="box_buttom--right">
          <div class="box_enlarge">
            <v-tooltip content="Xuất Excel" placement="bottom">
              <v-button
                leftIcon="ic-enlarge"
                type="basic"
                :tabindex="'5'"
                :radius="true"
              ></v-button>
            </v-tooltip>
          </div>
          <div>
            <v-tooltip content="Xuất Excel" placement="bottom">
              <v-button
                leftIcon="ic-angle-down__black"
                id="btn-export"
                :tabindex="'5'"
                type="basic"
                :radius="true"
              ></v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>

    <div class="voucher__content">
      <div class="voucher__toolbar">
        <div class="voucher__toolbar--left">
          <v-input
            id="txt-search"
            :hasLabel="false"
            :radius="true"
            leftIcon="ic-search"
            placeholder="Tìm kiếm theo chứng từ, nội dung"
            :disabledMessage="false"
            :tabindex="'1'"
            @blur="handleChangeSeach"
            @change="handleChangeSeach"
            @keypress.enter="handleChangeSeach"
          ></v-input>
        </div>
        <div class="voucher__toolbar--right">
          <div class="btn-printer">
            <v-tooltip content="Xuất Excel" placement="bottom">
              <v-button
                leftIcon="ic-printer"
                id="btn-export"
                :tabindex="'5'"
                type="basic"
                :radius="true"
              ></v-button>
            </v-tooltip>
          </div>
          <div class="btn-more">
            <v-tooltip content="Xuất Excel" placement="bottom">
              <v-button
                leftIcon="ic-more"
                id="btn-export"
                :tabindex="'5'"
                type="basic"
                :radius="true"
              ></v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
      <div class="table-container">
        <v-grid
          :columns="columns"
          :allData="allData"
          :selectedCol="true"
          :dataTotal="dataTotal"
          :disableFooter="false"
          v-model:active="active"
          ref="table"
          @deleteOnKey="handleShowMessBox"
          v-model:selectedData="dataSelected"
          @handle-close="handlClosePopup"
          @show-message="handleShowMess"
          @currentPage="handleTotalPage"
          @changeTabView="handleChangeTab"
        >
        </v-grid>
      </div>
    </div>
    <div class="voucher__footer">
      <div class="content-menu content-menu-2--white">
        <h3 style="margin: 10px 0">Thông tin chi tiết</h3>
        <div class="content-btns">
          <div class="position-relative">
            <v-tooltip content="Mở rộng" placement="bottom" right="bottom">
              <div class="button-no-border icon-expand">d</div>
            </v-tooltip>
          </div>
          <div class="position-relative">
            <v-tooltip content="Thu nhỏ" placement="bottom" right="bottom">
              <div class="button-no-border icon-shrink">a</div>
            </v-tooltip>
          </div>
        </div>
      </div>

      <div class="table-container">
        <v-grid
          :columns="columns"
          :allData="allData"
          :selectedCol="true"
          :dataTotal="dataTotal"
          :disableFooter="false"
          v-model:active="active"
          ref="table"
          @deleteOnKey="handleShowMessBox"
          v-model:selectedData="dataSelected"
          @handle-close="handlClosePopup"
          @show-message="handleShowMess"
          @currentPage="handleTotalPage"
          @changeTabView="handleChangeTab"
        >
        </v-grid>
      </div>
    </div>
  </div>
  <voucher-update-asset v-if="isShowPopupUpdate"></voucher-update-asset>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/view/voucher/MsVoucher.scss";
</style>
<script setup>
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
import VoucherUpdateAsset from "./VoucherDetail.vue";
const isLoading = ref(false);
const allData = ref([]);
const currentPage = ref(0);
const tableView = ref(0);

const isShowPopupUpdate = ref(false);
onMounted(() => {});

async function loadDataAllAsset() {
  try {
    let res = await assetAPI.get("Assets", {});
    let data = res;
    data.forEach((x, i) => {
      x.STT = i + 1;
      x.depreciation_residual = x.cost - x.depreciation_year;
    });
    allData.value = res;
    console.log(allData.value);
  } catch (error) {
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
    title: ResourceTable.lblTableAssets.lblAccumulated,
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
  {
    field: ResourceTable.FieldAsset.fixedAssetId,
    title: ResourceTable.Controls.FunctionControl,
    type: "Action",
    width: 100,
    action: [
      {
        command: 0,
        icon: "ic-edit",
      },
      {
        command: 1,
        icon: "ic-replication",
      },
    ],
  },
]);
</script>
