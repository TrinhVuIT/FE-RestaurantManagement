<script lang="ts" setup>
import { getAreaChartSplineConfig } from "../../../@core/libs/apex-chart/apexCharConfig";
import { computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";

const vuetifyTheme = useTheme();

const chartConfig = computed(() =>
  getAreaChartSplineConfig(vuetifyTheme.current.value)
);

const series = [
  {
    name: "Visits",
    data: [250, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 250],
  },
  {
    name: "Clicks",
    data: [250, 250, 250, 250, 150, 150, 150, 150, 250, 250, 250, 250, 250],
  },
  {
    name: "Sales",
    data: [150, 150, 150, 150, 150, 0, 0, 150, 150, 150, 150, 150, 150],
  },
];
</script>

<template>
  <VueApexCharts
    type="area"
    height="400"
    :options="chartConfig"
    :series="series"
  />
</template>
