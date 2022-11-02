<template>
  <div class="contrainer-toolbar">
    <div class="toobar-left">
      <div class="container__search">
        <ms-input
          :hasLabel="false"
          leftIcon="ic-search"
          id="txt-search"
          tabindex="1"
          :radius="true"
          placeholder="Tìm kiếm tài sản"
          :disabledMessage="false"
          message=""
        ></ms-input>
      </div>
      <ms-combobox
        leftIcon="ic-fillter"
        valueField="fixed_asset_category_id"
        displayField="fixed_asset_category_name"
        rightIcon="ic-angle-downs"
        placeholder="Loại tài sản"
        tabindex="2"
        :heightCb="13"
        :dataAll="DataAssetCategory.value"
      ></ms-combobox>
      <ms-combobox
        leftIcon="ic-fillter"
        valueField="department_id"
        :heightCb="13"
        tabindex="3"
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
          tabindex="4"
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
          tabindex="5"
          :radius="true"
        ></ms-button>
      </ms-tooltip>
      <ms-tooltip content="Xóa" placement="bottom">
        <ms-button
          leftIcon="ic-delete__toolbar"
          id="btn-delete"
          tabindex="6"
          :radius="true"
          @click="handleShowMessBox"
        >
        </ms-button>
      </ms-tooltip>
      <ms-popup-asset
        v-if="isShowPopup"
        :formModel="pram"
        @closePopup="handlClosePopup"
      ></ms-popup-asset>
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
    v-model:selectedData="dataSelected"
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
  },
  async setup() {
    const { proxy } = getCurrentInstance();
    window.asset = proxy;
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

     //Show Dialog MessageBox không chọn dữ liệu để xóa
    const isDialogMessDeleNoData = ref(false);
    const valueMessageBox = ref("");

    // Biến lấy dữ liệu toàn bộ tài sản
    const allData = ref([]);

    // Biến lấy dữ liệu lại tài sản
    const DataAssetCategory = ref([]);

    // Biến lấy dữ liệu tên bộ phận
    const DataDepartment = ref([]);

    // Biến lấy những dữ liệu tr selected
    const dataSelected = ref([]);
    let pram = reactive({
      mode: 0,
      fixed_asset_id: "",
    });

    //Load dữ liệu data asset
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
     //Load dữ liệu data combobox loại tài sản
    async function loadDataCombotCategory() {
      try {
        let res = await assetAPI.get("CategoryGetAll", {});
        proxy.DataAssetCategory.value = res?.Data;
      } catch (error) {
        console.log(error);
      }
    }
     //Load dữ liệu data combobox tên bộ phận
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

    //Custom giá trị truyền vào messbox
    function customValueMessBox(val) {
      if (val == 1) {
        return `<<${proxy.dataSelected[0].fixed_asset_code} - ${proxy.dataSelected[0].fixed_asset_name}>>`;
      } else if (val < 10) {
        return `0${val}`;
      } else return val;
    }

    //Sự kiện đóng popup
    const handlClosePopup = (isShowPopup) => {
      proxy.isShowPopup = false;
    };

    /**
     * Sự kiện show mesagebox
     *  @author NNNinh(20/10/2021)
     */
    const handleShowMessBox = () => {
      //kiểm tra dataSelected bằng 0 => Hiển thị message : Bạn chưa chọn dữ liệu để xóa
      if (proxy.dataSelected.length == 0) {
        proxy.isDialogMessDeleNoData = true;
      } else {
        //kiểm tra dataSelected bằng 1 => Hiển thị message : Bạn có muốn xóa tài sản <<Mã - Tên tài sản>?
        if (proxy.dataSelected.length == 1) {
          proxy.valueMessageBox = proxy.customValueMessBox(
            proxy.dataSelected.length
          );
          proxy.isDialogMessDelete = true;
        } else {
          //kiểm tra dataSelected lớn hơn 1 => Hiển thị message : Số bản ghi đc chọn...
          proxy.valueMessageBox = proxy.customValueMessBox(
            proxy.dataSelected.length
          );
          proxy.isDialogMessDeleMultiple = true;
        }
      }
    };

    /**
     * Xử lý sự kiện click thêm mới
     *  @author NNNinh(20/10/2021)
     */
    const handleClickAdd = () => {
      proxy.pram.mode = Enum.Mode.Add;
      proxy.isShowPopup = true;
    };

    //Sự kiện click chức năng sửa hay nhân bản
    const clickMenu = async (action, val) => {
      switch (action) {
        case 0: // kiểm tra action = 0 là sửa
          proxy.pram.mode = Enum.Mode.Update;
          proxy.pram.fixed_asset_id = val;
          proxy.isShowPopup = true;
          break;    
        case 1: // kiểm tra action = 1 là nhân bản
          proxy.pram.mode = Enum.Mode.Duplicate;
          proxy.pram.fixed_asset_id = val;
          proxy.isShowPopup = true;
          break;
        
      }
    };

     /**
     * Xác định cột cho table
     * @param {string} type giá trị là number,text hay checked
     * @param {string} field trường để map dữ liệu 
     * @param {string} title text hiện thị lên giao diện
     * @param {string} width độ rộng của cột
     * @param {string} align vị trí bên trái, phải, center
     * Author: NNNinh (16/10/2022)
     */
    
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
        minWidth: 140,
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
      handleShowMessBox,
      isDialogMessDeleNoData, // show message chưa chọn dữ liệu để xóa
      DataAssetCategory, // dữ liệu data mã loại tài sản
      DataDepartment, // dữ liệu data bộ phận
      isLoading, // loading trang 
      ResourceTable, // Resource table
      Resource, // Resource
      isDialogMessDeleMultiple, // show message xóa nhiều dữ liệu
      isDialogMessDelete, 
      isDialogMessCancelDelete,
      isDialogMessCancelDeleMultiple,
      clickMenu,
      pram,
      loadDataAsset,
      loadDataCombotCategory,
      loadDataComboDepartment,
      handleClickAdd,
      valueMessageBox,
      handlClosePopup,
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
