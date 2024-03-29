<template>
  <v-dialog
    width="600"
    activator="activator"
    v-bind="$attrs"
    persistent
    scroll-strategy="none"
    :fullscreen="xs"
    :retain-focus="false"
  >
    <template #activator="{ props }">
      <slot name="activator" v-bind="props" />
    </template>
    <template #default="{ isActive }">
      <v-form ref="refVForm" class="pa-4 my-auto">
        <v-card style="max-height: 95vh" class="overflow-y-auto">
          <dialog-close-btn
            class="mt-5 me-5"
            :disabled="isLoading"
            @click="onClose(isActive)"
          />
          <v-card-text class="management-title py-4">
            {{ title }}
          </v-card-text>
          <v-divider />

          <v-card-text>
            <!-- 👉 slot form-->
            <slot name="form" v-bind="{ data }" />
          </v-card-text>
          <!-- 👉 slot action-->
          <slot name="actions">
            <v-divider />
            <v-card-text class="d-flex flex-row-reverse py-4 gap-x-2">
              <v-btn :loading="isLoading" @click="onSubmit(isActive)">
                {{ actionOk || "Thêm" }}
              </v-btn>

              <!-- 👉 action Dialog Mid-->
              <slot name="actionDialogMid" v-bind="{ isActive, clearData }" />

              <v-btn
                variant="outlined"
                color="#817D8D"
                :disabled="isLoading"
                @click="onClose(isActive)"
              >
                {{ actionCancel || "Hủy bỏ" }}
              </v-btn>
            </v-card-text>
          </slot>
        </v-card>
      </v-form>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VForm } from "vuetify/components/VForm";
import { useToast } from "vue-toastification";
import { useDisplay } from "vuetify";

const props = defineProps<IProps>();
const refVForm = ref<VForm>();
const isLoading = ref(false);
const data = ref({});
const toast = useToast();
const { xs } = useDisplay();

interface IProps {
  title: string;
  itemId?: number;
  actionOk?: string;
  actionCancel?: string;
  massegeSuccess: string;
  massegeError: string;
  reload: () => Promise<void>;
  service: (data: object) => Promise<boolean>;
  clearData?: Function;
}

const onClose = async (isActive: any) => {
  isActive.value = false;
  props.clearData && props.clearData();
};

const onSubmit = async (isActive?: any) => {
  refVForm.value
    ?.validate()
    .then(async ({ valid: isValid }: { valid: boolean }) => {
      if (!isValid) return;

      isLoading.value = true;
      const result = await props.service(data.value);

      isActive.value = false;
      isLoading.value = false;

      if (result) toast.success(props.massegeSuccess, { timeout: 3000 });
      else toast.error(props.massegeError, { timeout: 3000 });

      await props?.reload();
    });
};
</script>

<style scoped lang="scss">
.title {
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  color: #4b465c;
  margin: 16px 32px 16px;
  width: 100%;
}

:deep(.ck-editor__editable) {
  min-height: 200px;
  max-height: 500px;
}
:deep(.v-card-text) {
  padding: 16px;
}

@media only screen and (min-width: 768px) {
  :deep(.v-card-text) {
    padding: 30px;
  }
}
</style>
