<template>
  <teleport to="body">
    <div class="model">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">Sửa tài sản Xe Toyota</div>
          <v-tooltip content="Hủy" placement="bottom" right="bottom">
            <div ref="btnClose" class="form-asset__close app-icon ic-close"></div>
          </v-tooltip>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="form_group">
              <v-input
                label="Bộ phận sử dụng"
                tabindex="101"
                hasLabel
                :maxLength="50"
                :radius="false"
                placeholder="Mã tài sản"
                :disabled="true"
              ></v-input>
            </div>
            <div class="box__title">Nguyên giá</div>
            <div class="box__select-form">
              <p>Nguồn hình thành</p>
              <p>Giá trị</p>
            </div>
            <div class="box_select-item">
              <div class="dialog-update-asset">
                <div
                  v-for="(source, index) in sources"
                  :key="source.id"
                  class="source-item"
                >
                  <div class="form-group">
                    <div class="dialog-item select--cb">
                      <v-drop-down
                        ref="hu"
                        tabindex="104"
                        :heightCb="-25"
                        :valueField="budget_id"
                        displayField="budget_name"
                        @blur="onBlurDropdown"
                        rightIcon="ic-angle-downs"
                        :columns="columns"
                        placeholder="Chọn ngân sách"
                        :dataAll="budget_options"
                      ></v-drop-down>
                    </div>
                    <div class="dialog-item price__cb">
                      <v-number
                        tabindex="106"
                        leftIcon
                        :disabledRight="false"
                        :radius="true"
                        @blur="onBlurInputNumber"
                        :options="{
                          locale: 'vi-VN',
                          currency: 'EUR',
                          currencyDisplay: 'hidden',
                          valueRange: { min: 0 },
                          hideGroupingSeparatorOnFocus: false,
                        }"
                      >
                      </v-number>
                    </div>
                  </div>
                  <div class="form_group-btn">
                    <div class="position-relative mt-10 mb-20 box-add">
                      <v-tooltip content="Thêm" placement="bottom" right="bottom">
                        <div
                          @click="addField(sources)"
                          class="button-no-border app-icon ic-add-border"
                        ></div>
                      </v-tooltip>
                    </div>
                    <div class="position-relative mt-10 mb-20 box-minus">
                      <v-tooltip content="Xóa" placement="bottom" right="bottom">
                        <div
                          @click="removeField(index, sources)"
                          class="button-no-border app-icon ic-minus-border"
                        ></div>
                      </v-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form_group--bottom">
              <div class="box_sum">
                <v-input
                  tabindex="101"
                  :maxLength="50"
                  :radius="false"
                  placeholder="Tổng"
                  :disabled="true"
                ></v-input>
              </div>
              <div class="box_sum-price">
                <v-number
                  tabindex="106"
                  leftIcon
                  :disabledRight="false"
                  :radius="true"
                  @blur="onBlurInputNumber"
                  :disabled="true"
                  :options="{
                    locale: 'vi-VN',
                    currency: 'EUR',
                    currencyDisplay: 'hidden',
                    valueRange: { min: 0 },
                    hideGroupingSeparatorOnFocus: false,
                  }"
                >
                </v-number>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-popup">
          <div class="form-asset__footer">
            <!-- Buttom hủy
                @author NNNINH (22/11/2022) -->
            <v-tooltip content="Hủy" placement="top" right="top">
              <v-button
                text="Hủy"
                tabindex="112"
                type="secodary"
                ref="btnClosePopup"
                radius
              >
              </v-button>
            </v-tooltip>

            <!-- Buttom lưu dữ liệu
                @author NNNINH (22/11/2022) -->
            <v-tooltip content="Lưu và cất" placement="top" right="top">
              <v-button text="Lưu" tabindex="111" radius :disabled="false"></v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/view/voucher/VoucherUpdatePopup.scss";
@import "@/assets/scss/components/v_combobox.scss";
</style>
<script setup>
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import VButton from "@/components/button/VButton.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VInput from "@/components/input/VInput.vue";
import vNumber from "@/components/number/VInputMoney.vue";
import VDropDown from "@/components/dropdown/VDropDown.vue";

const sourceCost = ref([]);
const sources = ref([
  {
    budget_id: "",
    budget_name: "",
    cost: 0,
  },
]);

const addField = (list) => {
  list.push({ budget_id: "", budget_name: "", cost: null });
};

const removeField = (index, list) => {
  if (sources.value.length == 1) {
    return;
  } else {
    list.splice(index, 1);
    sourceCost.value.splice(index, 1);
  }
};
const columns = ref([
  {
    field: "budget_id",
    titleField: "Mã",
  },
  {
    field: "budget_name",
    titleField: "Tên ngân sách",
  },
]);

const budget_options = ref([
  {
    budget_id: "0",
    budget_name: "Ngân sách tỉnh",
  },
  {
    budget_id: "1",
    budget_name: "Ngân sách huyện",
  },
]);

const props = defineProps({
  // Xác định là form thêm, sửa, xóa
  formModel: {
    default: {},
  },
  // Đối tượng để lấy dữ liệu truyền từ table sang
  allData: {
    default: {},
  },
  // Đối tượng lấy dữ liệu và cập nhật lại dữ liệu
  modelValue: {
    default: {},
  },
  dataAll: {
    default: [],
  },
});
</script>
