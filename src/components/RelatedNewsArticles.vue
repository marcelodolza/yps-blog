<template>
  <section class="RelatedNewsArticles py-5 bg-secondary">
    <div class="mx-auto container my-4">
      <div class="row">
        <div class="col">
          <ul class="list-unstyled row w-100 m-0">
            <li class="col-md-12 col-lg-3 my-4">
              <h3 class="fs-2">
                Related news articles <span class="text-primary">:</span>
              </h3>
            </li>
            <CardArticle
              v-for="{ id, title, image, intro } in articles.slice(0, 3)"
              :id="id"
              :key="id"
              class="col-12 col-md-4 col-lg-3 my-4"
              :title="title"
              :image="image"
              :description="intro"
            />
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import useArticles from "~/composables/useArticles";
const { articles, getAll } = useArticles(); // API must provide

onMounted(() => (!articles.value.length ? getAll() : null));
</script>
