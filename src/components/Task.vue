<template>
  <div class="item">
    <div class="content" v-if="!isEdit" @click="doRedirect">
      {{ index + 1 }}. {{ task.title }}
    </div>
    <div class="content" v-else>
      <div class="indexNumber">{{ index + 1 }}.</div>
      <input type="text" v-model="edittedTask" />
    </div>
    <div class="action"><button @click="doDelete">Hapus</button></div>
    <div class="action">
      <button v-if="!isEdit" @click="isEdit = true">Edit</button>
      <button v-else @click="doEdit">Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    index: Number,
    task: {
      title: String,
      description: String,
    },
  },
  data() {
    return {
      isEdit: false,
      edittedTask: "",
    };
  },
  mounted() {
    this.edittedTask = this.task.title;
  },
  methods: {
    doEdit() {
      this.$emit("edit-task", {
        index: this.index,
        task: {
          title: this.edittedTask,
          description: this.description,
        },
      });
      this.isEdit = false;
    },
    doDelete() {
      this.$emit("delete-task", this.index);
    },
    doRedirect() {
      this.$router.push(`/${this.index}`);
    },
  },
};
</script>

<style scoped>
.item {
  display: flex;
  padding: 4px 8px;
  margin: 12px 0;
}
.content {
  display: flex;
  width: 80%;
}
.action {
  width: 10%;
  text-align: center;
}
input {
  width: 95%;
}
.indexNumber {
  width: 5%;
}
</style>
