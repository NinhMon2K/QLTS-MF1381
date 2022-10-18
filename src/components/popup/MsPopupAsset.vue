<template>
  <teleport to="body">
    <div class="model">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">{{ title }}</div>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="form-group">
              <div class="form-group__left">
                <ms-input
                  ref="ab"
                  label="Mã tài sản"
                  hasLabel
                  hasInput
                  v-model="dataForm.fixed_asset_code"
                  :radius="false"
                  placeholder="Mã tài sản"
                ></ms-input>
              </div>
              <div class="form-group__right">
                <ms-input
                  label="Tên tài sản"
                  hasLabel
                  hasInput
                  v-model="dataForm.fixed_asset_name"
                  :radius="true"
                  placeholder="Nhập tên tài sản"
                ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-drop-down
                  label="Mã bộ phận sử dụng"
                  ref="cb"
                  hasLabel
                  hasInput
                  :heightCb="32"
                  v-model="dataForm.department_id"
                  valueField="department_id"
                  displayField="department_code"
                  rightIcon="ic-angle-downs"
                  :dataAll="DataDepartment.value"
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
                ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-drop-down
                  label="Mã loại tài sản"
                  hasLabel
                  hasInput
                  :heightCb="32"
                  v-model="dataForm.fixed_asset_category_id"
                  valueField="fixed_asset_category_id"
                  displayField="fixed_asset_category_code"
                  rightIcon="ic-angle-downs"
                  placeholder="Chọn mã loại tài sản"
                  :dataAll="DataAssetCategory.value"
                  @item-click="clickDataAssetCategory"
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
                  hasLabel
                  hasInput
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :radius="true"
                ></ms-input-number>
              </div>
              <div class="form-group__right">
                <ms-input-number
                  label="Nguyên giá"
                  hasLabel
                  hasInput
                  :radius="true"
                ></ms-input-number>
                <ms-input-number
                  label="Số năm sử dụng"
                  hasLabel
                  hasInput
                  :radius="true"
                ></ms-input-number>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-input-number
                  label="Tỉ lệ hao mòn(%)"
                  hasLabel
                  hasInput
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :radius="true"
                ></ms-input-number>
              </div>
              <div class="form-group__right">
                <ms-input-number
                  label="Giá trị hao mòn năm"
                  hasLabel
                  hasInput
                  :radius="true"
                ></ms-input-number>
                <ms-input-number
                  label="Năm theo dõi"
                  hasLabel
                  hasInput
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
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  computed,
  resolveComponent as _resolveComponent,
  mergeProps as _mergeProps,
  onBeforeMount,
} from "vue";
import {
  ssrRenderComponent as _ssrRenderComponent,
  ssrRenderAttrs as _ssrRenderAttrs,
} from "vue/server-renderer";
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
    const dataForm = ref({});

    const DataAssetCategory = ref([]);
    const DataDepartment = ref([]);

    const title = ref("");

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
    onBeforeMount(async () => {
      try {
        console.log(proxy.formModel.mode);
        switch (proxy.formModel.mode) {
          case Enum.Mode.Update: {
            proxy.title = Resource.TitleFormPopup.FormUpdateAsset.VI;
            let result = await assetAPI.get("AssetSelectID", {
              fixed_asset_id: proxy.formModel.fixed_asset_id,
            });
            proxy.dataForm = result?.Data && result?.Data[0];
            console.log(proxy.dataForm);
            break;
          }
          case Enum.Mode.Add: {
            proxy.title = Resource.TitleFormPopup.FormUpdateAsset.VI;

            break;
          }
          case Enum.Mode.Duplicate: {
            proxy.title = Resource.TitleFormPopup.FormDuplicateAsset.VI;

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
      proxy.loadDataCombotCategory();
      proxy.loadDataComboDepartment();
    });

    //  /**
    //      * Chọn ngày mặc định là ngày hiện tại nếu không có sẵn ngày
    //      */
    //      defaultValue() {
    //         if (this.asset.purchase_date == null) this.asset.purchase_date = new Date()
    //         if (this.asset.production_date == null) this.asset.production_date = new Date()
    //         if (this.asset.tracked_year == null) this.asset.tracked_year = new Date().getFullYear()
    //         if (this.asset.cost == null) this.asset.cost = 0
    //     }

    const valueDate = ref("");
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
        arr.push("min-height: " + props.configStyle.height + "px;");
      }
      return arr.join("; ");
    });

    const clickDataDepartment = (item) => {
      proxy.dataForm.department_name = item.department_name;
    };
    const clickDataAssetCategory = (item) => {
      proxy.dataForm.fixed_asset_category_name = item.fixed_asset_category_name;
    };

    return {
      styles,
      title,
      isShowMessage,
      isDialogMessCancelAdd,
      isDialogMessUpdate,
      valueDate,
      Resource,
      ResourceTable,
      dataForm,
      DataAssetCategory,
      DataDepartment,
      loadDataCombotCategory,
      loadDataComboDepartment,
      clickDataDepartment,
      clickDataAssetCategory,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/MsPopupAsset.scss";
@import "./../../assets/scss/datepicker.scss";
</style>
