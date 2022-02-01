<template>
  <div class="home">
    <button @click="doBack">Kembali</button>
    <h2>{{ currentTask.title }}</h2>
    <p v-if="!currentTask.description && !isEdit">Belum ada deskripsi nih</p>
    <p v-else>{{ currentTask.description }}</p>

    <div v-if="isEdit">
      <div class="editInput">
        <input type="text" v-model="currentDescription" class="inputField" />
        <button @click="doChangeDescription" class="inputButton">Simpan</button>
      </div>
    </div>
    <button v-else @click="isEdit = true">Ubah Deskripsi</button>
  </div>
</template>

<script>
export default {
  name: "Detail",
  computed: {
    currentIndex() {
      return parseInt(this.$route.params.id);
    },
    currentTask() {
      console.warn("tasks", this.$store.state.tasks);
      return this.$store.state.tasks[this.currentIndex];
    },
  },
  data() {
    return {
      isEdit: false,
      currentDescription: "",
    };
  },
  methods: {
    doBack() {
      this.$router.back();
    },
    doChangeDescription() {
      console.warn("this.currentDescription", this.currentDescription);
      this.$store.dispatch("editDescription", {
        description: this.currentDescription,
        index: this.currentIndex,
      });
      this.isEdit = false;
    },
  },
};
</script>

<style scoped>
.editInput {
  display: flex;
}
.inputField {
  width: 90%;
}
.inputButton {
  width: 10%;
}
</style>
