import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
const persistedstate = createPersistedState({
  paths: ["tasks"],
});

export default new Vuex.Store({
  plugins: [persistedstate],
  state: {
    tasks: [],
  },
  mutations: {
    setNewTask(state, { title }) {
      state.tasks.push({ title, description: "" });
    },
    setTasks(state, payload) {
      state.tasks = payload;
    },
    removeTask(state, { index }) {
      state.tasks = state.tasks.filter(
        (_, currentIndex) => currentIndex !== index
      );
    },
  },
  actions: {
    addTask(store, payload) {
      store.commit("setNewTask", payload);
    },
    editTask(store, payload) {
      const newTasks = store.state.tasks.map((currentTask, currentIndex) => {
        if (currentIndex === payload.index) {
          return payload.task;
        }
        return currentTask;
      });
      store.commit("setTasks", newTasks);
    },
    deleteTask(store, payload) {
      store.commit("removeTask", { index: payload.index });
    },
    editDescription(store, { index, description }) {
      console.warn("editing", {
        index,
        description,
      });
      const newTasks = store.state.tasks.map((currentTask, currentIndex) => {
        if (currentIndex === index) {
          return {
            title: currentTask.title,
            description,
          };
        }
        return currentTask;
      });
      store.commit("setTasks", newTasks);
    },
  },
  modules: {},
});
