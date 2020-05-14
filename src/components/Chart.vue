<template>
  <apexchart width="500" height="500" :options="getChartOptions" :series="getChartSeries"></apexchart>
</template>

<script>
export default {
  computed: {
    getChartOptions() {
      return this.$store.getters.getChartOptions;
    },
    getChartSeries() {
      return this.$store.getters.getChartSeries;
    }
  }
};
</script>
