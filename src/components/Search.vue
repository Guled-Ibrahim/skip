<template>
  <div
    class="h-screen flex items-center justify-center"
    :class="{ 'bg-gray-900': getColourTheme, 'bg-gray-300': !getColourTheme }"
  >
    <div class="flex items-center justify-center flex-wrap w-full">
      <h1
        class="w-full text-center mb-12"
        :class="{ 'text-white': getColourTheme, 'text-black': !getColourTheme }"
      >
        for those who
        <span class="italic font-medium text-normal">really</span> care about TV
        ratings.
      </h1>
      <input
        type="text"
        placeholder="Game Of Thrones"
        class="py-4 px-2 w-1/2 rounded focus:outline-none capitalize"
        v-model="searchValue"
      />
      <router-link to="/chart">
        <button
          class="bg-green-500 rounded ml-1 py-4 px-4 text-white focus:outline-none hover:bg-green-600"
          :class="{ 'shadow-xl': getColourTheme }"
          @click="getShowData()"
        >Search</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getShowData() {
      return this.$store.dispatch("loadData", this.searchValue);
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
    }
  }
};
</script>
