<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <app-text-field
        counter
        maxlength="55"
        v-model="workingItem.foodName"
        :label="inputLabel.foodName?.label"
      />
    </v-col>
    <v-col cols="12" class="pt-0">
      <app-text-field
        counter
        maxlength="55"
        v-model="workingItem.foodDescription"
        :label="inputLabel.foodDescription?.label"
      />
    </v-col>
    <v-col cols="12">
      <app-text-field
        counter
        maxlength="55"
        v-model="workingItem.foodPrice"
        :label="inputLabel.foodPrice?.label"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onBeforeMount, Ref, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { IUpdateRequest, IInputObject } from "@/interfaces/IFood";

const props = defineProps<IProps>();
const route = useRoute();
const idFood = Number(route.params.id);
const workingItem = ref({
  id: idFood,
  foodName: String,
  foodDescription: String,
  foodPrice: Number,
});

interface IProps {
  id?: number;
  data: Ref<object>;
  getByIdService?: (id: number) => Promise<any>;
  inputLabel: IInputObject;
}

onBeforeMount(async () => {
  await getById();
});

const getById = async () => {
  if (!props.id) return;

  const result = await props.getByIdService(props.id);

  workingItem.value = {
    ...result
  };
};
</script>
<style scoped></style>
