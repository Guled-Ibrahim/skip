<template>
  <div class="h-screen" :class="{ 'bg-gray-900': getColourTheme, 'bg-gray-300': !getColourTheme }">
    <div
      class="grid grid-cols-12 grid-rows-6 row-gap-6"
      :class="{ 'text-white': getColourTheme, 'text-black': !getColourTheme }"
    >
      <!-- season selector -->
      <div class="col-span-12 mt-12">
        <div class="flex justify-center items-center">
          <svg
            class="fill-current h-6 w-6 mr-10"
            viewBox="0 0 20 20"
            @click="decrementSeason()"
            v-show="getCurrentSeason >= 2"
          >
            <path
              d="M12.452 4.516c.446.436.481 1.043 0 1.576L8.705 10l3.747 3.908c.481.533.446 1.141 0 1.574-.445.436-1.197.408-1.615 0-.418-.406-4.502-4.695-4.502-4.695a1.095 1.095 0 010-1.576s4.084-4.287 4.502-4.695c.418-.409 1.17-.436 1.615 0z"
            />
          </svg>
          <h1 class="uppercase select-none">
            season
            <span class="ml-2">{{ getCurrentSeason }}</span>
          </h1>
          <svg
            class="fill-current h-6 w-6 ml-10"
            viewBox="0 0 20 20"
            @click="incrementSeason()"
            v-show="getCurrentSeason <= getTotalSeasons - 1"
          >
            <path
              d="M9.163 4.516c.418.408 4.502 4.695 4.502 4.695a1.095 1.095 0 010 1.576s-4.084 4.289-4.502 4.695c-.418.408-1.17.436-1.615 0-.446-.434-.481-1.041 0-1.574L11.295 10 7.548 6.092c-.481-.533-.446-1.141 0-1.576.445-.436 1.197-.409 1.615 0z"
            />
          </svg>
        </div>
      </div>
      <div class="col-span-12 row-span-3 ml-12 mr-12">
        <line-chart
          v-show="getShowRatings.length > 0"
          :min="0"
          :max="10"
          height="100%"
          :discrete="true"
          :data="getShowRatings"
          :colors="['#FFF']"
          :curve="true"
          :dataset="getChartDatasets"
          :library="getChartColorTheme"
        ></line-chart>
      </div>
      <div
        class="col-span-8 row-span-4 ml-16 mt-6"
        :class="{ 'text-white': getColourTheme, 'text-black': !getColourTheme }"
      >
        <div class="flex">
          <img
            v-show="getEpisodePosterURL === null"
            class="object-fit h-48 w-32 rounded mt-2 ml-2 shadow-xl"
            src="https://disc5.hdstream.download/assets/lp02/img/no_poster.jpg"
            alt
          />

          <img
            v-show="getEpisodePosterURL !== null"
            class="object-fit h-48 w-32 rounded mt-2 ml-2 shadow-xl"
            :src="getEpisodePosterURL"
            alt
          />
          <div class="ml-6">
            <h1 class="text-4xl tracking-wide font-bold mb-2">{{ getShowTitle }}</h1>
            <div class="flex flex-wrap items-center">
              <h1 class="text-base tracking-wide font-bold">{{ getShowGenre }} &#8226;</h1>
              <h1 class="text-base tracking-wide font-bold ml-2">{{ getShowRuntime }} &#8226;</h1>
              <h1 class="text-base tracking-wide font-bold ml-2">{{ getShowYear | moment('YYYY') }}</h1>
              <p class="mt-6 w-full">{{getShowOverview}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    incrementSeason() {
      if (this.getCurrentSeason <= this.getTotalSeasons - 1) {
        this.$store.commit("incrementSeason");
        this.$store.dispatch("loadData", this.$store.getters.getSearchValue);
      }
    },
    decrementSeason() {
      if (this.getCurrentSeason >= 2) {
        this.$store.commit("decrementSeason");
        this.$store.dispatch("loadData", this.$store.getters.getSearchValue);
      }
    }
  },
  computed: {
    getShowRatings() {
      return this.$store.getters.getEpisodeRatings;
    },
    getColourTheme() {
      return this.$store.getters.getColourTheme;
    },
    getChartColorTheme() {
      return this.$store.getters.getChartColorTheme;
    },
    getColorLine() {
      return this.$store.getters.getColorLine;
    },
    getChartDatasets() {
      return this.$store.getters.getChartDatasets;
    },
    getCurrentSeason() {
      return this.$store.getters.getCurrentSeason;
    },
    getEpisodes() {
      return this.$store.getters.getEpisodes;
    },
    getEpisodePosterURL() {
      return this.$store.getters.getEpisodePosterURL;
    },
    getShowTitle() {
      return this.$store.getters.getShowTitle;
    },
    getShowGenre() {
      return this.$store.getters.getShowGenre;
    },
    getShowRuntime() {
      return this.$store.getters.getShowRuntime;
    },
    getShowYear() {
      return this.$store.getters.getShowYear;
    },
    getShowOverview() {
      return this.$store.getters.getShowOverview;
    },
    getTotalSeasons() {
      return this.$store.getters.getTotalSeasons;
    }
  }
};
</script>
