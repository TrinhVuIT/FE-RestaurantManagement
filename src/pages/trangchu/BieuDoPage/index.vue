<script lang="ts" setup>
//bảng 1
import ApexChartAreaChart from "./ApexChartAreaChart.vue";
//bảng 4
import ApexChartBalance from "./ApexChartBalance.vue";
//bảng 7
import ApexChartDailySalesStates from "./ApexChartDailySalesStates.vue";
//bảng 2
import ApexChartDataScience from "./ApexChartDataScience.vue";
//namgr 10
import ApexChartExpenseRatio from "./ApexChartExpenseRatio.vue";
//bảng 5
import ApexChartHorizontalBar from "./ApexChartHorizontalBar.vue";
//bảng 9
import ApexChartMobileComparison from "./ApexChartMobileComparison.vue";
//bảng 3
import ApexChartNewTechnologiesData from "./ApexChartNewTechnologiesData.vue";
//bảng 8
import ApexChartStatistics from "./ApexChartStatistics.vue";
//bảng 6
import ApexChartStocksPrices from "./ApexChartStocksPrices.vue";
</script>

<template>
  <VRow id="apex-chart-wrapper">
    <!-- 👉  Area chart -->
    <VCol cols="12">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Biểu đồ khu vực</VCardTitle>
          <VCardSubtitle>Mạng lưới thương mại</VCardSubtitle>

          <template #append>
            <div class="date-picker-wrapper">
              <AppDateTimePicker
                model-value="2022-06-09"
                prepend-inner-icon="tabler-calendar"
                density="compact"
                :config="{ position: 'auto right' }"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartAreaChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Data Science -->
    <VCol cols="12">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Khoa học dữ liệu</VCardTitle>

          <template #append>
            <div class="date-picker-wrapper">
              <AppDateTimePicker
                model-value="2022-06-09"
                prepend-inner-icon="tabler-calendar"
                density="compact"
                :config="{ position: 'auto right' }"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartDataScience />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 New Technologies Data -->
    <VCol cols="12">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Dữ liệu công nghệ mới</VCardTitle>

          <template #append>
            <VBtnToggle
              density="compact"
              color="primary"
              variant="outlined"
              divided
            >
              <VBtn>Daily</VBtn>
              <VBtn>Monthly</VBtn>
              <VBtn>Yearly</VBtn>
            </VBtnToggle>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartNewTechnologiesData />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Balance Line Chart  -->
    <VCol cols="12">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Sự cân bằng</VCardTitle>
          <VCardSubtitle>Mạng lưới thương mại &amp; doanh nghiệp</VCardSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <h6 class="text-h6 me-3">$221,267</h6>
              <VChip label color="success">
                <VIcon start icon="tabler-arrow-up" size="15" />
                <span>22%</span>
              </VChip>
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartBalance />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Balance Horizontal Bar -->
    <VCol cols="12" md="6">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Sự cân bằng</VCardTitle>
          <VCardSubtitle>$74,382.72</VCardSubtitle>

          <template #append>
            <div class="date-picker-wrapper">
              <AppDateTimePicker
                model-value="2022-06-09"
                prepend-inner-icon="tabler-calendar"
                density="compact"
                :config="{ position: 'auto right' }"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartHorizontalBar />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Stocks Prices -->
    <VCol cols="12" md="6">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Giá cổ phiếu</VCardTitle>
          <VCardSubtitle>$50,863.98</VCardSubtitle>

          <template #append>
            <div class="date-picker-wrapper">
              <AppDateTimePicker
                model-value="2022-06-09"
                prepend-inner-icon="tabler-calendar"
                density="compact"
                :config="{ position: 'auto right' }"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartStocksPrices />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Daily Sales States -->
    <VCol cols="12" md="6">
      <VCard title="Kỳ bán hàng hàng ngày">
        <VCardText>
          <ApexChartDailySalesStates />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Statistics -->
    <VCol cols="12" md="6">
      <VCard title="Số liệu thống kê">
        <VCardText>
          <ApexChartStatistics />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Mobile Comparison -->
    <VCol cols="12" md="6">
      <VCard title="So sánh điện thoại di động">
        <VCardText>
          <ApexChartMobileComparison />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Expense Ratio Chart -->
    <VCol cols="12" md="6">
      <VCard
        title="Tỷ lệ chi phí"
        subtitle="Chi tiêu cho các hạng mục khác nhau"
      >
        <VCardText>
          <ApexChartExpenseRatio />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "../../../@core/scss/template/libs/apex-chart.scss";

.date-picker-wrapper {
  inline-size: 10.5rem;
}

#apex-chart-wrapper {
  .v-card-item__append {
    padding-inline-start: 0;
  }
}
</style>
