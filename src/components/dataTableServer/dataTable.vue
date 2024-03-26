<template>
  <v-data-table class="custom-table" v-model="selected" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-bind="slotProps || []" :name="name" />
    </template>
    <template #colum.data-table-select>
      <v-checkbox
        v-model="selectedAll"
        ref="selectedAllRef"
        color="#D27A12"
        :indeterminate="
          !selectedAll[0] &&
          selected.some((i) => i) &&
          selected.length < items.length
        "
        @click="onClickCheckboxAll"
      />
    </template>
    <template #item.data-table-select="{ item, isSelected }">
      <v-checkbox
        v-if="item.raw.selectable"
        :model-value="true"
        :disabled="item.raw.selectable"
      />
      <v-checkbox
        v-else-if="item.raw.disable"
        indeterminate
        :disabled="item.raw.disable"
      />
      <v-checkbox
        v-model="selected"
        v-else
        :value="item.raw.id"
        @click="(e: any) => onClickCheckbox(e, isSelected, item.raw.id)"
      />
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
import {VDataTable} from "vuetify/labs/VDataTable";
import { ref, useAttrs, watchEffect } from "vue";

defineProps<{
  select: number[];
}>();
const emit = defineEmits(["update:select"]);
const selected = ref([]);
const selectedAll = ref([]);
const selectedAllRef = ref();
const items = ref([]);
const count = ref(0);
const attrs = useAttrs();

watchEffect(() => {
  items.value = attrs.items
    .filter((i: any) => !i.selecttable && !i.disable)
    .map((i: any) => i.id);
  emit("update:select", selected.value);
});

watch(
  () => attrs.loading,
  () => {
    selected.value = [];
  }
);

const onClickCheckboxAll = () => {
  selected.value = selectedAll.value[0] ? [] : items.value;
  count.value = selectedAll.value[0] ? 0 : items.value.length;
};

const onClickCheckbox = (event: any, isSelected: Function, id: number) => {
  if (selected.value.some((i) => i == id)) count.value--;
  else count.value++;

  event.stopPropagation();
  isSelected([id]);

  if (count.value == items.value.length) selectedAll.value = [true];
  else selectedAll.value = [];
};
</script>

<style scoped>
:deep(.v-data-table-header__content) {
  justify-content: unset!important;
}
</style>
