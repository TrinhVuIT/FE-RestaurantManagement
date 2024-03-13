<script setup lang="ts">
import { VForm } from "vuetify/components/VForm";
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png";
import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import LoginService from "@/services/AuthServices";
import { useToast } from "vue-toastification";
import { enc, AES } from "crypto-js";

const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);

const isPasswordVisible = ref(false);
const loading = ref(false);
const refVForm = ref<VForm>();
const username = ref("PhuongTrinh");
const password = ref("123@123");
const rememberMe = ref(false);
let cvsecretKey = ref("secretKey_cv");
const router = useRouter();
const toast = useToast();

const onSubmitClicked = async () => {
  loading.value = true;
  let param = {
    username: username.value,
    password: password.value,
  };
  const res = await LoginService.Login(param);
  
  if (res.success === true) {
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    if (rememberMe && rememberMe.value) {
      const dataRememberMe = {
        rememberme: rememberMe.value,
        password: password.value,
        username: username.value,
      };
      const encryptedPassword = AES.encrypt(
        dataRememberMe.password,
        cvsecretKey.value
      ).toString();
      dataRememberMe.password = encryptedPassword;
      localStorage.setItem("cvrememberme", JSON.stringify(dataRememberMe));
    } else {
      localStorage.removeItem("cvrememberme");
    }

    router.push({ path: "/admin/bieudopage" });
  } else {
    toast.error("Login unsuccessful. Please try again");
  }
  loading.value = false;
};

const onSubmit = async () => {
  await onSubmitClicked();
};
onMounted(() => {
  const dataRememberMe = JSON.parse(localStorage.getItem("cvrememberme")!);
  if (dataRememberMe && dataRememberMe?.username) {
    username.value = dataRememberMe?.username;
  }
  if (dataRememberMe && dataRememberMe.password) {
    const decryptedPassword = AES.decrypt(
      dataRememberMe?.password,
      cvsecretKey.value
    ).toString(enc.Utf8);
    password.value = decryptedPassword;
  }
  if (dataRememberMe && dataRememberMe.rememberme) {
    rememberMe.value = dataRememberMe?.rememberme;
  }
});
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg :src="authThemeMask" class="auth-footer-mask" />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />

          <h5 class="text-h5 mb-1">
            Welcome to
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>
          </h5>

          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>

        <VCardText>
          <VAlert color="primary" variant="tonal">
            <p class="text-caption mb-2">
              Admin UserName: <strong>admin</strong> / Pass:
              <strong>admin</strong>
            </p>

            <p class="text-caption mb-0">
              Client UserName: <strong>client</strong> / Pass:
              <strong>client</strong>
            </p>
          </VAlert>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="username"
                  label="UserName"
                  type="username"
                  autofocus
                  @keyup.enter="onSubmit"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  @keyup.enter="onSubmit"
                />

                <div
                  class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4"
                >
                  <VCheckbox v-model="rememberMe" label="Remember me" />
                  <a class="text-primary ms-2 mb-1" href="#">
                    Forgot Password?
                  </a>
                </div>

                <VBtn block :loading="loading" @click="onSubmit"> Login </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center">
                <span>New on our platform?</span>

                <a class="text-primary ms-2" href="#"> Create an account </a>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />

                <span class="mx-4">or</span>

                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
