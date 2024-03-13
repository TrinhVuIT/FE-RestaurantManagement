<script setup lang="ts">
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import AuthService from "@/services/AuthServices";
import authV2ForgotPasswordIllustrationDark from "@images/pages/auth-v2-forgot-password-illustration-dark.png";
import authV2ForgotPasswordIllustrationLight from "@images/pages/auth-v2-forgot-password-illustration-light.png";
import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { useToast } from "vue-toastification";

const data = ref({
  email: "",
});
const toast = useToast();
const success = ref(false);
const loading = ref(false);

const authThemeImg = useGenerateImageVariant(
  authV2ForgotPasswordIllustrationLight,
  authV2ForgotPasswordIllustrationDark
);

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);

const emailFomat = computed(() => {
  if (!data.value.email) return;
  const [name, domain] = data.value.email.split("@");
  return `${Array(name.length).fill("*").join("")}@${domain}`;
});

const password = async () => {
  loading.value = true;
  try {
    await AuthService.ForgotPassword(data.value);
    success.value = true;
  } catch (e) {
    if (e?.response?.data?.error == "Email not found.")
      toast.error("Email not found.");
    else toast.error("Password reset failed. Please try again");
    loading.value = false;
  }
  loading.value = false;
};

const onSubmitClicked = async () => {
  await password();
};

const onResendMailClick = async () => {
  loading.value = true;
  try {
    await AuthService.ForgotPassword(data.value);
    toast.success("Resend the password reset email successfully.");
    loading.value = false;
  } catch (e) {
    toast.error("Resending the password reset email failed. Please try again");
    loading.value = false;
  }
};
</script>

<template>
  <VRow class="auth-wrapper bg-surface" no-gutters>
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="368"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </div>
    </VCol>

    <VCol cols="12" lg="4" class="d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />
          <h5 class="text-h5 mb-1">Forgot Password? 🔒</h5>
          <p class="mb-0">
            Enter your email and we'll send you instructions to reset your
            password
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="onSubmitClicked">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="data.email"
                  autofocus
                  label="Email"
                  type="email"
                />
              </VCol>

              <!-- Reset link -->
              <VCol cols="12">
                <VBtn block type="submit" :loading="loading">
                  Send Reset Link
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon icon="tabler-chevron-left" class="flip-in-rtl" />
                  <span>Back to login</span>
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardText v-if="success">
          <h5 class="title">Confirm password reset</h5>
          <div class="mt-3">
            We've sent you a link to reset your password your email
            {{ emailFomat }}
            <br />
            <br />
            Please access your email and click on the link to change your
            password.
          </div>
          <RouterLink class="ms-2 mb-1 text-center" :to="{ name: 'login' }">
            <v-btn block>Confirm</v-btn>
          </RouterLink>
          <div class="mt-6 text-center">
            Didn't receive Email?
            <v-btn
              class="text-warning"
              @click="onResendMailClick"
              variant="text"
              :loading="loading"
            >
              Send to
            </v-btn>
          </div>
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
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
