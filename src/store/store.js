import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tmdbId: null,
    searchValue: null,
    darkMode: true,
    currentSeason: 1,
    episodeRatings: {},
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
    searchResults: [],
  },
  mutations: {
    setColourTheme(state, status) {
      state.darkMode = status;
    },
    setSearchValue(state, value) {
      state.searchValue = value;
    },
    setEpisodeRatings(state, ratings) {
      /*       state.episodeRatings.push(ratings);
       */
      state.episodeRatings = ratings;
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
    setsearchResults(state, results) {
      state.searchResults = results;
    },
    settmdbId(state, id) {
      state.tmdbId = id;
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

    getsearchResults(state) {
      return state.searchResults;
    },
    gettmdbId(state) {
      return state.tmdbId;
    },
  },
  actions: {
    async loadData({ commit }, input) {
      this.state.episodes = [];
      this.state.episodeRatings = [];
      commit("settmdbId", input);
      let IMdbId = await Axios.get(
        `https://api.themoviedb.org/3/tv/${input}?api_key=59bda62ded2729b78f8c16ed9bfd9896&append_to_response=external_ids `
      );
      await commit("setEpisodePosterURL", IMdbId.data.poster_path);
      let showData = await Axios.get(
        `http://www.omdbapi.com/?i=${IMdbId.data.external_ids.imdb_id}&apikey=e019e030`
      );
      await commit("setShowTitle", showData.data.Title);
      await commit("setShowGenre", showData.data.Genre);
      await commit("setShowRuntime", showData.data.Runtime);
      await commit("setShowYear", showData.data.Released);
      await commit("setShowOverview", showData.data.Plot);
      let episodeData = await Axios.get(
        `https://www.omdbapi.com/?i=${IMdbId.data.external_ids.imdb_id}&Season=${this.state.currentSeason}&apikey=e019e030`
      );
      await commit("setTotalSeasons", episodeData.data.totalSeasons);
      let lineChartData = await episodeData.data.Episodes.reduce(
        (accumulator, episode) => {
          return { ...accumulator, [episode.Episode]: episode.imdbRating };
        },
        {}
      );
      await commit("setEpisodeRatings", lineChartData);
    },
    loadSearchResults({ commit }, searchValue) {
      Axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=59bda62ded2729b78f8c16ed9bfd9896&language=en-US&page=1&query=${searchValue}&include_adult=false`
      ).then((res) => {
        let topResults = [];
        res.data.results.forEach((result, index) => {
          if (index <= 3) topResults.push(result);
        });
        commit("setsearchResults", topResults);
      });
    },
  },
});
