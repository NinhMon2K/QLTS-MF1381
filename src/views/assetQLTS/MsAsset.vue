<template>
  <div class="contrainer-toolbar">
    <div class="toobar-left">
      <div class="container__search">
        <v-input
          :hasLabel="false"
          leftIcon="ic-search"
          id="txt-search"
          :radius="true"
          placeholder="Tìm kiếm tài sản"
          :disabledMessage="false"
          message=""
        ></v-input>
      </div>
      <v-combobox
        leftIcon="ic-fillter"
        valueField="fixed_asset_category_id"
        displayField="fixed_asset_category_name"
        rightIcon="ic-angle-downs"
        placeholder="Loại tài sản"
        :heightCb="13"
        :dataAll="DataAssetCategory.value"
      ></v-combobox>
      <v-combobox
        leftIcon="ic-fillter"
        valueField="department_id"
        :heightCb="13"
        displayField="department_name"
        rightIcon="ic-angle-downs"
        placeholder="Bộ phận sử dụng"
        :dataAll="DataDepartment.value"
      ></v-combobox>
    </div>
    <div class="toolbar-right">
      <v-tooltip content="Thêm mới tài sản" placement="bottom" right="bottom">
        <v-button
          ref="MsPopupAsset"
          text="Thêm tài sản"
          id="btn-add"
          leftIcon="ic-add"
          :radius="true"
          @click="handleClickAdd"
        >
        </v-button>
      </v-tooltip>
      <v-tooltip content="Xuất Excel" placement="bottom">
        <v-button
          leftIcon="ic-export"
          id="btn-export"
          :disabled="disabledButton.disabledExport"
          :radius="true"
        ></v-button>
      </v-tooltip>
      <v-tooltip content="Xóa" placement="bottom">
        <v-button
          leftIcon="ic-delete__toolbar"
          id="btn-delete"
          :radius="true"
          :disabled="disabledButton.disabledDelete"
          @click="handleShowMessBox"
        >
        </v-button>
      </v-tooltip>
      <v-popup-asset
        v-if="isShowPopup"
        :formModel="pram"
        :allData="dataAssetID"
        @handle-close="handlClosePopup"
        @show-message="handleShowMess"
      ></v-popup-asset>
    </div>
  </div>

  <!-- Dialog xóa nhiều dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteMultiple.VI"
      :disabledValueLeft="true"
      :disabledValueRight="false"
      v-if="isDialogMessDeleMultiple"
    >
      <v-button :text="Resource.TitleBtnDialog.Delete.VI" radius></v-button>
      <v-button
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessDeleMultiple = false"
        radius
      ></v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog xóa 1 dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteOneAsset.VI"
      :disabledValueLeft="false"
      :disabledValueRight="true"
      v-if="isDialogMessDelete"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Delete.VI"
        @click="handleDelete"
        radius
      ></v-button>
      <v-button
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessDelete = false"
        radius
      >
      </v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog cancel xóa -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.CancelDelete.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessCancelDelete"
    >
      <v-button :text="Resource.TitleBtnDialog.Close.VI" radius></v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog cancel xóa nhiều dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.CancelDeleteMultiple.VI"
      :disabledValueLeft="true"
      :disabledValueRight="false"
      v-if="isDialogMessCancelDeleMultiple"
    >
      <v-button :text="Resource.TitleBtnDialog.Agree.VI" radius></v-button>
    </v-message-box>
  </teleport>

  <!-- Khi không chọn dữ để xóa cảnh báo  -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.DeleteNoData.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessDeleNoData"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Close.VI"
        radius
        @click="isDialogMessDeleNoData = false"
      ></v-button>
    </v-message-box>
  </teleport>
  <!-- Loading form -->
  <teleport to="body">
    <v-loading v-if="isLoading"></v-loading>
  </teleport>
  <v-grid
    :columns="columns"
    :allData="allData"
    :selectedCol="true"
    ref="abc"
    v-model:selectedData="dataSelected"
    @handleTotalPage="handleTotalPage"
  >
  </v-grid>
  <teleport to="body">
    <v-message
      :iconMessage="confirmMessage.iconMessage"
      :textMessage="confirmMessage.textMessage"
      v-if="confirmMessage.isShow"
    ></v-message>
  </teleport>
</template>
<script>
import VButton from "@/components/button/VButton.vue";
import VInput from "@/components/input/VInput.vue";
import VPopupAsset from "@/components/popup/VPopupAsset.vue";
import VMessageBox from "@/components/toast/VMessageBox.vue";
import VCombobox from "@/components/combobox/VCombobox.vue";
import VGrid from "@/components/grid/VGrid.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VLoading from "@/components/loading/VLoading.vue";
import VMessage from "@/components/toast/VToastMessage.vue";
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import assetAPI from "@/apis/api/assetAPI.js";
import ResourceTable from "@/assets/js/resource/resourceTable";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";
export default {
  name: "MsAsset",
  components: {
    VButton,
    VInput,
    VGrid,
    VPopupAsset,
    VLoading,
    VCombobox,
    VTooltip,
    VMessageBox,
    VMessage,
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

    onUpdated(() => {
      if (proxy.confirmMessage.isShow == true) {
        setTimeout(() => {
          proxy.confirmMessage.isShow = false;
        }, 3000);
      }
    });
    const confirmMessage = reactive({
      iconMessage: "",
      textMessage: "",
      isShow: false,
    });

    const handleShowMess = (mode, isShowMessage) => {
      if (mode == Enum.Mode.Add || Enum.Mode.Duplicate) {
        proxy.confirmMessage.iconMessage = "ic-success";
        proxy.confirmMessage.textMessage = "Thêm mới thành công!";
        proxy.confirmMessage.isShow = true;
      }
    };
    const disabledButton = reactive({
      disabledExport: true,
      disabledDelete: true,
    });

    // Biến lấy dữ liệu lại tài sản
    const DataAssetCategory = ref([]);

    // Biến lấy dữ liệu tên bộ phận
    const DataDepartment = ref([]);

    const dataAssetID = ref({});
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
        let res = await assetAPI.get("Assets", {});
        proxy.isLoading = false;
        let data = res;
        data.forEach((x, i) => (x.STT = i + 1));
        proxy.allData = data;
      } catch (error) {
        console.log(error);
      }
    }
    //Load dữ liệu data combobox loại tài sản
    async function loadDataCombotCategory() {
      try {
        let res = await assetAPI.get("Categories", {});

        proxy.DataAssetCategory.value = res;
      } catch (error) {
        console.log(error);
      }
    }
    //Load dữ liệu data combobox tên bộ phận
    async function loadDataComboDepartment() {
      try {
        let res = await assetAPI.get("Departments", {});
        proxy.DataDepartment.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    //Load dữ liệu data combobox tên bộ phận
    async function loadDataAssetPageding(tableView, totalPagge) {
      try {
        proxy.isLoading = true;
        let v_Offset = totalPagge;
        let v_Limit = tableView;
        let v_Sort = "";
        let v_Where = "";
        let res = await assetAPI.get("AssetGetPageding", {
          v_Offset,
          v_Limit,
          v_Sort,
          v_Where,
        });

        let data = res?.Data;
        let o = (totalPagge - 1) * tableView;
        data.forEach((x, i) => (x.STT = i + 1 + o));
        proxy.allData = data;
        proxy.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    }

    const handleTotalPage = (tableView, totalPagge) => {
      proxy.loadDataAssetPageding(tableView, totalPagge);
    };

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
    const handlClosePopup = (value) => {
      proxy.isShowPopup = value;
    };

    watch(
      () => dataSelected.value,
      (newVal) => {
        if (proxy.dataSelected.length == 0) {
          proxy.disabledButton.disabledExport = true;
          proxy.disabledButton.disabledDelete = true;
        } else {
          //kiểm tra dataSelected bằng 1 => Hiển thị message : Bạn có muốn xóa tài sản <<Mã - Tên tài sản>?
          if (proxy.dataSelected.length == 1) {
            proxy.disabledButton.disabledExport = false;
            proxy.disabledButton.disabledDelete = false;
          } else {
            proxy.disabledButton.disabledExport = false;
            proxy.disabledButton.disabledDelete = false;
          }
        }
      }
    );
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
    async function deletaAsset() {
      try {
        let fixed_asset_id = proxy.dataSelected[0].fixed_asset_id;
        let res = await assetAPI.delete("Assets", fixed_asset_id);

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    const handleDelete = () => {
      proxy.deletaAsset();
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
          proxy.dataAssetID = proxy.allData.filter((x) =>
            x["fixed_asset_id"]?.includes(val)
          );
          proxy.isShowPopup = true;
          break;
        case 1: // kiểm tra action = 1 là nhân bản
          proxy.pram.mode = Enum.Mode.Duplicate;
          proxy.dataAssetID = proxy.allData.filter((x) =>
            x["fixed_asset_id"]?.includes(val)
          );
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
      handleDelete,
      handleTotalPage,
      loadDataAssetPageding,
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
      dataAssetID,
      loadDataAsset,
      loadDataCombotCategory,
      loadDataComboDepartment,
      handleClickAdd,
      valueMessageBox,
      handlClosePopup,
      disabledButton,
      confirmMessage,
      handleShowMess,
      deletaAsset,
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
@import "@/assets/scss/components/v_message_box.scss";
</style>
