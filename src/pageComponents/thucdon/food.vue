<template>
  <app-data-table click-row
                  title-table="Quản lý món ăn"
                  placeholder-search="Tìm tên món ăn"
                  :headers="headers"
                  :services="services"
                  :create-dialog="createDialog"
                  :update-dialog="updateDialog"
                  :navigation-item-id="itemDetail?.id"
  >
  <template #actionDelete><div></div></template>

  <template #addOrEditForm = "{item, data}">
    
  </template>
  </app-data-table>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

</script>
