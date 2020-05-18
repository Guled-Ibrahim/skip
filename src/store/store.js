import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    searchValue: null,
    darkMode: true,
    currentSeason: 1,
    episodeRatings: [],
    episodes: [],
    EpisodePosterURL: null,
    totalSeasons: null,
    Title: null,
    Genre: null,
    Runtime: null,
    Year: null,
    Overview: null,
    LineColor: ["#FFF"],
    datasets: {
      borderColor: "white",
      pointBackgroundColor: "white",
      pointBorderColor: "white",
    },
    ChartColorTheme: {
      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#FFF", // this here
              },
              gridLines: {
                zeroLineColor: "#FFF",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "#FFF",
                zeroLineColor: "#FFF",
              },
              ticks: {
                display: true,
                fontColor: "#FFF",
              },
            },
          ],
        },
      },
    },
  },
  mutations: {
    setColourTheme(state, status) {
      state.darkMode = status;
    },
    setSearchValue(state, value) {
      state.searchValue = value;
    },
    setEpisodeRatings(state, ratings) {
      state.episodeRatings.push(ratings);
    },
    setChartColorTheme(state, colorCode) {
      /* xAxes color */
      state.ChartColorTheme.options.scales.xAxes[0].ticks.fontColor = colorCode;
      state.ChartColorTheme.options.scales.xAxes[0].gridLines.zeroLineColor = colorCode;
      /* yAxes color */
      state.ChartColorTheme.options.scales.yAxes[0].gridLines.color = colorCode;
      state.ChartColorTheme.options.scales.yAxes[0].gridLines.zeroLineColor = colorCode;
      state.ChartColorTheme.options.scales.yAxes[0].ticks.fontColor = colorCode;
    },
    setChartDatasets(state, color) {
      state.datasets.borderColor = color;
      state.datasets.pointBorderColor = color;
      state.datasets.pointBackgroundColor = color;
    },
    setEpisodes(state, episodeArray) {
      state.episodes = [];
      state.episodes = episodeArray;
    },
    setEpisodePosterURL(state, URL) {
      state.EpisodePosterURL = URL;
    },
    setShowTitle(state, title) {
      state.Title = title;
    },
    setShowGenre(state, genre) {
      state.Genre = genre;
    },
    setShowRuntime(state, runtime) {
      state.Runtime = runtime;
    },
    setShowYear(state, year) {
      state.Year = year;
    },
    setShowOverview(state, overview) {
      state.Overview = overview;
    },
    incrementSeason(state) {
      state.currentSeason++;
    },
    decrementSeason(state) {
      state.currentSeason--;
    },
    setTotalSeasons(state, total) {
      state.totalSeasons = total;
    },
  },
  getters: {
    getColourTheme(state) {
      return state.darkMode;
    },
    getSearchValue(state) {
      return state.searchValue;
    },
    getEpisodeRatings(state) {
      return state.episodeRatings;
    },
    getChartColorTheme(state) {
      return state.ChartColorTheme.options;
    },
    getColorLine(state) {
      return state.LineColor;
    },
    getChartDatasets(state) {
      return state.datasets;
    },
    getCurrentSeason(state) {
      return state.currentSeason;
    },
    getEpisodes(state) {
      return state.episodes;
    },
    getEpisodePosterURL(state) {
      return state.EpisodePosterURL;
    },
    getShowTitle(state) {
      return state.Title;
    },
    getShowGenre(state) {
      return state.Genre;
    },
    getShowRuntime(state) {
      return state.Runtime;
    },
    getShowYear(state) {
      return state.Year;
    },
    getShowOverview(state) {
      return state.Overview;
    },
    getTotalSeasons(state) {
      return state.totalSeasons;
    },
  },
  actions: {
    loadData({ commit }, input) {
      this.state.episodes = [];
      this.state.episodeRatings = [];
      Axios.get(`https://www.omdbapi.com/?t=${input}&apikey=e019e030`).then(
        (res) => {
          let Id = res.data.imdbID;
          commit("setShowTitle", res.data.Title);
          commit("setShowGenre", res.data.Genre);
          commit("setShowRuntime", res.data.Runtime);
          commit("setShowYear", res.data.Released);
          commit("setShowOverview", res.data.Plot);
          Axios.get(
            `https://www.omdbapi.com/?t=${res.data.imdbID}&Season=${this.state.currentSeason}&apikey=e019e030`
          ).then((res) => {
            res.data.Episodes.forEach((episode) => {
              let arr = [
                "Ep." + " " + episode.Episode,
                parseFloat(episode.imdbRating),
              ];
              commit("setEpisodeRatings", arr);
              commit("setEpisodes", res.data.Episodes);
              commit("setTotalSeasons", res.data.totalSeasons);
            });
          });

          Axios.get(
            `https://img.omdbapi.com/?i=${Id}&h=600&apikey=e019e030`
          ).then((res) => {
            commit("setEpisodePosterURL", res.config.url);
          });
        }
      );
    },
  },
});
