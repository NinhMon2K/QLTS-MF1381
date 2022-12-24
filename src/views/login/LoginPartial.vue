<template>
  <div class="page-view login-partial">
    <div class="login-page">
      <div class="login-container">
        <div class="login-content">
          <div class="content--left"></div>
          <div class="content--right">
            <div class="login_partial--top">
              <div class="login-logo"></div>
              <div class="login-title">Đăng nhập để làm việc với <b>MISA QLTS</b></div>
              <div class="login-form">
                <div class="box_username">
                  <el-input
                    v-model="user.username"
                    ref="username"
                    placeholder="Username, email hoặc số điện thoại"
                    class="mt-20"
                  />
                </div>
                <div class="box_password">
                  <el-input
                    v-model="user.password"
                    ref="password"
                    placeholder="Mật khẩu"
                    show-password
                  />
                </div>
              </div>
            </div>
            <div class="login_partial--bottom">
              <v-tooltip content="Đăng nhập" placement="bottom" right="bottom">
                <!-- buttom thêm mới -->
                <v-button
                id="btn_login"
                  text="Đăng nhập"  
                  :radius="true" 
                  :tabindex="'4'"
                  buttonText="login-text"
                >
                </v-button>
              </v-tooltip>
              <div class="box__forgot-password"><a class="forgot-password" href="">Quên mật khẩu</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/view/login/LoginPartial";
</style>
<script setup>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import VButton from "@/components/button/VButton.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
const user = ref({
  username: "",
  password: "",
});
</script>
