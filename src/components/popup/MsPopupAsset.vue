<template>
  <teleport to="body">
    <div class="model">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">
            {{ title }}
          </div>
          <ms-tooltip content="Hủy" placement="bottom" right="bottom">
            <div
              class="form-asset__close app-icon ic-close"
              @click="handlePopupClose"
            ></div>
          </ms-tooltip>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="form-group">
              <div class="form-group__left">
                <ms-input
                  label="Mã tài sản"
                  tabindex="101"
                  hasLabel
                  hasInput
                  :maxLength="15"
                  ref="inputAssetCode"
                  v-model="dataForm.fixed_asset_code"
                  :radius="false"
                  placeholder="Mã tài sản"
                  @blur="changeValueInput"
                  @focus="changeValueInput"
                  :disabledMessage="errorMessage.AssetCode && isSubmited"
                  :message="Resource.ErrorInput.AssetCode.VI"
                ></ms-input>
              </div>
              <div class="form-group__right">
                <ms-input
                  label="Tên tài sản"
                  tabindex="102"
                  hasLabel
                  :maxLength="255"
                  hasInput
                  v-model="dataForm.fixed_asset_name"
                  :valueField="ResourceTable.FieldAsset.fixedAssetName"
                  :radius="true"
                  placeholder="Nhập tên tài sản"
                  :disabledMessage="errorMessage.AssetName && isSubmited"
                  :message="Resource.ErrorInput.AssetName.VI"
                  @blur="onBlurInput"
                  @focus="changeValueInput"
                ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-drop-down
                  label="Mã bộ phận sử dụng"
                  tabindex="103"
                  ref="cb"
                  hasLabel
                  hasInput
                  :heightCb="47"
                  v-model="dataForm.department_id"
                  :valueField="ResourceTable.FieldDepartment.departmentId"
                  displayField="department_code"
                  rightIcon="ic-angle-downs"
                  :dataAll="DataDepartment.value"
                  :disabledMessage="errorMessage.DepartmentCode && isSubmited"
                  :message="Resource.ErrorInput.DepartmentCode.VI"
                  placeholder="Chọn mã bộ phận sử dụng"
                  @item-click="clickDataDepartment"
                ></ms-drop-down>
              </div>
              <div class="form-group__right">
                <ms-input
                  label="Tên bộ phận sử dụng"
                  hasLabel
                  v-model="dataForm.department_name"
                  :hasReadonly="true"
                  :disabled="true"
                  :radius="true"
                  @changeValue="changeValueInput"
                ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-drop-down
                  label="Mã loại tài sản"
                  ref="hu"
                  tabindex="104"
                  hasLabel
                  hasInput
                  :heightCb="47"
                  v-model="dataForm.fixed_asset_category_id"
                  :valueField="
                    ResourceTable.FieldAssetCategory.fixedAssetCategoryId
                  "
                  displayField="fixed_asset_category_code"
                  rightIcon="ic-angle-downs"
                  placeholder="Chọn mã loại tài sản"
                  :dataAll="DataAssetCategory.value"
                  @item-click="clickDataAssetCategory"
                  :disabledMessage="
                    errorMessage.AssetCategoryCode && isSubmited
                  "
                  :message="Resource.ErrorInput.AssetCategoryCode.VI"
                ></ms-drop-down>
              </div>
              <div class="form-group__right">
                <ms-input
                  label="Tên loại tài sản"
                  :hasReadonly="true"
                  hasLabel
                  v-model="dataForm.fixed_asset_category_name"
                  :disabled="true"
                  :radius="true"
                ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-input-number
                  label="Số lượng"
                  tabindex="105"
                  hasLabel
                  hasInput
                  v-model="dataForm.quantity"
                  :valueField="ResourceTable.FieldAsset.quantity"
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :radius="true"
                  @changeValue="changeValueInput"
                  :disabledMessage="errorMessage.Quantity && isSubmited"
                  :message="Resource.ErrorInput.Quantity.VI"
                >
                </ms-input-number>
              </div>
              <div class="form-group__right">
                <ms-input-number
                  label="Nguyên giá"
                  tabindex="106"
                  hasLabel
                  hasInput
                  v-model="dataForm.cost"
                  :radius="true"
                  :disabledMessage="errorMessage.Cost && isSubmited"
                  :message="Resource.ErrorInput.Cost.VI"
                >
                </ms-input-number>
                <ms-input-number
                  label="Số năm sử dụng"
                  tabindex="107"
                  hasLabel
                  hasInput
                  v-model="dataForm.life_time"
                  :valueField="ResourceTable.FieldAssetCategory.lifeTime"
                  :radius="true"
                  :disabledMessage="errorMessage.LifeTime && isSubmited"
                  :message="Resource.ErrorInput.LifeTime.VI"
                ></ms-input-number>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-input-number
                  label="Tỉ lệ hao mòn(%)"
                  tabindex="108"
                  hasLabel
                  hasInput
                  v-model="dataForm.depreciation_rate"
                  :valueField="
                    ResourceTable.FieldAssetCategory.depreciationRate
                  "
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :radius="true"
                  :disabledMessage="errorMessage.DepreciationRate && isSubmited"
                  :message="Resource.ErrorInput.DepreciationRate.VI"
                >
                </ms-input-number>
              </div>
              <div class="form-group__right">
                <ms-input-number
                  label="Giá trị hao mòn năm"
                  hasLabel
                  hasInput
                  typeValue="money"
                  v-model="dataForm.depreciation_year"
                  :valueField="ResourceTable.FieldAsset.depreciationYear"
                  :radius="true"
                  :disabledMessage="errorMessage.DepreciationYear && isSubmited"
                  :message="Resource.ErrorInput.DepreciationYear.VI"
                ></ms-input-number>
                <ms-input-number
                  label="Năm theo dõi"
                  hasLabel
                  v-model="dataForm.tracked_year"
                  valueField="tracked_year"
                  :radius="true"
                  :disabled="true"
                ></ms-input-number>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-input-date
                  label="Ngày mua"
                  hasLabel
                  hasInput
                  tabindex="109"
                  :id="ResourceTable.FieldAsset.purchaseDate"
                  v-model="dataForm.purchase_date"
                  :valueField="ResourceTable.FieldAsset.purchaseDate"
                  rightIcon="ic-date"
                  :radius="true"
                ></ms-input-date>
              </div>
              <div class="form-group__right">
                <div class="form-group__right__1">
                  <ms-input-date
                    label="Ngày bắt đầu sử dụng"
                    hasLabel
                    hasInput
                    tabindex="110"
                    :id="ResourceTable.FieldAsset.productionDate"
                    v-model="dataForm.production_date"
                    :valueField="ResourceTable.FieldAsset.productionDate"
                    rightIcon="ic-date"
                    topIcon="ic-angle_up"
                    bottomIcon="ic-angle_down"
                    :radius="true"
                  ></ms-input-date>
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
              <ms-button
                text="Hủy"
                tabindex="112"
                type="secodary"
                @click="handlePopupClose"
                radius
              >
              </ms-button>
            </ms-tooltip>
            <ms-tooltip content="Lưu và cất" placement="top" right="top">
              <ms-button
                text="Lưu"
                @click="saveData"
                tabindex="111"
                radius
              ></ms-button>
            </ms-tooltip>
          </div>
        </div>
      </div>
    </div>
  </teleport>

  <!-- Toast message thêm mới thành công -->
  <ms-message
    v-if="isShowMessage"
    textMessage="Thêm mới dữ liệu thành công"
    iconMessage="ic-success"
  ></ms-message>

  <!-- Dialog messagebox hủy bỏ khai báo -->
  <teleport to="body">
    <ms-message-box
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.AddAsset.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessCancelAdd"
    >
      <ms-button :text="Resource.TitleBtnDialog.Cancel.VI" radius></ms-button>
      <ms-button
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessCancelAdd = false"
        radius
      ></ms-button>
    </ms-message-box>
  </teleport>

  <!-- Dialog messagebox cập nhật -->
  <teleport to="body">
    <ms-message-box
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.SaveUpdate.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessUpdate"
    >
      <ms-button :text="Resource.TitleBtnDialog.Save.VI" radius></ms-button>
      <ms-button
        :text="Resource.TitleBtnDialog.NoSave.VI"
        type="abort"
        radius
      ></ms-button>
      <ms-button
        :text="Resource.TitleBtnDialog.Cancel.VI"
        type="secodary"
        radius
      ></ms-button>
    </ms-message-box>
  </teleport>

  <teleport to="body">
    <ms-message-box
      :disabledTop="true"
      title="Thông báo"
      icClose="ic-close"
      disabled
      disabledLeftMultiple
      :valueMultiple="titleErrValidate"
      :disabledMultiple="true"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isShowDialogDetail"
    >
      <ms-button
        :text="Resource.TitleBtnDialog.Close.VI"
        radius
        @click="handleCloseErrorMultiple"
      ></ms-button>
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
  nextTick,
} from "vue";
import {
  ssrRenderComponent as _ssrRenderComponent,
  ssrRenderAttrs as _ssrRenderAttrs,
} from "vue/server-renderer";
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
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
    dataPram: {
      default: {},
    },
  },
  methods: {
    close() {
      this.$parent.close();
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    //Show toastMessage
    window.popup = proxy;
    const isShowMessage = ref(false);

    const isShowPopup = ref(false);
    const isDialogMessCancelAdd = ref(false);

    const errorMessage = ref({});
    //Show dialog cập nhật
    const isDialogMessUpdate = ref(false);

    const titleErrValidate = ref([]);

    const isShowDialogDetail = ref(false);
    const isSubmited = ref(false);
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

    // Validate form
    const dataFormValidate = computed(() => {
      return {
        fixed_asset_code: { required },
        fixed_asset_name: { required },
        department_code: { required },
        fixed_asset_category_code: { required },
        quantity: { required },
        cost: { required },
        depreciation_rate: { required },
        purchase_date: { required },
        production_date: { required },
        life_time: { required },
        depreciation_year: { required },
      };
    });
    const v$ = useValidate(dataFormValidate, dataForm);

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

    const handleCloseErrorMultiple = () => {
      proxy.isShowDialogDetail = false;
      proxy.isSubmited = true;
      proxy.focusInput();
    };
    watch(
      () => dataForm.value,
      (newVal, old) => {},
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
    onMounted(() => {
      proxy.focusInput();
    });

    const focusInput = () => {
      proxy.$refs.inputAssetCode.$el.getElementsByTagName("input")[0].focus();
    };

    /**
     * Xét giá trị ban đầu cho ngày mua và ngày sử dụng
     *  @author NNNinh(21/10/2021)
     */
    const defaultValueDate = () => {
      nextTick(() => {
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
      });
    };

    onMounted(() => {
      try {
        /**
         * Kiểm tra giá trị mode là add hay cập nhật,nhân bản
         *  @author NNNinh(17/10/2021)
         */
        switch (proxy.formModel.mode) {
          //Kiểm tra giá trị mode là cập nhật
          case Enum.Mode.Update:
            proxy.title = Resource.TitleFormPopup.FormUpdateAsset.VI;

            // Lấy dữ liệu tài sản theo id tài sản
            proxy.loadDataAssetID();
            proxy.setValueDateYear();
            proxy.dataForm.Mode = 2;
            break;

          //Kiểm tra giá trị mode là thêm
          case Enum.Mode.Add:
            proxy.title = Resource.TitleFormPopup.FormAddAsset.VI;
            // Lấy mã tài sản tự tăng
            // let result = await assetAPI.get("AssetGetNextCode", {});
            // proxy.dataForm.fixed_asset_code =
            //   result?.Data && result?.Data[0].fixed_asset_code;
            proxy.defaultValueDate();
            proxy.getAssetNextCode();
            proxy.setValueDateYear();
            proxy.dataForm.Mode = 1;
            break;

          //Kiểm tra giá trị mode là nhân bản
          case Enum.Mode.Duplicate:
            proxy.title = Resource.TitleFormPopup.FormDuplicateAsset.VI;
            proxy.dataForm.Mode = 3;
            proxy.loadDataAssetID();
            proxy.getAssetNextCode();
            proxy.setValueDateYear();
            break;

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
      if (proxy.dataForm.depreciation_rate > 100)
        proxy.dataForm.depreciation_rate = 100;
    }

    // Xét giá trị năm theo dõi mặc định là năm hiện tại
    function setValueDateYear() {
      proxy.dataForm.tracked_year = new Date().getFullYear();
    }

    /**
     * Xử lý sự kiện click mã bộ phận câp nhật lại tên bộ phận cho input
     *  @author NNNinh(15/10/2021)
     */
    const clickDataDepartment = (item) => {
      proxy.dataForm.department_name = item.department_name;
      proxy.dataForm.department_code = item.department_code;
    };
    const onBlurInput = (isValue, valueField, e) => {
      switch (valueField) {
        case "fixed_asset_name": {
          if (isValue != "") {
            proxy.errorMessage.AssetName = false;
            proxy.dataForm.department_name = isValue;
          } else {
            proxy.errorMessage.AssetName = true;
          }
          break;
        }
        case "fixed_asset_code": {
          if (isValue != "") {
            proxy.errorMessage.AssetCode = false;
            proxy.dataForm.fixed_asset_code = isValue;
          } else {
            proxy.errorMessage.AssetCode = true;
          }

          break;
        }

        default: {
          break;
        }
      }
    };

    /**
     * Xử lý cập nhật lại dữ liệu dataForm
     *  @pram {isValue,valueField} - valueField: Trường dữ liệu, isValue: giá trị
     *  @author NNNinh(15/10/2021)
     */
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
     * Xử lý sự kiện click mã loại tài sản câp nhật lại tên tài sản cho input
     *  @author NNNinh(16/10/2021)
     */
    const clickDataAssetCategory = (item) => {
      proxy.dataForm.fixed_asset_category_name = item.fixed_asset_category_name;
      proxy.dataForm.life_time = item.life_time;
      proxy.dataForm.depreciation_rate = item.depreciation_rate
        ? item.depreciation_rate * 100
        : null;
      proxy.dataForm.fixed_asset_category_code = item.fixed_asset_category_code;
    };

    const validateData = () => {
      proxy.v$.$validate();
      if (proxy.v$.$error) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        if (proxy.dataForm.fixed_asset_code == "") {
          proxy.titleErrValidate.push(Resource.ErrorValidate.AssetCode.VI);
          proxy.errorMessage.AssetCode = true;
        }
        if (proxy.dataForm.fixed_asset_name == "") {
          proxy.titleErrValidate.push(Resource.ErrorValidate.AssetName.VI);
          proxy.errorMessage.AssetName = true;
        }

        if (proxy.dataForm.department_code == "") {
          proxy.titleErrValidate.push(Resource.ErrorValidate.DepartmentCode.VI);
          proxy.errorMessage.DepartmentCode = true;
        }

        if (proxy.dataForm.fixed_asset_category_code == "") {
          proxy.titleErrValidate.push(
            Resource.ErrorValidate.AssetCategoryCode.VI
          );
          proxy.errorMessage.AssetCategoryCode = true;
        }
        if (proxy.dataForm.quantity == 0) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.Quantity.VI);
          proxy.errorMessage.Quantity = true;
        }
        if (proxy.dataForm.cost == 0) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.Cost.VI);
          proxy.errorMessage.Cost = true;
        }
        if (proxy.dataForm.life_time == 0) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.LifeTime.VI);
          proxy.errorMessage.LifeTime = true;
        }
        if (proxy.dataForm.depreciation_year == null) {
          proxy.titleErrValidate.push(
            Resource.ErrorValidate.DepreciationYear.VI
          );
          proxy.errorMessage.DepreciationYear = true;
        }

        if (proxy.dataForm.depreciation_rate == 0) {
          proxy.titleErrValidate.push(
            Resource.ErrorValidate.DepreciationRate.VI
          );
          proxy.errorMessage.DepreciationRate = true;
        }

        if (proxy.dataForm.purchase_date == "") {
          proxy.titleErrValidate.push(Resource.ErrorValidate.PurchaseDate.VI);
        }
        if (proxy.dataForm.production_date == null) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.ProductionDate.VI);
        }
        return false;
      } else if (proxy.dataForm.depreciation_year > proxy.dataForm.cost) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push(
          "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá"
        );

        return false;
      } else if (
        proxy.dataForm.depreciation_rate !=
        parseFloat(100 / proxy.dataForm.life_time).toFixed(2)
      ) {
        console.log(parseFloat(100 / proxy.dataForm.life_time).toFixed(2));
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push("Tỉ lệ hao mòn phải bằng 1/Số năm sử dụng");
        return false;
      } else {
        proxy.errorMessage = {};
        return true;
      }
    };

    const saveData = () => {
      try {
        if (proxy.validateData() == false) {
          proxy.isShowDialogDetail = true;
        } else {
          switch (proxy.formModel.mode) {
            //Kiểm tra giá trị mode là cập nhật
            case Enum.Mode.Update: {
              proxy.isDialogMessUpdate = true;

              break;
            }
            //Kiểm tra giá trị mode là thêm hay nhân bản
            case (Enum.Mode.Add, Enum.Mode.Duplicate): {
              proxy.isShowMessage = true;
              break;
            }

            default:
              break;
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    const handlePopupClose = () => {
      let closes = proxy.validateData();
      if (closes == true) {
        proxy.isDialogMessCancelAdd = true;
      } else {
        emit("closePopup", proxy.isShowPopup);
      }
    };

    return {
      styles,
      title,
      isShowPopup,
      isShowMessage,
      titleErrValidate,
      isDialogMessCancelAdd,
      isDialogMessUpdate,
      Resource,
      ResourceTable,
      dataForm,
      DataAssetCategory,
      DataDepartment,
      isShowDialogDetail,
      loadDataCategory,
      loadDataDepartment,
      clickDataDepartment,
      focusInput,
      clickDataAssetCategory,
      setValueDateYear,
      defaultValueDate,
      changeValueInput,
      updateValDepYear,
      loadDataAssetID,
      getAssetNextCode,
      saveData,
      handlePopupClose,
      errorMessage,
      validateData,
      onBlurInput,
      dataFormValidate,
      handleCloseErrorMultiple,
      isSubmited,
      v$,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/MsPopupAsset.scss";
@import "./../../assets/scss/datepicker.scss";
</style>
