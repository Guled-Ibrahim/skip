<template>
  <div>
    <!-- navigation -->
    <div class="flex items-center bg-gray-900 py-4 px-4">
      <router-link to="/">
        <h1
          class="text-white uppercase font-extrabold text-xl tracking-widest ml-6 select-none"
        >
          skip
        </h1>
      </router-link>
      <div class="flex justify-center flex-grow">
        <input
          type="text"
          v-model="searchInput"
          placeholder="game of thrones..."
          class="rounded-lg p-2 appearance-none w-1/2 placeholder-gray-500 outline-none"
        />

        <router-link to="/results">
          <button
            @click="requestShowAPI()"
            class="bg-green-500 hover:bg-green-600 text-white text-normal rounded-lg ml-2 p-2"
          >
            Search
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    requestShowAPI() {
      this.$store.dispatch("loadData", this.searchInput);
    },
  },
};
</script>
