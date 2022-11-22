<template>
  <div class="toast-wrapper">
    <div class="toast">
      <div class="box">
        <div class="box_icon">
          <div class="icon_success"></div>
        </div>
      </div>
      <span v-if="deleteSuccess">{{ Enums.txtDeleteSuccess }}</span>
      <span v-else>{{ Enums.txtSaveSuccess }}</span>
    </div>
  </div>
</template>

<script>
import { Enums } from "@/assets/Constants";

export default {
  setup() {
    return { Enums };
  },
  props: {
    deleteSuccess: Boolean,
  },
};
</script>

<style lang="css" scoped>
.box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #baeed4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.box_icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #1ac871;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon_success {
  background: url("../assets/qlts-icon.svg") no-repeat -71px -512px;
  width: 11px;
  height: 8px;
  scale: 1.5;
}
.toast-wrapper {
  position: fixed;
  width: 100%;
  top: 20px;
  z-index: 100;
}
.toast {
  padding: 15px;
  color: black;
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  width: 360px;
  position: absolute;
  right: 70px;
  display: flex;
  align-items: center;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
.toast-leave-active {
  transition: all 0.3s ease;
}
</style>