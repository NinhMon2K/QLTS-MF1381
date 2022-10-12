<template>
  <div class="contrainer-toolbar">
    <div class="toobar-left">
      <ms-input
        :hasLabel="false"
        leftIcon="ic-search"
        id="txt-search"
        :radius="true"
        placeholder="Tìm kiếm tài sản"
        :disabledMessage="false"
      ></ms-input>
      <ms-drop-down
        leftIcon="ic-fillter"
        valueField="fixed_asset_category_id"
        displayField="fixed_asset_category_name"
        rightIcon="ic-angle-downs"
        placeholder="Loại tài sản"
        :datax="comboData.value"
      ></ms-drop-down>
      <ms-combobox
        leftIcon="ic-fillter"
        valueField="fixed_asset_category_id"
        displayField="fixed_asset_category_name"
        rightIcon="ic-angle-downs"
        placeholder="Bộ phận sử dụng"
        :datax="comboData.value"
      ></ms-combobox>
    </div>
    <div class="toolbar-right">
      <ms-tooltip content="Thêm mới tài sản" placement="bottom" right="bottom">
        <ms-button
          ref="MsPopupAsset"
          text="Thêm tài sản"
          id="btn-add"
          leftIcon="ic-add"
          :radius="true"
          @click="handleClickAdd"
        >
        </ms-button>
      </ms-tooltip>
      <ms-tooltip content="Xuất Excel" placement="bottom">
        <ms-button
          leftIcon="ic-export"
          id="btn-export"
          :radius="true"
        ></ms-button>
      </ms-tooltip>
      <ms-tooltip content="Xóa" placement="bottom">
        <ms-button leftIcon="ic-delete__toolbar" id="btn-delete" :radius="true">
        </ms-button>
      </ms-tooltip>
      <ms-popup-asset titlePopup="Thêm mới" v-if="isShowPopup"></ms-popup-asset>
    </div>
  </div>

  <teleport to="body">
    <ms-loading v-if="isLoading"></ms-loading>
  </teleport>
  <ms-grid :columns="columns" :allData="allData.value" ref="abc"> </ms-grid>
</template>
<script>
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";
import MsPopupAsset from "@/components/popup/MsPopupAsset.vue";
import MsCombobox from "@/components/combobox/MsCombobox.vue";
import MsGrid from "@/components/gridViewer/MsGrid.vue";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
import MsLoading from "@/components/loading/MsLoading.vue";
import MsDropDown from "@/components/dropdown/MsDropDown.vue";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import assetAPI from "@/apis/api/assetAPI.js";
import ResourceTable from "@/resource/dictionary/ResourceTable.js";
export default {
  name: "MsAsset",
  components: {
    MsButton,
    MsInput,
    MsGrid,
    MsPopupAsset,
    MsDropDown,
    MsLoading,
    MsCombobox,
    MsTooltip,
  },
  methods: {
    handleClickAdd() {
      this.isShowPopup = true;
    },
    close() {
      this.isShowPopup = false;
    },
    hanhdleAccumulated() {},
  },
  async setup() {
    const { proxy } = getCurrentInstance();
    window.a = proxy;
    const allData = ref([]);
    const isLoading = ref(false);
    const comboData = ref([]);
    const Loading = ref(true);
    onMounted(async () => {
      proxy.isLoading = true;
      // setTimeout(() => {

      // }, 1000);
      let res = await assetAPI.get("AssetGetAll", {});
      proxy.isLoading = false;
      let data = res?.Data;
      data.forEach((x, i) => (x.STT = i + 1));
      proxy.allData.value = data;
      let rusult = await assetAPI.get("AssetGetNameAD", {});
      proxy.comboData.value = rusult?.Data;
    });

    // methods(() => {
    //   proxy.Loading = true;
    // });

    const columns = ref([
      {
        field: "selected",
        title: "abc",
        type: "Checkbox",
        width: 48,
      },
      {
        field: ResourceTable.FieldAsset.STT,
        title: ResourceTable.lblTableAssets.STT,
        type: "Number",
        width: 48,
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
        minWidth: 159,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetCategoryName,
        title: ResourceTable.lblTableAssets.lblAssetCategoryName,
        type: "Text",
        width: 250,
      },
      {
        field: ResourceTable.FieldDepartment.departmentName,
        title: ResourceTable.lblTableAssets.lblDepartmentName,
        type: "Text",
        width: 165,
      },
      {
        field: ResourceTable.FieldAsset.quantity,
        title: ResourceTable.lblTableAssets.lblQuantity,
        type: "Number",
        width: 60,
      },
      {
        field: ResourceTable.FieldAsset.cost,
        title: ResourceTable.lblTableAssets.lblCost,
        type: "Number",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.cost,
        title: ResourceTable.lblTableAssets.lblAccumulated,
        type: "Number",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.cost,
        title: ResourceTable.lblTableAssets.lblAsset,
        type: "Number",
        width: 110,
      },
      {
        field: "c",
        title: ResourceTable.Controls.FunctionControl,
        type: "Action",
        width: 100,
        action: [
          {
            command: "Edit",
            icon: "ic-edit",
          },
          {
            command: "Edit",
            icon: "ic-replication",
          },
        ],
      },
    ]);

    return {
      columns,
      allData,
      comboData,
      isLoading,
      Loading,
      ResourceTable,
    };
  },

  data() {
    return {
      isShowPopup: false,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/assetsQLTS/MsAsset.scss";
</style>
