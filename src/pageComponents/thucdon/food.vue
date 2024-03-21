<template>
  <app-data-table
    click-row
    title-table="Quản lý món ăn"
    placeholder-search="Tìm tên món ăn"
    :headers="headers"
    :services="services"
    :create-dialog="createDialog"
    :update-dialog="updateDialog"
    :navigation-item-id="itemDetail?.id"
  >
    <template #actionDelete><div></div></template>

    <template #addOrEditForm="{ item, data }"> </template>
  </app-data-table>
</template>
<script setup lang="ts">

const headers = [
  { title: "id", key: "id", sortable: false },
  { title: "Tên món ăn", key: "foodName", sortable: false },
  { title: "Ngày Tạo", key: "ngayTao", sortable: true },
  { title: "Mô tả", key: "foodDescription", sortable: false },
];

const createDialog = {
  title: "Thêm mới món ăn",
  actionBtn: "Thêm mới món ăn",
  actionOk: "Lưu",
  actionCancel: "Hủy",
  messageSuccess: "Thêm món ăn thành công",
  messageError: "Thêm mới không thành công",
};
</script>
<style scoped>

</style>
