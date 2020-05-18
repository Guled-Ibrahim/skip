<template>
  <div>
    <div
      class="flex justify-between py-6 flex items-center select-none"
      :class="{
        'bg-gray-900 text-white': getColourTheme,
        'bg-gray-300 text-black': !getColourTheme,
      }"
    >
      <router-link to="/">
        <div class="flex items-center ml-16">
          <h1 class="uppercase font-semibold tracking-wide text-xl">vizod</h1>
          <svg class="fill-current h-6 w-6 ml-1" viewBox="0 0 20 20">
            <path
              d="M9.244 9.52L2.041 4.571C1.469 4.188 1 4.469 1 5.196v9.609c0 .725.469 1.006 1.041.625l7.203-4.951s.279-.199.279-.478c0-.28-.279-.481-.279-.481zm9.356.481c0 .279-.279.478-.279.478l-7.203 4.951c-.572.381-1.041.1-1.041-.625V5.196c0-.727.469-1.008 1.041-.625L18.32 9.52s.28.201.28.481z"
            />
          </svg>
        </div>
      </router-link>

      <!-- dark mode is ON icon -->
      <svg
        class="fill-current h-6 w-6 mr-16"
        viewBox="0 0 20 20"
        v-show="getColourTheme"
        @click="darkModeOff()"
      >
        <path
          d="M13.719 1.8A8.759 8.759 0 111.8 13.719c3.335 1.867 7.633 1.387 10.469-1.449 2.837-2.837 3.318-7.134 1.45-10.47z"
        />
      </svg>
      <!-- dark mode is OFF icon -->
      <svg
        class="fill-current h-6 w-6 mr-16"
        viewBox="0 0 20 20"
        v-show="!getColourTheme"
        @click="darkModeOn"
      >
        <path
          d="M19 9.199h-.98c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799H19c.552 0 1-.357 1-.799 0-.441-.449-.801-1-.801zM10 4.5A5.483 5.483 0 004.5 10c0 3.051 2.449 5.5 5.5 5.5 3.05 0 5.5-2.449 5.5-5.5S13.049 4.5 10 4.5zm0 9.5c-2.211 0-4-1.791-4-4 0-2.211 1.789-4 4-4a4 4 0 010 8zm-7-4c0-.441-.449-.801-1-.801H1c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799h1c.551 0 1-.358 1-.799zm7-7c.441 0 .799-.447.799-1V1c0-.553-.358-1-.799-1-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1zm0 14c-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1 .441 0 .799-.447.799-1v-1c0-.553-.358-1-.799-1zm7.365-13.234c.391-.391.454-.961.142-1.273s-.883-.248-1.272.143l-.7.699c-.391.391-.454.961-.142 1.273s.883.248 1.273-.143l.699-.699zM3.334 15.533l-.7.701c-.391.391-.454.959-.142 1.271s.883.25 1.272-.141l.7-.699c.391-.391.454-.961.142-1.274s-.883-.247-1.272.142zm.431-12.898c-.39-.391-.961-.455-1.273-.143s-.248.883.141 1.274l.7.699c.391.391.96.455 1.272.143s.249-.883-.141-1.273l-.699-.7zm11.769 14.031l.7.699c.391.391.96.453 1.272.143.312-.312.249-.883-.142-1.273l-.699-.699c-.391-.391-.961-.455-1.274-.143s-.248.882.143 1.273z"
        />
      </svg>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    darkModeOff() {
      this.$store.commit("setColourTheme", false);
      this.$store.commit("setChartColorTheme", "#000");
      this.$store.commit("setChartDatasets", "#000");
    },
    darkModeOn() {
      this.$store.commit("setColourTheme", true);
      this.$store.commit("setChartColorTheme", "#FFF");
      this.$store.commit("setChartDatasets", "#FFF");
    }
  },
  computed: {
    getColourTheme() {
      return this.$store.state.darkMode;
    }
  }
};
</script>
