<template>
  <div class="contrainer-toolbar">
    <div class="toobar-left">
      <ms-input
        :hasLabel="false"
        leftIcon="ic-search "
        id="txt-search"
        :radius="true"
        placeholder="Tìm kiếm tài sản"
      ></ms-input>
    </div>
    <div class="toolbar-right">
      <ms-button
        ref="MsPopupAsset"
        text="Thêm tài sản"
        id="btn-add"
        leftIcon="ic-add"
        :radius="true"
        @click="handleClickAdd"
      >
      </ms-button>
      <ms-button leftIcon="ic-export" id="btn-export" :radius="true">
      </ms-button>
      <!-- <ms-popup-asset ></ms-popup-asset> -->

      <ms-button leftIcon="ic-delete__toolbar" id="btn-delete" :radius="true">
      </ms-button>
      <ms-popup-asset titlePopup="Thêm mới" v-if="isShowPopup"></ms-popup-asset>
    </div>
  </div>

  <ms-grid :columns="columns" :allData="allData.value" ref="abc"> </ms-grid>
</template>
<script>
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";

import MsPopupAsset from "@/components/popup/MsPopupAsset.vue";
import MsGrid from "@/components/gridViewer/MsGrid.vue";
import { getCurrentInstance, onMounted, ref } from "vue";
import assetAPI from "@/apis/api/assetAPI.js";
import ResourceTable from '@/resource/dictionary/ResourceTable.js';
export default {
  name: "MsAsset",
  components: {
    MsButton,
    MsInput,
    MsGrid,
    MsPopupAsset,

  },
  methods: {
    handleClickAdd() {
      console.log("ninh");
      this.isShowPopup = true;
    },
    close() {
      this.isShowPopup = false;
    },
  },
  async setup() {
    const { proxy } = getCurrentInstance();
    window.a = proxy;
 
    
    onMounted(async () => {
      let res = await assetAPI.get("AssetGetAll", {});
      // console.log(res?.Data);
      proxy.allData.value = res?.Data;
    
    });
    const allData = [
    
    ];
    const columns = ref([
      {
        field: "selected",
        title: "abc",
        type: "Checkbox",
        width: 48,
      },
      {
        field: "fixedAssetId",
        title: ResourceTable.lblTableAssets.STT,
        type: "Number",
        width: 48,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetCode,
        title: ResourceTable.lblTableAssets.lblAssetCode,
        type: "Text",
        width: 150,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetName,
        title:ResourceTable.lblTableAssets.lblAssetName,
        type: "Text",
        minWidth: 159,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetCategoryName,
        title: ResourceTable.lblTableAssets.lblAssetCategoryName,
        type: "Text",
        width: 163,
      },
      {
        field: ResourceTable.FieldDepartment.departmentName,
        title: ResourceTable.lblTableAssets.lblDepartmentName,
        type: "Text",
        width: 178,
      },
      {
        field: ResourceTable.FieldAsset.quantity,
        title: ResourceTable.lblTableAssets.lblQuantity,
        type: "Number",
        width: 98,
      },
      {
        field: ResourceTable.FieldAsset.cost,
        title: ResourceTable.lblTableAssets.lblCost,
        type: "Number",
        width: 97,
      },
      {
        field: ResourceTable.FieldAsset.cost*ResourceTable.FieldAsset.depreciationRate,
        title: ResourceTable.lblTableAssets.lblAccumulated,
        type: "Number",
        width: 118,
      },
      {
        field:  ResourceTable.FieldAsset.cost-ResourceTable.FieldAsset.cost*ResourceTable.FieldAsset.depreciationRate,
        title: ResourceTable.lblTableAssets.lblAsset,
        type: "Number",
        width: 97,
      },
      {
        field: "c",
        title: ResourceTable.Controls.FunctionControl,
        type: "Action",
        width: 83,
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
     allData
    };
  },
  data() {
    return {
      isShowPopup: false,
    };
  },
  // proxy.$el.f
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/assetsQLTS/MsAsset.scss";
</style>
