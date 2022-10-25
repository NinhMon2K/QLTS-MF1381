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
      <ms-combobox
        leftIcon="ic-fillter"
        valueField="fixed_asset_category_id"
        displayField="fixed_asset_category_name"
        rightIcon="ic-angle-downs"
        placeholder="Loại tài sản"
        :heightCb="13"
        :dataAll="DataAssetCategory.value"
      ></ms-combobox>
      <ms-combobox
        leftIcon="ic-fillter"
        valueField="department_id"
        :heightCb="13"
        displayField="department_name"
        rightIcon="ic-angle-downs"
        placeholder="Bộ phận sử dụng"
        :dataAll="DataDepartment.value"
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
        <ms-button
          leftIcon="ic-delete__toolbar"
          id="btn-delete"
          :radius="true"
          @click="handleShowMessBox"
        >
        </ms-button>
      </ms-tooltip>
      <ms-popup-asset v-if="isShowPopup" :formModel="pram"></ms-popup-asset>
    </div>
  </div>

  <!-- Dialog xóa nhiều dòng -->
  <teleport to="body">
    <ms-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteMultiple.VI"
      :disabledValueLeft="true"
      :disabledValueRight="false"
      v-if="isDialogMessDeleMultiple"
    >
      <ms-button :text="Resource.TitleBtnDialog.Delete.VI" radius></ms-button>
      <ms-button
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessDeleMultiple = false"
        radius
      ></ms-button>
    </ms-message-box>
  </teleport>

  <!-- Dialog xóa 1 dòng -->
  <teleport to="body">
    <ms-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteOneAsset.VI"
      :disabledValueLeft="false"
      :disabledValueRight="true"
      v-if="isDialogMessDelete"
    >
      <ms-button :text="Resource.TitleBtnDialog.Delete.VI" radius></ms-button>
      <ms-button
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessDelete = false"
        radius
      >
      </ms-button>
    </ms-message-box>
  </teleport>

  <!-- Dialog cancel xóa -->
  <teleport to="body">
    <ms-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.CancelDelete.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessCancelDelete"
    >
      <ms-button :text="Resource.TitleBtnDialog.Close.VI" radius></ms-button>
    </ms-message-box>
  </teleport>

  <!-- Dialog cancel xóa nhiều dòng -->
  <teleport to="body">
    <ms-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.CancelDeleteMultiple.VI"
      :disabledValueLeft="true"
      :disabledValueRight="false"
      v-if="isDialogMessCancelDeleMultiple"
    >
      <ms-button :text="Resource.TitleBtnDialog.Agree.VI" radius></ms-button>
    </ms-message-box>
  </teleport>

  <!-- Khi không chọn dữ để xóa cảnh báo  -->
  <teleport to="body">
    <ms-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.DeleteNoData.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessDeleNoData"
    >
      <ms-button
        :text="Resource.TitleBtnDialog.Close.VI"
        radius
        @click="isDialogMessDeleNoData = false"
      ></ms-button>
    </ms-message-box>
  </teleport>
  <!-- Loading form -->
  <teleport to="body">
    <ms-loading v-if="isLoading"></ms-loading>
  </teleport>
  <ms-grid
    :columns="columns"
    :allData="allData.value"
    :selectedCol="true"
    ref="abc"
    v-model="dataSelected"
  >
  </ms-grid>
</template>
<script>
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";
import MsPopupAsset from "@/components/popup/MsPopupAsset.vue";
import MsMessageBox from "@/components/toast/MsMessageBox.vue";

import MsCombobox from "@/components/combobox/MsCombobox.vue";
import MsGrid from "@/components/gridViewer/MsGrid.vue";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
import MsLoading from "@/components/loading/MsLoading.vue";
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import assetAPI from "@/apis/api/assetAPI.js";
import ResourceTable from "@/resource/dictionary/resourceTable.js";
import Enum from "@/resource/dictionary/enum.js";
import Resource from "@/resource/dictionary/resource.js";
import { switchCase } from "@babel/types";
export default {
  name: "MsAsset",
  components: {
    MsButton,
    MsInput,
    MsGrid,
    MsPopupAsset,
    MsLoading,
    MsCombobox,
    MsTooltip,
    MsMessageBox,
  },
  methods: {
    close() {
      this.isShowPopup = false;
    },
    hanhdleAccumulated() {},
    // handleShowMessBox() {
    //   if (this.dataSelected.length == 1) {
    //     this.isDialogMessDelete = true;
    //   } else {
    //     console.log("das");
    //   }
    // },
  },
  async setup() {
    const { proxy } = getCurrentInstance();
    window.an = proxy;
    //Loading form
    const isLoading = ref(false);

    //Show Dialog MessageBox xóa nhiều dòng
    const isDialogMessDeleMultiple = ref(false);
    //Show Dialog MessageBox xóa 1 dòng
    const isDialogMessDelete = ref(false);
    //Show Dialog MessageBox không thể xóa 1 dòng
    const isDialogMessCancelDelete = ref(false);
    //Show Dialog MessageBox không thể xóa nhiều dòng
    const isDialogMessCancelDeleMultiple = ref(false);
    const isDialogMessDeleNoData = ref(false);
    const valueMessageBox = ref("");
    const isShowMessage = ref(false);
    const allData = ref([]);
    const dataAssets = ref([]);
    const DataAssetCategory = ref([]);
    const DataDepartment = ref([]);
    const Loading = ref(true);
    const dataSelected = ref([]);
    let pram = reactive({
      mode: 0,
      fixed_asset_id: "",
    });
    async function loadDataAsset() {
      try {
        proxy.isLoading = true;
        let res = await assetAPI.get("AssetGetAll", {});
        proxy.isLoading = false;
        let data = res?.Data;
        data.forEach((x, i) => (x.STT = i + 1));
        proxy.allData.value = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function loadDataCombotCategory() {
      try {
        let res = await assetAPI.get("CategoryGetAll", {});
        proxy.DataAssetCategory.value = res?.Data;
      } catch (error) {
        console.log(error);
      }
    }
    async function loadDataComboDepartment() {
      try {
        let res = await assetAPI.get("DepartmentGetAll", {});
        proxy.DataDepartment.value = res?.Data;
      } catch (error) {
        console.log(error);
      }
    }

    onMounted(() => {
      proxy.loadDataAsset();
      proxy.loadDataCombotCategory();
      proxy.loadDataComboDepartment();
    });

    const isShowMessageBox = () => {};
    function customValueMessBox(val) {
      if (val == 1) {
        return `<<${proxy.dataSelected[0].fixed_asset_code} - ${proxy.dataSelected[0].fixed_asset_name}>>`;
      } else if (val < 10) {
        return `0${val}`;
      } else return val;
    }
    const handleShowMessBox = () => {
      if (proxy.dataSelected.length == 0) {
        proxy.isDialogMessDeleNoData = true;
      } else {
        if (proxy.dataSelected.length == 1) {
          proxy.valueMessageBox = proxy.customValueMessBox(
            proxy.dataSelected.length
          );
          proxy.isDialogMessDelete = true;
        } else {
          proxy.valueMessageBox = proxy.customValueMessBox(
            proxy.dataSelected.length
          );
          proxy.isDialogMessDeleMultiple = true;
        }
      }
    };
    const handleClickAdd = () => {
      proxy.pram.mode = Enum.Mode.Add;
      proxy.isShowPopup = true;
    };
    const clickMenu = async (action, val) => {
      switch (action) {
        case 0: {
          proxy.pram.mode = Enum.Mode.Update;
          proxy.pram.fixed_asset_id = val;
          proxy.isShowPopup = true;
          break;
        }
        case 1: {
          proxy.pram.mode = Enum.Mode.Duplicate;
          proxy.pram.fixed_asset_id = val;
          proxy.isShowPopup = true;
          break;
        }
      }
    };

    const columns = ref([
      {
        field: ResourceTable.FieldAsset.STT,
        title: ResourceTable.lblTableAssets.STT,
        type: "Number",
        width: 48,
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
        field: ResourceTable.FieldAsset.fixedAssetId,
        title: ResourceTable.Controls.FunctionControl,
        type: "Action",
        width: 100,
        action: [
          {
            command: 0,
            icon: "ic-edit",
            click: clickMenu,
          },
          {
            command: 1,
            icon: "ic-replication",
            click: clickMenu,
          },
        ],
      },
    ]);

    return {
      columns,
      allData,
      dataSelected,
      customValueMessBox,
      isShowMessageBox,
      handleShowMessBox,
      isDialogMessDeleNoData,
      DataAssetCategory,
      DataDepartment,
      isLoading,
      Loading,
      ResourceTable,
      Resource,
      isDialogMessDeleMultiple,
      isDialogMessDelete,
      isDialogMessCancelDelete,
      isDialogMessCancelDeleMultiple,
      clickMenu,
      dataAssets,
      pram,
      loadDataAsset,
      loadDataCombotCategory,
      loadDataComboDepartment,
      isShowMessage,
      handleClickAdd,
      valueMessageBox,
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
@import "@/assets/scss/components/MsMessageBox.scss";
</style>
