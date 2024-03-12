<script setup lang="ts">
import KhoaHocService from "@/services/KhoaHoc";
import { onBeforeMount, ref } from "vue";
import { useToast } from "vue-toastification";
import itemStatus from "../../../Constants/StatusContants";

const cardTitle = ref("");
const showDialog = ref(false);
const workingItem = ref({
  id: 0,
  TenKhoaHoc: "",
  ThoiGianBatDau: "",
  ThoiGianKetThuc: "",
  LoaiHoatDong: null,
  TrangThai: null,
});

const emit = defineEmits(["onSaveClick"]);
const props = defineProps({ changeItemType: Array });
const toast = useToast();

const show = async (item: any) => {
  showDialog.value = true;
  cardTitle.value = "Thêm mới khóa học";
  if (item.id) {
    workingItem.value = Object.assign({}, item);
    cardTitle.value = "Cật nhật khóa học";
  }
};

defineExpose({
  show,
});

const onSaveClicked = async () => {
  if (cardTitle.value === "Thêm mới khóa học") {
    const res = await KhoaHocService.AddItem(workingItem.value);
    if (res) {
      workingItem.value = res;
      emit("onSaveClick");
      toast.success("Thêm <tên item> thành công!"); // Allow hard coded
      onCloseDialogIconClicked();
    }
  }
  if (cardTitle.value === "Cật nhật khóa học!") {
    const res = await KhoaHocService.EditItem(
      workingItem.value.id,
      workingItem.value
    );
    if (res) {
      workingItem.value = res;
      emit("onSaveClick");
      toast.success("Cật nhật <tên item> thành công"); // Allow hard coded
      onCloseDialogIconClicked();
    }
  }
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
    <VCard :title="cardTitle">
      <form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <AppTextField
                v-model="workingItem.TenKhoaHoc"
                label="Tên khóa học"
              />
            </v-col>
            <v-col cols="6">
              <AppDateTimePicker
                v-model="workingItem.ThoiGianBatDau"
                label="Thời gian bắt đầu"
              />
            </v-col>
            <v-col cols="6">
              <AppDateTimePicker
                v-model="workingItem.ThoiGianKetThuc"
                label="Thời gian kết thúc"
              />
            </v-col>
            <v-col cols="6">
              <AppSelect
                v-model="workingItem.LoaiHoatDong"
                :items="props.changeItemType"
                item-title="text"
                item-value="value"
                label="Loại hoạt động"
                placeholder="Loại hoạt động"
              />
            </v-col>
            <v-col cols="6">
              <AppSelect
                v-model="workingItem.TrangThai"
                :items="itemStatus"
                item-title="text"
                item-value="value"
                label="Trạng thái"
                placeholder="Trạng thái"
              />
            </v-col>
          </v-row>
        </v-container>
      </form>
      <div class="d-flex justify-end mr-5 mb-5">
        <VBtn
          color="#fff"
          style="color: #070707"
          @click="onCloseDialogIconClicked"
          class="mr-3"
        >
          Hủy
        </VBtn>

        <VBtn color="#c5683d" style="color: #fff" @click="onSaveClicked">
          Lưu
        </VBtn>
      </div>
    </VCard>
  </v-dialog>
</template>
