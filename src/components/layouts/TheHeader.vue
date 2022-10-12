<template>
  <div class="main-header">
    <div class="left-header">
      <span class="title-page">Danh sách tài sản</span>
    </div>
    <div class="right-header">
      <div class="organization-name header-item">Sở tài chính</div>
      <ms-input-year
        label="Năm"
        topIcon="ic-angle_up"
        bottomIcon="ic-angle_down"
      >
      </ms-input-year>
      <div class="tool-header">
        <div class="tool notification">
          <ms-tooltip content="Thông báo" placement="bottom">
            <div class="app-icon ic-notification"></div>
          </ms-tooltip>
        </div>
        <div class="tool tf-home">
          <ms-tooltip content="Lưới" placement="bottom">
            <div class="app-icon ic-view-grid"></div>
          </ms-tooltip>
        </div>
        <div class="tool help">
          <ms-tooltip content="Trợ giúp" placement="bottom">
            <div class="app-icon ic-question-message"></div>
          </ms-tooltip>
        </div>
      </div>
      <div class="user-header">
        <div class="c-2 avatar">
          <ms-tooltip content="Tài khoản" placement="bottom">
            <div class="app-icon ic-user"></div>
          </ms-tooltip>
        </div>
        <div class="c-2 more">
          <ms-tooltip content="Xuống" placement="bottom">
            <div class="app-icon ic-arow"></div>
          </ms-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MsInputYear from "@/components/input/MsInputYear.vue";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";
export default {
  name: "TheHeader",
  components: { MsInputYear, MsTooltip },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scope>
@import "@/assets/scss/layouts/TheHeader.scss";
</style>
