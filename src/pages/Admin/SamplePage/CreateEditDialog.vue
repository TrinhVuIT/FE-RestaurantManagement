<script setup lang="ts">
import { convertDate, convertDateTime } from "@/@core/utils/formatters";
import SampleService from "@/services/Sample";
import { onBeforeMount, ref } from "vue";
import { useToast } from "vue-toastification";

const cardTitle = ref("");
const showDialog = ref(false);
const workingItem = ref({});
const itemStatus = ref();
const loading = ref(false);
const emit = defineEmits(["onSaveClick"]);
const toast = useToast();
onBeforeMount(async () => {
  const res = await SampleService.GetAll(null);
  if (res) {
    itemStatus.value = res.data.map((item, index) => {
      return {
        title: item.fullName,
        value: index,
      };
    });
  }
});

const show = async (itemId) => {
  showDialog.value = true;
  loading.value = true;
  cardTitle.value = "Create";
  if (itemId) {
    const res = await SampleService.GetAll({ itemCount: 1 });
    if (res) {
      var fakeItem = res.data[0];
      fakeItem.dateField = convertDate(fakeItem.dateField);
      fakeItem.dateTimeField = convertDateTime(fakeItem.dateTimeField);
      workingItem.value = fakeItem;
    }
    cardTitle.value = "Edit";
  }
  loading.value = false;
};

defineExpose({
  show,
});
const onSaveClicked = () => {
  emit("onSaveClick");
  toast.success("Thêm <tên item> thành công"); // Allow hard coded
  onCloseDialogIconClicked();
};

const onCloseDialogIconClicked = () => {
  workingItem.value = {};
  showDialog.value = false;
};
</script>
<template>
  <v-dialog
    v-model="showDialog"
    persistent
    transition="dialog-top-transition"
    width="700"
  >
    <DialogCloseBtn @click="onCloseDialogIconClicked" />
    <VCard :title="cardTitle" :loading="loading">
      <form>
        <v-container>
          <v-row>
            <v-col cols="6">
              <AppTextField
                v-model="workingItem.fullName"
                label="Họ Tên"
                :disabled="loading"
              />
            </v-col>
            <v-col cols="6">
              <AppCombobox
                v-model="workingItem.status"
                item-title="title"
                item-value="value"
                label="Trạng Thái"
                :items="itemStatus"
                :disabled="loading"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <AppDateTimePicker
                v-model="workingItem.dateField"
                label="Ngày"
                :disabled="loading"
              />
            </v-col>
            <v-col cols="6">
              <AppDateTimePicker
                v-model="workingItem.dateTimeField"
                label="Ngày giờ"
                :config="{ enableTime: true }"
                :disabled="loading"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <AppTextField
                v-model="workingItem.intField"
                type="number"
                label="Số nguyên"
                :disabled="loading"
              />
            </v-col>
            <v-col cols="6">
              <AppTextField
                v-model="workingItem.decimalField"
                type="number"
                step="0.01"
                label="Số thập phân"
                :clearable="true"
                :disabled="loading"
              />
            </v-col>
          </v-row>
        </v-container>
      </form>
      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="onCloseDialogIconClicked"
        >
          Cancel
        </VBtn>

        <VBtn color="success" variant="elevated" @click="onSaveClicked">
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </v-dialog>
</template>
