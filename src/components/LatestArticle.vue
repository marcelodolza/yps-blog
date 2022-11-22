<template>
  <section class="LatestArticle text-light py-5">
    <div v-if="!loading && latestArticle" class="mx-auto container">
      <div class="row">
        <div class="col mb-4">
          <h2>Latest article</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-5 d-flex align-items-center">
          <figure>
            <nuxt-link :to="`/article/${latestArticle.id}`">
              <img
                class="d-block w-100"
                :src="latestArticle.image"
                :alt="latestArticle.title"
              />
            </nuxt-link>
          </figure>
        </div>
        <div class="col-12 col-md-7 d-flex align-items-center">
          <div class="p-4">
            <h3>{{ latestArticle.title }}</h3>
            <p class="mt-3 mb-4 small">
              {{ latestArticle.intro }}
            </p>
            <nuxt-link
              class="btn btn-primary text-dark rounded-0 border-0 px-4 py-2 small fw-semibold"
              :to="`/article/${latestArticle.id}`"
              >Read Article</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import useArticles from "~/composables/useArticles";
const { latestArticle, loading } = useArticles();
</script>

<style lang="scss" scoped>
.LatestArticle {
  background: rgb(1, 59, 78);
  background: linear-gradient(
    90deg,
    rgba(1, 59, 78, 1) 0%,
    rgba(13, 33, 43, 1) 100%
  );
  min-height: 465px;
}
</style>
