<template>
  <teleport to="body">
    <div class="model">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">{{ title }}</div>
          <div class="form-asset__close app-icon ic-close"></div>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="form-group">
              <div class="form-group__left">
                <ms-input ref="ab" label="Mã tài sản" tabindex="101"  hasLabel hasInput v-model="dataForm.fixed_asset_code"
                  :radius="false" placeholder="Mã tài sản"></ms-input>
              </div>
              <div class="form-group__right">
                <ms-input label="Tên tài sản" tabindex="102" hasLabel hasInput v-model="dataForm.fixed_asset_name"
                  valueField="fixed_asset_name" :radius="true" placeholder="Nhập tên tài sản"></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-drop-down label="Mã bộ phận sử dụng" tabindex="103" ref="cb" hasLabel hasInput :heightCb="47"
                  v-model="dataForm.department_id" valueField="department_id" displayField="department_code"
                  rightIcon="ic-angle-downs" :dataAll="DataDepartment.value" placeholder="Chọn mã bộ phận sử dụng"
                  @item-click="clickDataDepartment"></ms-drop-down>
              </div>
              <div class="form-group__right">
                <ms-input label="Tên bộ phận sử dụng" hasLabel v-model="dataForm.department_name" :hasReadonly="true"
                  :disabled="true" :radius="true" @changeValue="changeValueInput"></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-drop-down label="Mã loại tài sản" ref="hu" tabindex="104" hasLabel hasInput :heightCb="47"
                  v-model="dataForm.fixed_asset_category_id" valueField="fixed_asset_category_id"
                  displayField="fixed_asset_category_code" rightIcon="ic-angle-downs" placeholder="Chọn mã loại tài sản"
                  :dataAll="DataAssetCategory.value" @item-click="clickDataAssetCategory"></ms-drop-down>
              </div>
              <div class="form-group__right">
                <ms-input label="Tên loại tài sản" :hasReadonly="true" hasLabel
                  v-model="dataForm.fixed_asset_category_name" :disabled="true" :radius="true"></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-input-number label="Số lượng" tabindex="105" hasLabel hasInput v-model="dataForm.quantity" valueField="quantity"
                  topIcon="ic-angle_up" bottomIcon="ic-angle_down" :radius="true" @changeValue="changeValueInput">
                </ms-input-number>
              </div>
              <div class="form-group__right">
                <ms-input-number label="Nguyên giá" tabindex="106" hasLabel hasInput v-model="dataForm.cost" :radius="true">
                </ms-input-number>
                <ms-input-number label="Số năm sử dụng" tabindex="107" hasLabel hasInput v-model="dataForm.life_time"
                  valueField="life_time" :radius="true"></ms-input-number>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-input-number label="Tỉ lệ hao mòn(%)" tabindex="108" hasLabel hasInput v-model="dataForm.depreciation_rate"
                  valueField="depreciation_rate" topIcon="ic-angle_up" bottomIcon="ic-angle_down" :radius="true">
                </ms-input-number>
              </div>
              <div class="form-group__right">
                <ms-input-number label="Giá trị hao mòn năm" tabindex="109" hasLabel hasInput typeValue="money"
                  v-model="dataForm.depreciation_year" valueField="depreciation_year" :radius="true"></ms-input-number>
                <ms-input-number label="Năm theo dõi" hasLabel v-model="dataForm.tracked_year" valueField="tracked_year"
                  :radius="true" :disabled="true"></ms-input-number>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-input-date label="Ngày mua" hasLabel hasInput v-model="dataForm.purchase_date"
                  valueField="purchase_date" rightIcon="ic-date" :radius="true"></ms-input-date>
              </div>
              <div class="form-group__right">
                <div class="form-group__right__1">
                  <ms-input-date label="Ngày bắt đầu sử dụng" hasLabel hasInput v-model="dataForm.production_date"
                    valueField="production_date" rightIcon="ic-date" topIcon="ic-angle_up" bottomIcon="ic-angle_down"
                    :radius="true"></ms-input-date>
                </div>
                <div class="right-center"></div>
                <div class="form-group__right__2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-popup">
          <div class="form-asset__footer">
            <ms-tooltip content="Hủy" placement="top" right="top">
              <ms-button @click="close" text="Hủy" type="secodary" radius>
              </ms-button>
            </ms-tooltip>
            <ms-tooltip content="Lưu và cất" placement="top" right="top">
              <ms-button text="Lưu" radius></ms-button>
            </ms-tooltip>
          </div>
        </div>
      </div>
    </div>
  </teleport>

  <!-- Toast message thêm mới thành công -->
  <ms-message v-if="isShowMessage" textMessage="Thêm mới dữ liệu thành công" iconMessage="ic-success"></ms-message>

  <!-- Dialog messagebox hủy bỏ khai báo -->
  <teleport to="body">
    <ms-message-box leftIcon="ic-warning" :textMessageBox="Resource.TitleDialogMessage.AddAsset.VI"
      :disabledValueLeft="false" :disabledValueRight="false" v-if="isDialogMessCancelAdd">
      <ms-button :text="Resource.TitleBtnDialog.Cancel.VI" radius></ms-button>
      <ms-button :text="Resource.TitleBtnDialog.NoCancel.VI" type="secodary" radius></ms-button>
    </ms-message-box>
  </teleport>

  <!-- Dialog messagebox cập nhật -->
  <teleport to="body">
    <ms-message-box leftIcon="ic-warning" :textMessageBox="Resource.TitleDialogMessage.SaveUpdate.VI"
      :disabledValueLeft="false" :disabledValueRight="false" v-if="isDialogMessUpdate">
      <ms-button :text="Resource.TitleBtnDialog.Save.VI" radius></ms-button>
      <ms-button :text="Resource.TitleBtnDialog.NoSave.VI" type="abort" radius></ms-button>
      <ms-button :text="Resource.TitleBtnDialog.Cancel.VI" type="secodary" radius></ms-button>
    </ms-message-box>
  </teleport>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  computed,
  onUnmounted,
  resolveComponent as _resolveComponent,
  mergeProps as _mergeProps,
  onBeforeMount,
  onUpdated,
} from "vue";
import {
  ssrRenderComponent as _ssrRenderComponent,
  ssrRenderAttrs as _ssrRenderAttrs,
} from "vue/server-renderer";
import moment from "moment";
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";
import MsInputDate from "@/components/date/MsInputDate.vue";
import MsInputNumber from "@/components/number/MsInputNumber.vue";
import MsDropDown from "@/components/dropdown/MsDropDown.vue";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
import MsMessage from "@/components/toast/MSToastMessage.vue";
import MsMessageBox from "@/components/toast/MsMessageBox.vue";
import Resource from "@/resource/dictionary/resource.js";
import ResourceTable from "@/resource/dictionary/resourceTable.js";
import Enum from "@/resource/dictionary/enum.js";
import assetAPI from "@/apis/api/assetAPI.js";
import { hide } from "@floating-ui/core";
export default {
  name: "MsPopupAsset",
  components: {
    MsButton,
    MsInput,
    MsDropDown,
    MsInputNumber,
    MsInputDate,
    MsTooltip,
    MsMessage,
    MsMessageBox,
  },
  props: {
    configStyle: {
      default: {},
    },
    statePopup: {
      default: false,
    },
    formModel: {
      default: {},
    },
    allData: {
      default: [],
    },
  },
  methods: {
    close() {
      this.$parent.close();
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    // function show() {
    //   props.statePopup = true;
    // }

    //Show toastMessage
    window.u = proxy;
    const isShowMessage = ref(false);

    const isDialogMessCancelAdd = ref(false);

    //Show dialog cập nhật
    const isDialogMessUpdate = ref(false);
    const dataForm = ref({
      Mode: 0,
      fixed_asset_id: "",
      fixed_asset_code: "",
      fixed_asset_name: "",
      organization_id: "",
      organization_code: "",
      organization_name: "",
      department_id: "",
      department_code: "",
      department_name: "",
      fixed_asset_category_id: "",
      fixed_asset_category_code: "",
      fixed_asset_category_name: "",
      quantity: 1,
      cost: 0,
      depreciation_rate: 0,
      purchase_date: "",
      production_year: "",
      production_date: "",
      tracked_year: 0,
      life_time: 0,
      active: "",
      depreciation_year: "",
      created_by: "",
      created_date: "",
      modified_by: "",
      modified_date: "",
    });

    const DataAssetCategory = ref([]);
    const DataDepartment = ref([]);

    const title = ref("");

    /**
     * Lấy dữ liệu toàn bộ loại tài sản
     *  @author NNNinh(20/10/2021)
     */
    async function loadDataCategory() {
      try {
        let res = await assetAPI.get("CategoryGetAll", {});
        proxy.DataAssetCategory.value = res?.Data;
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Lấy dữ liệu toàn bộ loại bộ phận
     *  @author NNNinh(18/10/2021)
     */
    async function loadDataDepartment() {
      try {
        let res = await assetAPI.get("DepartmentGetAll", {});
        proxy.DataDepartment.value = res?.Data;
      } catch (error) {
        console.log(error);
      }
    }

    watch(
      () => dataForm.value,
      (newVal, old) => { },
      () => proxy.dataForm.depreciation_rate,
      (newVal, old) => {
        proxy.updateValDepYear();
      },
      () => proxy.dataForm.cost,
      (newVal, old) => {
        proxy.updateValDepYear();
      }
    );

    /**
     * Tự động cập nhật giá trị hao mòn năm
     *  @author NNNinh(21/10/2021)
     */
    onUpdated(() => {
      proxy.updateValDepYear();
    });

    /**
     * Xét giá trị ban đầu cho ngày mua và ngày sử dụng
     *  @author NNNinh(21/10/2021)
     */
    function defaultValueDate() {
      // xét giá trị ban đầu cho ngày mua
      if (proxy.dataForm.purchase_date == "") {
        proxy.dataForm.purchase_date =
          new Date().toLocaleDateString() + new Date().toString();
      }
      // xét giá trị ban đầu cho ngày sử dụng
      if (proxy.dataForm.production_date == "") {
        proxy.dataForm.production_date =
          new Date().toLocaleDateString() + new Date().toString();
      }
    }
    onBeforeMount(async () => {
      try {
        /**
         * Kiểm tra giá trị mode là add hay cập nhật,nhân bản
         *  @author NNNinh(17/10/2021)
         */
        switch (proxy.formModel.mode) {
          //Kiểm tra giá trị mode là cập nhật
          case Enum.Mode.Update: {
            proxy.title = Resource.TitleFormPopup.FormUpdateAsset.VI;

            // Lấy dữ liệu tài sản theo id tài sản
            proxy.loadDataAssetID();      
            proxy.getAssetNextCode();
            proxy.dataForm.Mode = 2;
            proxy.setValueDateYear();
            break;
          }
          //Kiểm tra giá trị mode là thêm
          case Enum.Mode.Add: {
            proxy.title = Resource.TitleFormPopup.FormAddAsset.VI;
            // Lấy mã tài sản tự tăng
            let result = await assetAPI.get("AssetGetNextCode", {});
        proxy.dataForm.fixed_asset_code =
          result?.Data && result?.Data[0].fixed_asset_code;
            proxy.defaultValueDate();
            proxy.dataForm.Mode = 1;
            proxy.setValueDateYear();        
            break;
          }
          //Kiểm tra giá trị mode là nhân bản
          case Enum.Mode.Duplicate: {
            proxy.title = Resource.TitleFormPopup.FormDuplicateAsset.VI;
            proxy.dataForm.Mode = 3;
            proxy.loadDataAssetID();      
            proxy.getAssetNextCode();
            proxy.setValueDateYear();
            break;
          }
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    });
    onMounted(() => {
      proxy.loadDataCategory();
      proxy.loadDataDepartment();
    });

     /**
     * Lấy dữ liệu tài sản thoe id tài sản
     * @pram {fixed_asset_id} Id tài sản
     *  @author NNNinh(21/10/2021)
     */
    async function loadDataAssetID() {
      try {
        let result = await assetAPI.get("AssetSelectID", {
          fixed_asset_id: proxy.formModel.fixed_asset_id,
        });
        proxy.dataForm = result?.Data && result?.Data[0];
      } catch (error) {
        console.log(error);
      }
    }

     /**
     * Lấy mã tài sản tự động tăng
     *  @author NNNinh(21/10/2021)
     */
    async function getAssetNextCode() {
      try {
        let result = await assetAPI.get("AssetGetNextCode", {});
        proxy.dataForm.fixed_asset_code =
          result?.Data && result?.Data[0].fixed_asset_code;
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Xét style cho dropdown
     *  @author NNNinh(17/10/2021)
     */
    const styles = computed(() => {
      let arr = [];
      if (props.configStyle.width) {
        arr.push("width: " + props.configStyle.width + "px;");
        arr.push("min-width: " + props.configStyle.width + "px;");
      }
      if (props.configStyle.minWidth) {
        arr.push("min-width: " + props.configStyle.minWidth + "px;");
      }
      if (props.configStyle.height) {
        arr.push("height: " + props.configStyle.height + "px;");
        loadDataDepartment;
        arr.push("min-height: " + props.configStyle.height + "px;");
      }
      return arr.join("; ");
    });

     /**
     * Cập nhật giá trị hao mòn năm
     *  @author NNNinh(21/10/2021)
     */
    function updateValDepYear() {
      proxy.dataForm.depreciation_year =
        (proxy.dataForm.depreciation_rate * proxy.dataForm.cost) / 100;
    }


     // Xét giá trị năm theo dõi mặc định là năm hiện tại
    function setValueDateYear() {
      proxy.dataForm.tracked_year = new Date().getFullYear();
    }

    /**
     * Xử lý sự kiện click mã loại sản câp nhật lại tên loại tài sản cho input và số năm sử dụng
     *  @author NNNinh(15/10/2021)
     */
    const clickDataDepartment = (item) => {
      proxy.dataForm.department_name = item.department_name;
    };
    const changeValueInput = (isValue, valueField) => {
      switch (valueField) {
        case "department_name": {
          proxy.dataForm.department_name = isValue;
          break;
        }
        case "quantity": {
          proxy.dataForm.quantity = isValue;
          break;
        }
        case "life_time": {
          proxy.dataForm.life_time = isValue;
          break;
        }
        case "depreciation_rate": {
          proxy.dataForm.depreciation_rate = isValue;
          break;
        }
        case "depreciation_year": {
          proxy.dataForm.depreciation_year = isValue;
          break;
        }
        case "tracked_year": {
          proxy.dataForm.tracked_year = isValue;
          break;
        }
        case "purchase_date": {
          proxy.dataForm.purchase_date = isValue;
          break;
        }
        case "production_date": {
          proxy.dataForm.production_date = isValue;
          break;
        }
        default: {
          break;
        }
      }
    };

    /**
     * Xử lý sự kiện click mã bộ phận câp nhật lại tên bộ phận cho input
     *  @author NNNinh(16/10/2021)
     */
    const clickDataAssetCategory = (item) => {
      proxy.dataForm.fixed_asset_category_name = item.fixed_asset_category_name;
      proxy.dataForm.life_time = item.life_time;
      proxy.dataForm.depreciation_rate = item.depreciation_rate;
    };

    return {
      styles,
      title,
      isShowMessage,
      isDialogMessCancelAdd,
      isDialogMessUpdate,
      Resource,
      ResourceTable,
      dataForm,
      DataAssetCategory,
      DataDepartment,
      loadDataCategory,
      loadDataDepartment,
      clickDataDepartment,
      clickDataAssetCategory,
      setValueDateYear,
      defaultValueDate,
      changeValueInput,
      updateValDepYear,
      loadDataAssetID,
      getAssetNextCode
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/MsPopupAsset.scss";
@import "./../../assets/scss/datepicker.scss";
</style>
