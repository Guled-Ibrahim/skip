<template>
  <div class="flex flex-wrap justify-center mt-8">
    <div
      class="m-1"
      v-for="result in getSearchResults"
      :key="result.id"
      v-show="result.poster_path !== null"
      @click="getShow(result)"
    >
      <router-link to="/chart">
        <img
          class="object-fit h-full w-full transition duration-500 transform hover:-translate-y-1 hover:scale-110"
          :src="'http://image.tmdb.org/t/p/w185/' + result.poster_path"
          alt
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getShow(selectedShow) {
      this.$store.dispatch("getSelectedShowData", selectedShow);
    }
  },
  computed: {
    getSearchResults() {
      return this.$store.state.searchResults;
    }
  }
};
</script>
