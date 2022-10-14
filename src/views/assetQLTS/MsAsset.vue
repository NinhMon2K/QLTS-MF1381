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
        :dataCombo="DataAssetCategory.value"
      ></ms-combobox>
      <ms-combobox
        leftIcon="ic-fillter"
        valueField="department_id"
        displayField="department_name"
        rightIcon="ic-angle-downs"
        placeholder="Bộ phận sử dụng"
        :dataCombo="DataDepartment.value"
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
      <ms-popup-asset
        titlePopup="Thêm mới"
        v-if="isShowPopup"
        :formModel="pram"
      ></ms-popup-asset>
    </div>
  </div>
  <ms-message
    v-if="isShowMessage"
    textMessage="ddddsadas"
    iconMessage="ic-success"
  ></ms-message>
  <teleport to="body">
    <ms-message-box
      leftIcon="ic-warning"
      valueMessageBox="09"
      :textMessageBox="Resource.TitleDialogMessage.DeleteMultiple.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isToastMessageBox"
    >
      <ms-button text="Không" type="secodary" radius></ms-button>
      <ms-button text="Xóa" radius></ms-button>
    </ms-message-box>
  </teleport>

  <teleport to="body">
    <ms-loading v-if="isLoading"></ms-loading>
  </teleport>
  <ms-grid :columns="columns" :allData="allData.value" ref="abc"> </ms-grid>
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
import MsMessage from "@/components/toast/MSToastMessage.vue";

import { getCurrentInstance, onMounted, reactive, ref, watch } from "vue";
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
    MsMessage,
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
    const dataAssets = ref([]);
    const isLoading = ref(false);
    const isToastMessageBox = ref(false);
    const isShowMessage = ref(false);
    const DataAssetCategory = ref([]);
    const DataDepartment = ref([]);
    const Loading = ref(true);
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

    // methods(() => {
    //   proxy.Loading = true;
    // });

    const clickMenu = async (action, val) => {
      switch (action) {
        case 0: {
          proxy.pram.mode = Enum.Mode.Update;
          proxy.pram.fixed_asset_id = val;
          proxy.handleClickAdd();
          break;
        }
        case 1: {
          console.log(val);
          break;
        }
      }
    };
    watch(
      () => isShowMessage.value,
      () => {
        proxy.handleShowMessage();
      }
    );
    const changeValue = function (item, select) {
      if (select) {
        proxy.selected.push(item);
      } else {
        let i = proxy.selected.findIndex(
          (x) => x[proxy.valueField] == item[proxy.valueField]
        );

        proxy.selected.splice(i, 1);
      }
      proxy.$emit("change-value", proxy.selected, proxy.dataItem);
    };

    function handleShowMessage() {
      proxy.isShowMessage = true;
      setTimeout(() => {
        proxy.isShowMessage = false;
      }, 2000);
      return proxy.isShowMessage;
    }
    const columns = ref([
      {
        field: ResourceTable.FieldAsset.fixedAssetId,
        title: "checkbox",
        type: "Checkbox",
        width: 50,
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
      DataAssetCategory,
      DataDepartment,
      isLoading,
      Loading,
      ResourceTable,
      Resource,
      isToastMessageBox,
      clickMenu,
      isShowMessage,
      handleShowMessage,
      dataAssets,
      pram,
      loadDataAsset,
      loadDataCombotCategory,
      loadDataComboDepartment,
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
