<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import { getCurrentInstance, onBeforeMount, ref } from "vue";
import SampleService from "@/services/Sample";
import {
  convertDate,
  convertDateTime,
  convertFloat,
  convertInt,
} from "@/@core/utils/formatters";
import CreateEditDialogVue from "./CreateEditDialog.vue";

const tableConfig = ref({
  headers: [
    { title: "Họ và tên", key: "fullName" },
    { title: "Mô tả", key: "description" },
    { title: "Trạng thái", key: "status" },
    { title: "Số nguyên", key: "intField" },
    { title: "Số thập phân", key: "decimalField" },
    { title: "Ngày", key: "dateField" },
    { title: "Ngày giờ", key: "dateTimeField" },
    { title: "Thao tác", key: "actions" },
  ],
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    totalPages: 1,
    totalItems: 1,
  },
});

const instance = getCurrentInstance();
const workingItem = ref(null);
const loading = ref(false);
const searchText = ref("");
const showDialog = ref(false);
const table = ref("table");

onBeforeMount(async () => {
  await loadData();
});

const loadData = async () => {
  loading.value = true;
  const params = {
    pageNo: tableConfig.value.pagination.pageNo,
    pageSize: tableConfig.value.pagination.pageSize,
    keyword: searchText.value,
  };
  const res = await SampleService.GetAll(params);
  if (res) {
    tableConfig.value.data = res.data;
    tableConfig.value.pagination = {
      ...tableConfig.value.pagination,
      pageNo: res.pageNo,
      pageSize: res.pageSize,
      totalItems: res.totalItems,
      totalPages: res.totalPages,
    };
  }
  loading.value = false;
};

const resolveStatusVariant = (status: number) => {
  if (status === 1) return { color: "primary", text: "Current" };
  else if (status === 2) return { color: "success", text: "Professional" };
  else if (status === 3) return { color: "error", text: "Rejected" };
  else if (status === 4) return { color: "warning", text: "Resigned" };
  else return { color: "info", text: "Applied" };
};

const onEditIconClicked = (item) => {
  instance?.refs.dialog.show(item);
};
const onDeleteIconClicked = (item) => {};

const onPageNoChanged = () => {
  loadData();
};

const onSaveClick = () => {
  loadData();
};
</script>
<template>
  <v-card>
    <VDataTable
      ref="table"
      :loading="loading"
      :headers="tableConfig.headers"
      :items="tableConfig.data"
      :itemPerPage="tableConfig.pagination.pageSize"
      :itemPerPageOption="tableConfig.pagination.pageSizeOptions"
      :sortable="false"
    >
      <template #top>
        <v-container>
          <v-row justify="end" align="center">
            <v-col cols="2">
              <app-combobox
                v-model="tableConfig.pagination.pageSize"
                :items="tableConfig.pagination.pageSizeOptions"
              />
            </v-col>
            <v-col cols="4" offset="3">
              <app-text-field placeholder="Tìm Kiếm" />
            </v-col>
            <v-col cols="2">
              <v-btn prepend-icon="mdi-plus">Thêm mới</v-btn>
            </v-col>
            <v-col cols="1">
              <IconBtn>
                <v-icon>mdi-filter-outline</v-icon>
              </IconBtn>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template #item.description="{ item }">
        <span class="d-block text-truncate" style="max-width: 130px">{{
          item.raw.description
        }}</span>
      </template>

      <template #item.intField="{ item }">
        {{ convertInt(item.raw.intField) }}
      </template>

      <template #item.decimalField="{ item }">
        {{ convertInt(item.raw.decimalField) }}
      </template>

      <template #item.dateField="{ item }">
        {{ convertDate(item.raw.dateField) }}
      </template>

      <template #item.dateTimeField="{ item }">
        {{ convertDateTime(item.raw.dateTimeField) }}
      </template>

      <template #item.status="{ item }">
        <VChip
          :color="resolveStatusVariant(item.raw.status).color"
          class="font-weight-medium"
          size="small"
        >
          {{ resolveStatusVariant(item.raw.status).text }}
        </VChip>
      </template>

      <template #item.actions="{ item }">
        <v-icon @click="onEditIconClicked(item.raw)"> mdi-pencil </v-icon>
        <v-icon @click="onDeleteIconClicked(item.raw)"> mdi-delete </v-icon>
      </template>

      <template #bottom>
        <VCardText class="pt-2">
          <VRow>
            <VCol lg="10" cols="9" class="d-flex justify-end">
              <VPagination
                v-model="tableConfig.pagination.pageNo"
                total-visible="5"
                :length="tableConfig.pagination.totalPages"
                @update:modelValue="onPageNoChanged"
              />
            </VCol>
          </VRow>
        </VCardText>
      </template>
    </VDataTable>
    <CreateEditDialogVue ref="dialog" @onSaveClick="onSaveClick" />
  </v-card>
</template>
