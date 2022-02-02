<template>
  <div class="item">
    <div class="container" @click="doRedirect">
      <div class="image">
        <img :src="url" alt="Gambar Ilustrasi" />
      </div>
      <div class="content">
        <span class="author">{{ author }}</span>
        <h4>{{ title }}</h4>
        <span class="published"
          >{{ publishedDate.toLocaleDateString("id-ID", options) }} -
          {{ publishedDate.toLocaleTimeString("id-ID") }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    index: Number,
    source: String,
    author: String,
    title: String,
    url: String,
    publishedAt: String,
    content: String,
    articleUrl: String,
  },
  computed: {
    publishedDate() {
      return new Date(this.publishedAt);
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
    doRedirect() {
      this.$store.dispatch("selectArticle", {
        source: this.source,
        author: this.author,
        title: this.title,
        url: this.url,
        publishedAt: this.publishedAt,
        content: this.content,
        articleUrl: this.articleUrl,
      });
      const sanitizeTitle = this.title.toLowerCase().replace(/\s+/g, "-");
      this.$router.push(`/${sanitizeTitle}`);
    },
  },
};
</script>

<style scoped>
.item {
  padding: 12px;
  border-radius: 4px;
}
.container {
  display: flex;
  background-color: rgb(227, 238, 232);
  min-height: 150px;
  cursor: pointer;
}
.image {
  width: 30%;
  margin-block: auto;
}
.content {
  width: 70%;
  padding: 4px 12px;
}
img {
  max-width: 100%;
  max-height: 100%;
}
h4 {
  padding: auto;
}
.published {
  font-size: small;
}
.author {
  font-size: small;
  font-weight: 600;
}
</style>
