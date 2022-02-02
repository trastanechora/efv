<template>
  <div class="home">
    <h2>Berita Terkini</h2>
    <div class="container">
      <p v-if="isLoading" class="loader">Sedang memuat.. Mohon tunggu..</p>
      <div
        v-else
        v-for="(article, index) in articles"
        :key="index"
        class="article"
      >
        <Card
          :source="article.source.name"
          :author="article.author"
          :title="article.title"
          :url="article.urlToImage"
          :publishedAt="article.publishedAt"
          :content="article.content"
          :articleUrl="article.url"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  mounted() {
    this.$store.dispatch("fetchNews");
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
.container {
  display: flex;
  flex-wrap: wrap;
}
.article {
  width: 50%;
}
h2 {
  text-align: center;
}
.loader {
  justify-content: center;
  width: 100%;
  text-align: center;
}

@media screen and (max-width: 640px) {
  .article {
    width: 100%;
  }
}
</style>
