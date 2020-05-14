import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
/* import Axios from "axios";
 */
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    searchResults: [],
    numberOfSeasons: 1,
    numberOfEpisodes: [],
    currentSeason: 1,
    currentShow: {},
    chartOptions: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 1,
        shape: "circle",
      },
      xaxis: {
        categories: [],
      },
    },
    chartSeries: [
      {
        data: [],
      },
    ],
  },
  mutations: {
    setSearchResults(state, results) {
      state.searchResults = results;
    },
    setNumberOfSeasons(state, seasons) {
      state.numberOfSeasons = seasons;
    },
    setCurrentShow(state, show) {
      state.currentShow = show;
    },
    setNumberOfEpisodes(state, episodes) {
      state.numberOfEpisodes = episodes;
    },
    setChartOptions(state, options) {
      state.chartOptions.xaxis.categories = options;
    },
    setChartSeries(state, series) {
      state.chartSeries[0].data = series;
    },
  },
  getters: {
    getEpisodes(state) {
      return state.episodes;
    },
    getChartOptions(state) {
      return state.chartOptions;
    },
    getChartSeries(state) {
      return state.chartSeries;
    },
  },

  actions: {
    getSelectedShowData({ commit }, selectedShow) {
      commit("setCurrentShow", selectedShow);
      Axios.get(
        `https://api.themoviedb.org/3/tv/${selectedShow.id}?api_key=59bda62ded2729b78f8c16ed9bfd9896&language=en-US`
      ).then((res) => {
        commit("setNumberOfSeasons", res.data.number_of_seasons);
        Axios.get(
          `https://api.themoviedb.org/3/tv/${this.state.currentShow.id}/season/${this.state.currentSeason}?api_key=59bda62ded2729b78f8c16ed9bfd9896&language=en-US`
        ).then((res) => {
          commit("setNumberOfEpisodes", res.data.episodes);
          let options = res.data.episodes.map(
            (episode) => episode.episode_number
          );
          let series = res.data.episodes.map((episode) => episode.vote_average);
          commit("setChartOptions", options);
          commit("setChartSeries", series);
        });
      });
    },
  },
});
