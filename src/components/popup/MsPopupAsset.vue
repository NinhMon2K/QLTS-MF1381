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
                <ms-combobox
                  label="Mã bộ phận sử dụng"
                  hasLabel
                  hasInput
                  :heightCb="32"
                  v-model="dataForm.fixed_asset_name"
                  valueField="department_id"
                  displayField="department_code"
                  rightIcon="ic-angle-downs"
                  :dataCombo="DataDepartment.value"
                  placeholder="Chọn mã bộ phận sử dụng"
                ></ms-combobox>
              </div>
              <div class="form-group__right">
                <ms-input
                  label="Tên bộ phận sử dụng"
                  hasLabel
                  :hasReadonly="true"
                  :disabled="true"
                  :radius="true"
                ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <ms-combobox
                  label="Mã loại tài sản"
                  hasLabel
                  hasInput
                  :heightCb="32"
                  valueField="fixed_asset_category_id"
                  displayField="fixed_asset_category_code"
                  rightIcon="ic-angle-downs"
                  placeholder="Chọn mã loại tài sản"
                  :dataCombo="DataAssetCategory.value"
                ></ms-combobox>
              </div>
              <div class="form-group__right">
                <ms-input
                  label="Tên loại tài sản"
                  :hasReadonly="true"
                  hasLabel
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
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :radius="true"
                ></ms-input-date>
              </div>
              <div class="form-group__right">
                <ms-input-date
                  label="Ngày bắt đầu sử dụng"
                  hasLabel
                  hasInput
                  rightIcon="ic-date"
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :radius="true"
                ></ms-input-date>
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
import MsCombobox from "@/components/combobox/MsCombobox.vue";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
import ResourceTable from "@/resource/dictionary/resourceTable.js";
import Enum from "@/resource/dictionary/enum.js";
import assetAPI from "@/apis/api/assetAPI.js";
export default {
  name: "MsPopupAsset",
  components: {
    MsButton,
    MsInput,
    MsCombobox,
    MsInputNumber,
    MsInputDate,
    MsTooltip,
  },
  props: {
    configStyle: {
      default: {},
    },
    statePopup: {
      default: false,
    },
    titlePopup: {
      default: null,
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
    const dataForm = ref({});

    const DataAssetCategory = ref([]);
    const DataDepartment = ref([]);
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
        if (proxy.formModel.mode == Enum.Mode.Update) {
          let result = await assetAPI.get("AssetSelectID", {
            fixed_asset_id: proxy.formModel.fixed_asset_id,
          });
          proxy.dataForm = result?.Data && result?.Data[0];
          console.log(proxy.dataForm.modified_by);
        } else if (proxy.formModel.mode == Enum.Mode.Add) {
          console.log("Them");
        } else {
          console.log("Delete");
        }
      } catch (error) {
        console.log(error);
      }
    });
    onMounted(() => {
      proxy.loadDataCombotCategory();
      proxy.loadDataComboDepartment();
    });

    const valueDate = ref("");
    const showTitle = () => {
      let rs = props.titlePopup ? props.titlePopup : "";
      return rs;
    };

    const title = computed(() => showTitle());
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

    return {
      styles,
      title,
      valueDate,
      ResourceTable,
      dataForm,
      DataAssetCategory,
      DataDepartment,
      loadDataCombotCategory,
      loadDataComboDepartment,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/MsPopupAsset.scss";
@import "./../../assets/scss/datepicker.scss";
</style>
