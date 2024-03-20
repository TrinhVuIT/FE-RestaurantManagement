<template>
  <IconBtn class="table-btn" v-bind="{ ...$attrs }">
    <VIcon>{{ icon }}</VIcon>
    <slot></slot>
  </IconBtn>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: String,
});
</script>
<style scoped>
.table-btn {
  cursor: pointer;
}
</style>
