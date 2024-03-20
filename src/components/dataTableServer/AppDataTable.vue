<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import DataTable from "./DataTable.vue";
import { useToast } from "vue-toastification";
import Pagination from "./Pagination.vue";

interface IWorkingItem {
  pageSize: number;
  pageNo: number;
  totalItems: number;
  totalPages: number;
  data: any[];
  sortBy?: {
    key: string;
    order: string;
  }[];
}

interface IDataTableHeader {
  key: string;
  value?: SelectItemKey;
  title: string;
  colspan?: number;
  rowspan?: number;
  fixed?: boolean;
  align?: "start" | "end" | "center";
  width?: number | string;
  minWidth?: string;
  maxWidth?: string;
  sortable?: boolean;
  sort?: DataTableCompareFunction;
}

type SelectItemKey =
  | boolean
  | string
  | (string | number)[]
  | ((item: Record<string, any>, fallback?: any) => any);
type DataTableCompareFunction<T = any> = (a: T, b: T) => number;
type DataTableHeaderConfig =
  | IDataTableHeader[]
  | IDataTableHeader[][]
  | undefined;

interface IProps {
  titleTable: string;
  headers: DataTableHeaderConfig;
  createDialog?: IDialogCreate;
  updateDialog?: IDialog;
  deleteDialog?: IDialog;
  services: IServices;
  placeholderSearch?: string;
  paramsRequestModel: IParamsRequestModel;
  clickRow?: boolean;
}

interface IServices {
  getAll: (params: IParamsRequestModel) => Promise<IWorkingItem>;
  get?: (id: number) => Promise<any>;
  create?: (data: object) => Promise<boolean>;
  update?: (data: object) => Promise<boolean>;
  delete?: (id: number) => Promise<boolean>;
}

interface IDialog {
  title: string;
  actionOk: string;
  actionCancel: string;
  massegeSuccess: string;
  massegeError: string;
}

interface IDialogCreate extends IDialog {
  actionBtn?: string;
}

interface IParamsRequestModel {
  keyword: string;
  [key: string]: Object;
}

const { lg } = useDisplay();
const props = withDefaults(defineProps<IProps>(), {});
const loading = ref(false);
const keyword = ref();
const time = ref();
const selected = ref([]);
const deletePopup = ref<any>(null);
const toast = useToast();
const navigationItem = ref({});
const drawer = ref({ show: false });
const workingItem = ref<IWorkingItem>({
  pageNo: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 0,
  data: [],
});

const paramsRequestModel = ref<IParamsRequestModel>(props.paramsRequestModel);
onBeforeMount(async () => await loadData());

watch(props.paramsRequestModel, async () => {
  paramsRequestModel.value = props.paramsRequestModel;
  await reload();
});

watch(() => keyword.value, async () => {
  clearTimeout(time.value)
  time.value = setTimeout(async () => {
    await reload();
  }, 500)
})

watch(() => workingItem.value.pageNo, async () => await loadData())
watch(() => drawer.value.show, () => {
  if (!drawer.value.show) navigationItem.value = {}
})

const onClickEditNavigation = ()=>{
  const elm = document.getElementById('id-edit-' + navigationItem.value?.id)
  elm?.click()
  drawer.value.show = false
}

const onClickRow = (_, {item}: any)=>{
  if(!props.clickRow) return

  drawer.value.show = true
  navigationItem.value = item.raw
}

const onCloseNavigationClick = ()=>{
  drawer.value.show = false
}

const sortList = async (e: any) => {
  workingItem.value.sortBy = e
  await reload();
}

const reload = async () => {
  workingItem.value.pageNo = 1
  await loadData()
}

const loadData = async () => {
  loading.value = true;

  const params = {
    ...paramsRequestModel.value,
    pageNo: workingItem.value.pageNo || 1,
    pageSize: workingItem.value.pageSize,
    sortBy: workingItem.value.sortBy?.[0]?.key,
    order: workingItem.value.sortBy?.[0]?.order,
  };

  if (keyword.value) params.keyword = keyword.value

  Object.keys(params).forEach((i) => {
    if (!params[i]) delete params[i];
  });

  const res = await props.services.getAll(params)
  if (res) {
    Object.assign(workingItem.value, res);
  }
  loading.value = false;
};

const onDeleteClicked = async (id: number) => {
  const res = await props.services.delete(id)
  if (res) toast.success(props.deleteDialog?.massegeSuccess || '')
  else toast.error(props.deleteDialog?.massegeError || '')
  await reload()
}
</script>

<template>
  
</template>

<style lang="scss" scoped>
.pagination-text {
  line-height: 44px;
  font-size: 0.8125rem;
}

.v-table.v-table--hover > .v-table__wrapper > table > tbody > tr:hover td {
  background: rgba(210, 122, 18, 0.10)
}

:deep(.v-data-table-header__content) {
  justify-content: unset !important;
}

:deep(.v-data-table__td.v-data-table-column--align-center.v-data-table__th.v-data-table__th) {
  .v-data-table-header__content {
    justify-content: center !important;
  }
}

</style>
