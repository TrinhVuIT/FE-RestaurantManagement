<template>
  <app-data-table
    click-row
    title-table="Quản lý món ăn"
    placeholder-search="Tìm tên món ăn"
    :headers="headers"
    :services="services"
    :create-dialog="createDialog"
    :update-dialog="updateDialog"
  >
    <template #actionDelete><div></div></template>
    <template #addOrEditForm?="{ item, data }"> </template>
  </app-data-table>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRoute } from "vue-router";
import FoodSerVice from "@/services/FoodService";
import {
  IPagedFoodRequest,
  ICreateRequest,
  IUpdateRequest,
} from "@/interfaces/IFood";

const route = useRoute();
const itemDetail = ref();

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
const updateDialog = {
  title: "Cập nhật thực đơn",
  actionOk: "Lưu",
  actionCancel: "Hủy",
  massegeSuccess: "Cập nhật thực đơn thành công",
  massegeError: "Tên món ăn đã tồn tại",
};

const services = {
  getAll: async (params: IPagedFoodRequest) => {
    return await FoodSerVice.GetPaged(params);
  },
  get: async (id: number) => {
    return await FoodSerVice.GetById(id);
  },
  create: async (data: Ref<ICreateRequest>) => {
    return await FoodSerVice.CreateNew(data.value);
  },
  update: async (data: Ref<IUpdateRequest>) => {
    return await FoodSerVice.Update(data.value.id, data.value);
  },
  delete: async (id: number) => {
    return await FoodSerVice.Delete(id);
  },
};
</script>
<style scoped></style>
