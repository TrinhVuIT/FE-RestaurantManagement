<template>
  <VDivider></VDivider>
  <v-card v-if="props.totalItem" id="pagination">
    <v-row >
      <v-col
        v-if="count"
        class="d-flex align-self-center pl-6 py-3"
        :class="mobile ? 'justify-center mt-2' : 'justify-start'"
      >
        {{ countPage }}
      </v-col>
      <v-col 
        class="d-flex justify-end align-self-center py-3"
        :class="mobile ? 'justify-center' : 'justify-end pr-6'"
      >
        <v-pagination
          v-model="pageIndex"
          :length="totalPages"
          :total-visible="mobile ? 2 : 5"
          @update:modelValue="onChangePageIndex"
          active-color="#D27A12"
        >
          <template v-slot:next>
            <VBtn
              variant="tonal"
              @click="nextPage"
              :disabled="pageIndex === totalPages"
            >
              Sau
            </VBtn>
          </template>
          <template v-slot:prev>
            <VBtn
              variant="tonal"
              @click="prevPage"
              :disabled="pageIndex === 1"
            >
              Trước
            </VBtn>
          </template>
        </v-pagination>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import {watch} from "vue";
import { useDisplay } from "vuetify";

const pageIndex = ref(1)
interface PropsType {
  totalItem: number
  pageSize?: number
  pageIndex?: number
  count?: boolean
}

const emits = defineEmits(["pageIndex"]);
const { mobile } = useDisplay()

const props = withDefaults(defineProps<PropsType>(), {
  totalItem: 0,
  pageSize: 10,
  pageIndex: 1,
  count: true,
})

watch(
  () => props.pageIndex,
  () => {
    pageIndex.value = props.pageIndex;
  }
);

const totalPages = computed(() => {
  const pages = Math.ceil(props.totalItem / props.pageSize);
  return pages
})

const countPage = computed(() => {
  const total = props.totalItem;
  const start = (props.pageIndex - 1) * props.pageSize + 1;
  const end = Math.min(props.pageIndex * props.pageSize, total);
  return `Hiển thị từ ${start} đến ${end} trên ${total} bản ghi`;
});

const nextPage = () => {
  pageIndex.value++
  emits("pageIndex", pageIndex.value);
}

const prevPage = () => {
  pageIndex.value--
  emits("pageIndex", pageIndex.value);
}

const onChangePageIndex = () => {
  emits("pageIndex", pageIndex.value);
}

onMounted(() => {
  pageIndex.value = props.pageIndex;
})
</script>

<style lang="scss" scoped>
#pagination {
  padding: 10px;
  box-shadow: none;

  :deep(.v-row) {
    margin: -18px !important;
  }

  :deep(.v-pagination__prev) {
    button {
      background: var(--light-opacity-color-gray-gray-8, rgba(75, 70, 92, 0.08)) !important;
      color: inherit !important
    }
  }

  :deep(.v-pagination__next) {
    button {
      background: var(--light-opacity-color-gray-gray-8, rgba(75, 70, 92, 0.08)) !important;
      color: inherit !important
    }
  }
}
</style>
