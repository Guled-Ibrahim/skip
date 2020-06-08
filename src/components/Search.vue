<template>
  <div
    class="h-screen"
    :class="{
      'bg-gray-900 content-wrapper': getColourTheme,
      'bg-gray-200 content-wrapper': !getColourTheme,
    }"
  >
    <div class="flex flex-wrap w-full justify-center">
      <h1
        class="w-full text-center mb-10 mt-20"
        :class="{
          'text-white content-wrapper': getColourTheme,
          'text-black content-wrapper': !getColourTheme,
        }"
      >
        For those who
        <span class="italic font-medium text-xl">really</span> care about TV
        ratings.
      </h1>
      <div class="relative w-1/2 transition duration-500 transform ease-in-out hover:scale-105">
        <div class="relative">
          <input
            type="text"
            placeholder="Game Of Thrones..."
            class="py-4 px-2 w-full rounded-tr-lg rounded-tl-lg focus:outline-none capitalize text-2xl border-b-2 border-gray-200 px-12"
            :class="{
              'rounded-lg': searchResults <= 0,
              'shadow-xl': !getColourTheme,
            }"
            v-model="searchValue"
            @input="getSearchResults"
          />
          <svg
            class="fill-current h-8 w-8 absolute top-0 right-0 mt-4 ml-2 mr-2 opacity-50 text-gray-700"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z"
            />
          </svg>
        </div>
        <ul
          class="absolute top-20 right-0 w-full bg-white text-black rounded-br-lg rounded-bl-lg list-animation"
        >
          <router-link to="/chart">
            <li
              class="mb-2 ml-2 mr-2 mt-4 text-base hover:bg-gray-200 p-2 rounded-lg"
              v-for="result in searchResults"
              :key="result.id"
              @click="getShowRatings(result)"
              v-show="result.poster_path !== null"
            >
              <div class="flex items-center">
                <img
                  :src="'http://image.tmdb.org/t/p/w185' + result.poster_path"
                  alt
                  class="object-fit w-10 h-16 rounded mr-2"
                />
                <h1 class="text-xl ml-4" v-show="result.first_air_date !== undefined">
                  {{ result.name }}
                  <span class="text-xs ml-1 text-gray-700 opactity-75">
                    {{
                    result.first_air_date | moment("YYYY")
                    }}
                  </span>
                </h1>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getSearchResults() {
      if (this.searchValue === "" || this.searchValue === " ") {
        this.$store.commit("setsearchResults", null);
      } else {
        return this.$store.dispatch("loadSearchResults", this.searchValue);
      }
    },
    getShowRatings(result) {
      this.searchValue = result.name;
      this.$store.dispatch("loadData", result.id);
    }
  },
  computed: {
    getColourTheme() {
      return this.$store.state.darkMode;
    },
    searchValue: {
      get() {
        return this.$store.getters.getSearchValue;
      },
      set(value) {
        this.$store.commit("setSearchValue", value);
      }
    },
    searchResults() {
      return this.$store.getters.getsearchResults;
    }
  }
};
</script>

<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s ease-out;
}
</style>
