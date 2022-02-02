<template>
  <div class="detail">
    <img :src="currentArticle.url" alt="Banner" />
    <h2>{{ currentArticle.title }}</h2>
    <div class="attribute">
      <div>{{ currentArticle.author }}</div>
      <div>
        {{ publishedDate.toLocaleDateString("id-ID", options) }} -
        {{ publishedDate.toLocaleTimeString("id-ID") }}
      </div>
    </div>
    <p>{{ currentArticle.content }}</p>
    <div v-if="currentArticle.articleUrl">
      Lanjutkan baca ke: <a :href="currentArticle.articleUrl">Sini</a>
    </div>
    <button @click="doBack">Kembali</button>
  </div>
</template>

<script>
export default {
  name: "Detail",
  computed: {
    currentArticle() {
      return this.$store.state.currentArticle;
    },
    publishedDate() {
      return new Date(this.currentArticle.publishedAt);
    },
  },
  data() {
    return {
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    };
  },
  methods: {
    doBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
img {
  width: 100%;
}
.attribute {
  display: flex;
  place-content: space-between;
  margin: 0 12px;
}
</style>
