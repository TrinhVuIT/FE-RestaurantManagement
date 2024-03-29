<template>
  <app-data-table
    click-row
    title-table="QUẢN LÝ MÓN ĂN"
    placeholder-search="Tìm tên món ăn"
    :headers="headers"
    :services="services"
    :create-dialog="createDialog"
    :update-dialog="updateDialog"
    :loading="loading"
  >
    <template #actionDelete><div></div></template>
    <template #addOrEditForm="{ item, data }">
      <form-food
        :data="data"
        :id="item.raw?.id"
        :input-label="inputLabel"
        :get-by-id-service="services.get"
      />
    </template>
  </app-data-table>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRoute } from "vue-router";
import FoodSerVice from "@/services/FoodService";
import FormFood from "@/pageComponents/thucdon/components/formFood.vue";
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
  { title: "Hành động", key: "actions", sortable: false },
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
  title: "Cập nhật món ăn",
  actionOk: "Lưu",
  actionCancel: "Hủy",
  massegeSuccess: "Cập nhật món ăn thành công",
  massegeError: "Tên món ăn đã tồn tại",
};

const inputLabel = {
  foodName: {
    label: "Tên món",
    placeholder: "Nhập tên món",
  },
  foodDescription: {
    label: "Mô tả",
    placeholder: "Nhập mô tả",
  },
  foodPrice: {
    label: "Giá",
    placeholder: "Nhập giá món ăn",
  },
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
