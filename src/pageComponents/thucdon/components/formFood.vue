<template>
  <v-row>
    <v-col cols="12">
      <AppTextField
        v-model="workingItem.foodName"
        :label="inputLabel.foodName?.label"
        :placeholder="inputLabel.foodName?.placeholder"
      />
    </v-col>
    <v-col cols="12" class="pt-0">
      <AppTextField
        v-model="workingItem.foodDescription"
        :label="inputLabel.foodDescription?.label"
        :placeholder="inputLabel.foodDescription?.placeholder"
      />
    </v-col>
    <v-col cols="12" class="pt-0">
      <AppTextField
        v-model="workingItem.foodPrice"
        :label="inputLabel.foodPrice?.label"
        :placeholder="inputLabel.foodPrice?.placeholder"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onBeforeMount, Ref, ref } from "vue";
import { IInputObject } from "@/interfaces/IFood";

const props = defineProps<IProps>();
const workingItem = ref({
  id: Number,
  foodName: String,
  foodDescription: String,
  foodPrice: Number,
});

interface IProps {
  id?: number;
  data: Ref<object>;
  getByIdService: (id: number) => Promise<any>;
  inputLabel: IInputObject;
}

onBeforeMount(async () => {
  await getById();
});

const getById = async () => {
  if (!props.id) return (workingItem.value = {});

  const result = await props.getByIdService(props.id);
  workingItem.value = result;
};
</script>
<style scoped></style>
