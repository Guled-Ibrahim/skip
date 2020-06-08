<template>
  <div>
    <div
      class="flex justify-between py-6 flex items-center select-none border-2 border-none border-transparent"
      :class="{
        'bg-gray-900 text-white content-wrapper': getColourTheme,
        'bg-gray-200 text-black content-wrapper': !getColourTheme,
      }"
    >
      <router-link to>
        <div class="inline-flex items-center ml-16">
          <svg
            class="fill-current h-20 w-20"
            width="54"
            height="54"
            version="1.0"
            viewBox="0 0 800 600"
          >
            <path
              d="M273.6 210.5c-8 14-14.6 25.7-14.6 26 0 .3 16.8 29.7 37.3 65.3 20.5 35.6 43.6 75.6 51.2 88.9l14 24.3h77.1l1.5-2.8c10.4-18 35.2-61.2 64.7-112.5 19.9-34.5 36.2-63.1 36.2-63.5 0-.4-6.5-12-14.4-25.7l-14.4-25h-77.6l-3.1 5.5c-23.3 40.7-31.1 54-31.5 54-.3 0-8.4-13.5-17.9-30l-17.3-30h-76.6l-14.6 25.5zm118.9 62.2c21.5 37.2 40.7 70.7 42.8 74.5l3.9 6.8-21.2-.2-21.1-.3-42.9-74.3-42.8-74.2h42.3l39 67.7zM506.3 215c3.1 5.5 5.7 10.2 5.7 10.5 0 .3-9.4.5-20.9.5h-20.9l-6.1-10.5-6-10.5h42.5l5.7 10zm-59.4 10.6c5.3 9.1 5.9 10.9 4.9 12.7-3 5.9-28.1 48.7-28.3 48.5-1.3-1.7-11.5-20.2-11.5-21 0-.9 28.1-50.6 28.7-50.8.1 0 2.9 4.8 6.2 10.6zm-109.8 64.2l42.6 73.7-2.3 4c-1.2 2.2-4 7.1-6.2 10.8l-3.9 6.8-42.6-74c-23.5-40.6-42.7-74.2-42.7-74.6 0-1.1 11.4-20.5 12-20.5.3 0 19.7 33.2 43.1 73.8zM512 246.7c0 1.5-55.3 96.3-55.9 95.8-1.7-1-20.2-34.5-19.9-35.9.2-.8 8-14.8 17.3-31l17-29.6h20.8c11.4 0 20.7.3 20.7.7zm-76.1 133c-1.8 3.2-4.5 7.8-5.9 10.3l-2.6 4.5-21.3.3-21.3.2 3.8-6.7c2.1-3.8 4.7-8.5 5.9-10.5l2-3.8h42.6l-3.2 5.7z"
            />
          </svg>
          <span class="uppercase font-semibold tracking-wide text-xl brand-text"
            >vode</span
          >
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
        class="fill-current h-6 w-6 mr-16 transition duration-500 transform"
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
    },
  },
  computed: {
    getColourTheme() {
      return this.$store.state.darkMode;
    },
  },
};
</script>

<style src="../src/build.css">
@import url("https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap");
.brand-text {
  font-family: "Fjalla One", sans-serif;
}
</style>
