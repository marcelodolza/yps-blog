<template>
  <main>
    <article v-if="!loading && article" class="py-5">
      <header class="mb-5 pb-3 text-center">
        <div class="mx-auto container">
          <h1 class="text-capitalize my-5">{{ article.title }}</h1>
          <div class="row">
            <div
              class="col-12 col-md-8 mx-auto bg-secondary border-3 border-top mt-3 border-primary"
            >
              <p class="py-4 mt-4 text-uppercase text-muted small fw-semibold">
                {{ formatDate(article.createdAt) }}
                <span class="px-3 fw-light">|</span>
                {{ article.author }}
              </p>

              <p class="mb-4 lh-lg fw-semibold px-4 mb-5">
                {{ article.intro }}
              </p>
            </div>
          </div>
        </div>

        <div class="mx-auto container px-0">
          <div class="row">
            <div class="col-12 col-md-10 mx-auto lh-lg">
              <figure class="mb-0">
                <img
                  :src="article.image"
                  class="w-100 d-block"
                  :alt="article.title"
                />
              </figure>
            </div>
          </div>
        </div>
        <div class="mx-auto container d-none d-sm-block">
          <div class="row">
            <div
              class="col-12 col-md-8 mx-auto bg-secondary"
              style="height: 8rem"
            ></div>
          </div>
        </div>
      </header>

      <div class="mx-auto container mb-5">
        <div class="row">
          <div class="col-12 col-md-8 mx-auto lh-lg mb-5">
            <b class="text-primary mb-3 fs-5 d-block text-capitalize">{{
              article.title
            }}</b>
            <div class="fw-light fs-5">
              {{ article.text }}
            </div>
          </div>
          <div class="col-12 col-md-8 mx-auto mb-5">
            <b class="fs-5">Share:</b>
          </div>
        </div>
      </div>
    </article>
    <RelatedNewsArticles />
  </main>
</template>

<script lang="ts" setup>
import { formatDate } from "~/utils";
const route = useRoute();
const { getArticle } = await useArticles();
const { article, loading, baseFetch } = getArticle(String(route.params.id));
await baseFetch;
</script>
