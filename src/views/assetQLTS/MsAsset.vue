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

  <ms-grid :columns="columns" :allData="allData" ref="abc"> </ms-grid>
</template>
<script>
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";
import MsPopupAsset from "@/components/popup/MsPopupAsset.vue";
import MsGrid from "@/components/gridViewer/MsGrid.vue";
import { getCurrentInstance, onMounted, ref } from "vue";
import assetAPI from "@/apis/api/assetAPI.js";
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
      console.log(allData);
    });
    const columns = ref([
      {
        field: "selected",
        title: "abc",
        type: "Checkbox",
        width: 48,
      },
      {
        field: "fixedAssetId",
        title: "STT",
        type: "Number",
        width: 48,
      },
      {
        field: "fixedAssetCode",
        title: "Mã tài sản",
        type: "Text",
        width: 150,
      },
      {
        field: "fixed_asset_name",
        title: "Tên tài sản",
        type: "Text",
        minWidth: 159,
      },
      {
        field: "fixed_asset_category_name",
        title: "Loại tài sản",
        type: "Text",
        width: 163,
      },
      {
        field: "department_name",
        title: "Bộ phận sử dụng",
        type: "Text",
        width: 178,
      },
      {
        field: "cost",
        title: "Số lượng",
        type: "Number",
        width: 98,
      },
      {
        field: "quantity",
        title: "Nguyên giá",
        type: "Number",
        width: 97,
      },
      {
        field: "depreciation_rate",
        title: "HM/KH lũy kế",
        type: "Number",
        width: 118,
      },
      {
        field: "depreciationAsset",
        title: "Giá trị còn lại",
        type: "Number",
        width: 97,
      },
      {
        field: "c",
        title: "Chức năng",
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

    const allData = [
      {
        fixedAssetId: 1,
        fixedAssetCode: "55H7WN72/2022",
        fixed_asset_name: "Dell Inspiron",
        fixed_asset_category_name: "Máy vi tính xách tay",
        department_name: "Phòng hành chính kế toán",
        cost: 1,
        quantity: 20000000,
        depreciation_rate: 894000,
        depreciationAsset: 19106000,
      },
    ];

    return {
      columns,
      allData,
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
