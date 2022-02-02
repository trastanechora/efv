import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

import { mockData } from "../assets/mock";

const API_KEY = "2855be0bd75a436cb0f78dd5e74313cf";

Vue.use(Vuex);
const persistedstate = createPersistedState({
  paths: ["currentArticle"],
});

export default new Vuex.Store({
  plugins: [persistedstate],
  state: {
    articles: [],
    isLoading: false,
    currentArticle: {},
  },
  mutations: {
    setArticles(state, payload) {
      state.articles = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setCurrentArticle(state, payload) {
      state.currentArticle = payload;
    },
  },
  actions: {
    fetchNews(store) {
      store.commit("setLoading", true);
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=id&category=technology&apiKey=${API_KEY}`
        )
        .then((response) => {
          store.commit("setArticles", response.data.articles);
          store.commit("setLoading", false);
        })
        .catch(() => {
          store.commit("setArticles", mockData.articles);
          store.commit("setLoading", false);
        });
    },
    selectArticle(store, payload) {
      store.commit("setCurrentArticle", payload);
    },
  },
  modules: {},
});
