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
                  label="Mã tài sản"
                  hasLabel
                  hasInput
                  :radius="false"
                  placeholder="Mã tài sản"
                ></ms-input>
              </div>
              <div class="form-group__right">
                <ms-input
                  label="Tên tài sản"
                  hasLabel
                  hasInput
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
                  valueField="fixed_asset_category_id"
                  displayField="fixed_asset_category_name"
                  rightIcon="ic-angle-downs"
                  placeholder="Chọn mã bộ phận sử dụng"
                ></ms-combobox>
              </div>
              <div class="form-group__right">
                <ms-input
                  label="Tên bộ phận sử dụng"
                  hasLabel
                  hasReadonly="true"
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
                  valueField="fixed_asset_category_id"
                  displayField="fixed_asset_category_name"
                  rightIcon="ic-angle-downs"
                  placeholder="Chọn mã loại tài sản"
                ></ms-combobox>
              </div>
              <div class="form-group__right">
                <ms-input
                  label="Tên loại tài sản"
                  hasReadonly="true"
                  hasLabel
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
                <el-date-picker
                  class="date-picker"
                  v-model="valueDate"
                  type="date"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                />
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
    const valueDate = ref("");
    const value3 = ref("");
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
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/MsPopupAsset.scss";
@import "./../../assets/scss/datepicker.scss";
</style>
