<template>
  <div class="home">
    <h2>Todo List</h2>
    <div class="taskList">
      <div
        class="taskItem"
        v-for="(taskItem, indexItem) in tasks"
        :key="indexItem.title"
      >
        <TaskItem
          :task="taskItem"
          :index="indexItem"
          @edit-task="editTask"
          @delete-task="deleteTask"
        />
      </div>
    </div>
    <div class="userInput">
      <input type="text" v-model="currentTask" />
      <div class="inputButton">
        <button @click="addTask">Tambahkan</button>
      </div>
    </div>
    <div v-if="tasks.length > 3" class="messages">Hebat!</div>
  </div>
</template>

<script>
import TaskItem from "@/components/Task.vue";

export default {
  name: "Home",
  components: {
    TaskItem,
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  data() {
    return {
      currentTask: "",
    };
  },
  methods: {
    addTask() {
      this.$store.dispatch("addTask", {
        title: this.currentTask,
      });
      this.currentTask = "";
    },
    editTask({ index, task }) {
      this.$store.dispatch("editTask", { index, task });
    },
    deleteTask(index) {
      this.$store.dispatch("deleteTask", { index });
    },
  },
};
</script>

<style scoped>
.userInput {
  width: 100%;
  display: flex;
}
input {
  width: 80%;
}
.inputButton {
  width: 20%;
  text-align: center;
}
</style>
