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

watch(
  () => keyword.value,
  async () => {
    clearTimeout(time.value);
    time.value = setTimeout(async () => {
      await reload();
    }, 500);
  }
);

watch(
  () => workingItem.value.pageNo,
  async () => await loadData()
);
watch(
  () => drawer.value.show,
  () => {
    if (!drawer.value.show) navigationItem.value = {};
  }
);

const onClickEditNavigation = () => {
  const elm = document.getElementById("id-edit-" + navigationItem.value?.id);
  elm?.click();
  drawer.value.show = false;
};

const onClickRow = (_, { item }: any) => {
  if (!props.clickRow) return;

  drawer.value.show = true;
  navigationItem.value = item.raw;
};

const onCloseNavigationClick = () => {
  drawer.value.show = false;
};

const sortList = async (e: any) => {
  workingItem.value.sortBy = e;
  await reload();
};

const reload = async () => {
  workingItem.value.pageNo = 1;
  await loadData();
};

const loadData = async () => {
  loading.value = true;

  const params = {
    ...paramsRequestModel.value,
    pageNo: workingItem.value.pageNo || 1,
    pageSize: workingItem.value.pageSize,
    sortBy: workingItem.value.sortBy?.[0]?.key,
    order: workingItem.value.sortBy?.[0]?.order,
  };

  if (keyword.value) params.keyword = keyword.value;

  Object.keys(params).forEach((i) => {
    if (!params[i]) delete params[i];
  });

  const res = await props.services.getAll(params);
  if (res) {
    Object.assign(workingItem.value, res);
  }
  loading.value = false;
};

const onDeleteClicked = async (id: number) => {
  const res = await props.services.delete(id);
  if (res) toast.success(props.deleteDialog?.massegeSuccess || "");
  else toast.error(props.deleteDialog?.massegeError || "");
  await reload();
};
</script>

<template>
  <v-card>
    <div class="management-title px-6 pt-6">
      {{ titleTable }}
    </div>

    <!-- 👉 slot top-->
    <slot name="top">
      <v-row class="mx-3 my-2">
        <v-col cols="6">
          <v-row>
            <!-- 👉 slot filter top-->
            <slot name="filterTop" v-bind="{ reload }">
              <v-col cols="6">
                <AppTextField
                  prepend-inner-icon="tabler-search"
                  clearable
                  v-model="keyword"
                  :placeholder="placeholderSearch"
                />
              </v-col>

              <!-- 👉 slot filter Top Append-->
              <slot name="filterTopAppend" v-bind="{ reload }" />
            </slot>

            <!-- 👉 slot filter bottom-->
            <slot name="filterBottom" v-bind="{ reload }" />

            <v-spacer />
          </v-row>
        </v-col>
        <v-col cols="6" >
          <!-- 👉 slot action Top-->
          <slot name="actionTop" v-bind="{ reload }">
            <div class="d-flex justify-end gap-x-2 gap-y-3">
              <!-- 👉 slot action top prepend-->
              <slot name="actionTopPrepend" v-bind="{ reload }" />

              <!-- 👉 slot selected-->
              <slot name="actionTopSelect" v-bind="{ selected }" />

              <!-- 👉 slot action create-->
              <slot name="actionCreate" v-bind="{ reload }">
                <app-add-or-edit-dialog
                  width="600"
                  v-bind="$props.createDialog"
                  :service="services.create"
                  :reload="reload"
                >
                  <template #activator="props">
                    <v-btn v-bind="props">
                      {{ createDialog?.actionBtn || "Them moi" }}
                    </v-btn>
                  </template>
                  <template #form="{ data }">
                    <!-- 👉 slot addOrEditForm-->
                    <slot name="addOrEditForm" v-bind="{ item: {}, data }" />
                  </template>

                  <!-- 👉 slot action Dialog Mid-->
                  <template #actionDialogMid="{ isActive, clearData }">
                    <slot
                      name="actionDialogMid"
                      v-bind="{ isActive, clearData, reload }"
                    />
                  </template>
                </app-add-or-edit-dialog>
              </slot>

              <!-- 👉 slot action top append-->
              <slot name="actionTopAppend" v-bind="{ reload }" />
            </div>
          </slot>
        </v-col>

        <!-- 👉 slot filter bottom-->
        <slot name="filterBottom" v-bind="{ reload }" />
      </v-row>

      <v-divider />
    </slot>

    <!-- 👉 slot table-->
    <slot name="table" v-bind="{ items: workingItem.data, reload }">
      <data-table
        no-data-text="Không có dữ liệu"
        v-model:select="selected"
        v-bind="$attrs"
        :headers="props.headers"
        :items="workingItem.data"
        :loading="loading"
        @update:sortBy="sortList($event)"
        @click:row="onClickRow"
      >
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot
            v-if="!['bottom'].some((x) => x == name)"
            v-bind="slotProps || {}"
            :name="name"
          />
        </template>
        <template #item.actions="{ item }">
          <div class="d-flex justify-center">
            <!-- 👉 slot action prepend-->
            <slot name="actionTablePrepend" v-bind="{ reload, item }" />

            <!-- 👉 slot edit-->
            <slot name="actionEdit" v-bind="{ reload, item }">
              <app-add-or-edit-dialog
                width="600"
                v-bind="$props.updateDialog"
                :service="services.update"
                :reload="reload"
              >
                <template #actionDialogMid="{ isActive, clearData }">
                  <!-- 👉 slot action Dialog Mid-->
                  <slot
                    name="actionDialogMid"
                    v-bind="{ isActive, clearData, reload }"
                  />
                </template>

                <template #activator="props">
                  <TableBtn
                    icon="tabler-edit"
                    tooltip="Sửa"
                    v-bind="props"
                    :id="'id-edit-' + item.raw?.id"
                  />
                </template>
                <template #form="{ data }">
                  <!-- 👉 slot edit Form-->
                  <slot name="addOrEditForm" v-bind="{ item, data }" />
                </template>
              </app-add-or-edit-dialog>
            </slot>

            <!-- 👉 slot action center-->
            <slot name="actionTableCenter" v-bind="{ reload, item }" />

            <!-- 👉 slot action Delete-->
            <slot name="actionDelete" v-bind="{ reload, item }">
              <TableBtn icon="tabler-trash" tooltip="Xóa" />
              <ConfirmPopup
                ref="deletePopup"
                activator="parent"
                :title="props.deleteDialog?.title"
                :delete="true"
                @on-confirmed="onDeleteClicked(item.raw.id)"
              >
                <template #content>
                  <div>
                    <!-- 👉 slot content Delete-->
                    <slot name="contentDelete" v-bind="{ item }" />
                  </div>
                </template>
              </ConfirmPopup>
            </slot>

            <!-- 👉 slot action append-->
            <slot name="actionTableAppend" v-bind="{ reload, item }" />
          </div>
        </template>
        <template #bottom>
          <div></div>
        </template>
      </data-table>
    </slot>

    <!-- 👉 slot bottom-->
    <slot name="bottom" v-if="workingItem.data?.length">
      <pagination
        :total-item="workingItem.totalItems"
        :page-index="workingItem.pageNo"
        :page-size="workingItem.pageSize"
        @page-index="(val) => (workingItem.pageNo = val)"
      />
    </slot>
  </v-card>
  <!-- 👉 slot navigation-->
  <slot name="navigation">
    <v-navigation-drawer
      v-model="drawer.show"
      location="end"
      temporary
      width="530"
    >
      <template style="min-height: 100vh" class="d-flex flex-column">
        <div class="w-100 d-flex flex-row-reverse">
          <dialog-close-btn class="ma-4" @click="onCloseNavigationClick" />
        </div>

        <!-- 👉 slot navigationForm-->
        <slot name="navigationForm" v-bind="{ navigationItem }" />

        <!-- 👉 slot navigationAction-->
        <slot name="navigationAction" v-bind="{ navigationItem }">
          <div :class="'ma-8 d-flex flex-row-reverse'">
            <v-btn
              class="me-4 me-sm-0"
              variant="outlined"
              prepend-icon="tabler-edit"
              color="#817D8D"
              @click="onClickEditNavigation"
            >
              Chỉnh sửa
            </v-btn>
          </div>
        </slot>
      </template>
    </v-navigation-drawer>
  </slot>
</template>

<style lang="scss" scoped>
.pagination-text {
  line-height: 44px;
  font-size: 0.8125rem;
}

.v-table.v-table--hover > .v-table__wrapper > table > tbody > tr:hover td {
  background: rgba(210, 122, 18, 0.1);
}

:deep(.v-data-table-header__content) {
  justify-content: unset !important;
}

:deep(
    .v-data-table__td.v-data-table-column--align-center.v-data-table__th.v-data-table__th
  ) {
  .v-data-table-header__content {
    justify-content: center !important;
  }
}
</style>
