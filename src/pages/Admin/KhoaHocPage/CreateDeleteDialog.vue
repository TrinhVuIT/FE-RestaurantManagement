<script setup lang="ts">
import KhoaHocService from "@/services/KhoaHoc";
import { onBeforeMount, ref } from "vue";
import { useToast } from "vue-toastification";

const showDeleteDialog = ref(false);
const workingItem = ref({
  id: 0,
});
const emit = defineEmits(["onDeleteClick"]);
const toast = useToast();

const show = async (item: any) => {
  showDeleteDialog.value = true;
  workingItem.value.id = item.id;
};

defineExpose({
  show,
});

const onDeleteClicked = async () => {
  const res = await KhoaHocService.DeleteItem(workingItem.value.id)
    .then((res) => {
      if (res) {
        emit("onDeleteClick");
        toast.error("Xóa <tên item> thành công!"); // Allow hard coded
        onCloseDialogIconClicked();
      }
    })
    .catch((err) => {
      if (err.request.status == 404) {
        emit("onDeleteClick");
        toast.warning("Xóa <tên item> không thành công!"); // Allow hard coded
        onCloseDialogIconClicked();
      }
    });
  // if (res) {
  //   emit("onDeleteClick");
  //   toast.error("Xóa <tên item> thành công!"); // Allow hard coded
  //   onCloseDialogIconClicked();
  // }
};

const onCloseDialogIconClicked = () => {
  workingItem.value = {};
  showDeleteDialog.value = false;
};
</script>
<template>
  <v-dialog
    v-model="showDeleteDialog"
    persistent
    transition="dialog-top-transition"
    width="500px"
  >
    <DialogCloseBtn @click="onCloseDialogIconClicked" />
    <VCard>
      <VCardItem>
        <VCardTitle>Xóa thông tin</VCardTitle>
      </VCardItem>

      <VCardText> Bạn chắc chắn muốn xóa khóa học này? </VCardText>

      <div class="d-flex justify-end mr-5 mb-5">
        <VBtn
          color="#fff"
          style="color: #070707"
          @click="onCloseDialogIconClicked"
          class="mr-3"
        >
          Hủy
        </VBtn>

        <VBtn color="#de372f" style="color: #fff" @click="onDeleteClicked">
          Xóa
        </VBtn>
      </div>
    </VCard>
  </v-dialog>
</template>
