<template>
  <VLocaleProvider>
    <VApp>
      <VAppBar>
        <v-row>
          <marquee>
            <a href="#">Sample</a>
            <a href="#">Sample</a>
            <a href="#">Sample</a>
          </marquee>
        </v-row>
      </VAppBar>
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
a {
  margin-right: 2em;
}
</style>
