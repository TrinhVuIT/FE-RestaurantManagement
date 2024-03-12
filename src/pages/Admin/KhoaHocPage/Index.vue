<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import { getCurrentInstance, onBeforeMount, ref } from "vue";
import KhoaHocService from "@/services/KhoaHoc";
import CreateEditDialogVue from "./CreateEditDialog.vue";
import CreateDeleteDialogVue from "./CreateDeleteDialog.vue";
import itemStatus from "../../../Constants/StatusContants";

const tableConfig = ref({
  headers: [
    { title: "#", key: "index" },
    { title: "Tên khóa học", key: "TenKhoaHoc" },
    { title: "Loại hoạt động", key: "LoaiHoatDong" },
    { title: "Thời gian", key: "ThoiGianBatDau" },
    { title: "Trạng thái", key: "TrangThai" },
    { title: "Thao tác", key: "actions" },
  ],
  data: [],
});

const instance = getCurrentInstance();
const table = ref("table");
const pageNo = ref(1);
const pageSize = ref(5);
const pageSizeOptions = ref([5, 10, 20, 50, 100]);
const totalPages = ref(1);

const itemType = [
  { text: "Tu tại chùa", value: 1 },
  { text: "Tu tại nhóm", value: 2 },
  { text: "Tu tại nhà riêng", value: 3 },
];

const onEditIconClicked = async (item: any) => {
  instance?.refs.dialog.show(item);
};

const onDeleteIconClicked = async (item: any) => {
  instance?.refs.dialogDelete.show(item);
};

const addItem = async (item: any) => {
  instance?.refs.dialog.show(item);
};

const onSaveClick = () => {
  loadData();
};

const onDeleteClick = () => {
  pageNo.value = 1;
  loadData();
};

watch(pageSize, () => {
  pageNo.value = 1;
  loadData();
  totalPages.value = Math.ceil(tableConfig.value.data.length / pageSize.value);
});

onBeforeMount(async () => {
  await loadData();
});

const search = ref({
  searchName: null,
  searchType: null,
  searchStatus: null,
});

const loadData = async () => {
  const res = await KhoaHocService.GetAll();
  if (res) {
    tableConfig.value.data = res;
    totalPages.value = Math.ceil(
      tableConfig.value.data.length / pageSize.value
    );
  }
};

const pagination = async () => {
  const params = {
    TenKhoaHoc: search.value.searchName,
    LoaiHoatDong: search.value.searchType,
    TrangThai: search.value.searchStatus,
    page: pageNo.value,
    limit: pageSize.value,
  };
  const res = await KhoaHocService.SearchAndPagination(params);
  if (res) {
    tableConfig.value.data = res;
  }
};

const prevPage = () => {
  if (pageNo.value > 1) {
    pageNo.value--;
  }
  pagination();
};
const nextPage = () => {
  if (pageNo.value < totalPages.value) {
    pageNo.value++;
  }
  pagination();
};

const onPageNoChanged = () => {
  pagination();
};

const onClickSearch = () => {
  pagination();
};

const resolveTypeVariant = (type: number) => {
  if (type === 1) return { text: "Tu tại chùa", value: 1 };
  else if (type === 2) return { text: "Tu tại nhóm", value: 2 };
  else return { text: "Tu tại nhà riêng", value: 3 };
};

const resolveStatusVariant = (status: number) => {
  if (status === 1) return { color: "#f1b627", text: "Chờ duyệt" };
  else if (status === 2) return { color: "#1890ff", text: "Đã duyệt" };
  else if (status === 3) return { color: "#f5222d", text: "Từ chối" };
  else if (status === 4) return { color: "#1fb266", text: "Đã hoàn thành" };
  else if (status === 5) return { color: "#d18664", text: "Nghỉ thông báo" };
  else return { color: "#ffc069", text: "Xin nghe pháp sau" };
};
</script>

<template>
  <v-card>
    <div class="d-flex justify-space-between align-center mt-3 mx-2">
      <h4>Quá trình tu tập</h4>

      <VBtn
        rounded="pill"
        color="#b77658"
        style="color: #fff"
        @click="addItem"
        append-icon="mdi-plus"
        >Tạo mới
      </VBtn>
    </div>
    <VDataTable
      ref="table"
      :headers="tableConfig.headers"
      :items="tableConfig.data"
      :itemsPerPage="pageSize"
      :itemsPerPageOption="pageSizeOptions"
      :sortable="false"
    >
      <template #top>
        <v-container>
          <v-row align="end">
            <VCol cols="3">
              <AppTextField
                v-model="search.searchName"
                placeholder="Tìm kiếm theo tên"
                prepend-inner-icon="tabler-search"
              />
            </VCol>
            <VCol cols="3">
              <AppSelect
                v-model="search.searchType"
                :items="itemType"
                item-title="text"
                item-value="value"
                label="Loại hoạt động"
                placeholder="Loại hoạt động"
                clearable
                clear-icon="tabler-x"
              />
            </VCol>
            <VCol cols="3">
              <AppSelect
                v-model="search.searchStatus"
                :items="itemStatus"
                item-title="text"
                item-value="value"
                label="Trạng thái"
                placeholder="Trạng thái"
                clearable
                clear-icon="tabler-x"
              />
            </VCol>
            <VCol cols="1">
              <VBtn
                size="38"
                color="#c5683d"
                :rounded="0"
                @click="onClickSearch"
              >
                <VIcon icon="tabler-search" color="#fff" size="22" />
              </VBtn>
            </VCol>
          </v-row>
        </v-container>
      </template>

      <template #item.index="{ index }">
        {{ index + 1 }}
      </template>

      <template #item.TenKhoaHoc="{ item }">
        {{ item.raw.TenKhoaHoc }}
      </template>

      <template #item.LoaiHoatDong="{ item }">
        {{ resolveTypeVariant(item.raw.LoaiHoatDong).text }}
      </template>

      <template #item.ThoiGianBatDau="{ item }">
        {{ item.raw.ThoiGianBatDau }} - {{ item.raw.ThoiGianKetThuc }}
      </template>

      <template #item.TrangThai="{ item }">
        <VChip
          label
          variant="elevated"
          :color="resolveStatusVariant(item.raw.TrangThai).color"
          class="font-weight-medium"
          size="default"
        >
          {{ resolveStatusVariant(item.raw.TrangThai).text }}
        </VChip>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <VBtn
            :rounded="0"
            color="#fcfcff"
            variant="outlined"
            size="38"
            @click="onEditIconClicked(item.raw)"
          >
            <VIcon icon="mdi-pencil" color="#303234" size="25" />
          </VBtn>
          <VBtn
            :rounded="0"
            color="#fcfcff"
            variant="outlined"
            size="38"
            @click="onDeleteIconClicked(item.raw)"
          >
            <VIcon icon="mdi-trash-can-outline" color="#df433c" size="25" />
          </VBtn>
        </div>
      </template>

      <template #bottom>
        <VCardText class="pt-2">
          <VRow>
            <VCol cols="2">
              <app-combobox v-model="pageSize" :items="pageSizeOptions" />
            </VCol>
            <VCol cols="3" class="d-flex align-center">
              <span
                >Hiển thị 1 to
                {{ pageSize }}
                of {{ tableConfig.data.length }} bản ghi</span
              >
            </VCol>
            <VCol cols="7" class="d-flex justify-end">
              <VPagination
                active-color="#d27a12"
                v-model="pageNo"
                total-visible="5"
                :length="totalPages"
                @update:modelValue="onPageNoChanged"
              >
                <template #prev>
                  <VBtn color="secondary" @click="prevPage">
                    Trước
                  </VBtn></template
                >
                <template #next
                  ><VBtn color="secondary" @click="nextPage">
                    Sau
                  </VBtn></template
                >
              </VPagination>
            </VCol>
          </VRow>
        </VCardText>
      </template>
    </VDataTable>

    <CreateEditDialogVue
      ref="dialog"
      @onSaveClick="onSaveClick"
      :changeItemType="itemType"
    />
    <CreateDeleteDialogVue ref="dialogDelete" @onDeleteClick="onDeleteClick" />
  </v-card>
</template>

<style>
th.v-data-table__td.v-data-table-column--align-start.v-data-table__th.v-data-table__th--sortable.v-data-table__th.v-data-table__th--sortable {
  background-color: #e7f2ff;
  font-weight: bold;
}
</style>
