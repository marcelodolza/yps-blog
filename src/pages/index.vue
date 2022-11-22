<template>
  <main>
    <LatestArticle />
    <div class="mx-auto container mb-5">
      <section class="my-5">
        <transition-group
          tag="ul"
          name="list"
          class="list-unstyled row m-0 w-100"
        >
          <CardArticle
            v-for="({ id, title, image, intro }, index) in articles"
            :id="id"
            :key="id"
            :title="title"
            :image="image"
            :description="intro"
            class="col-12 col-sm-6 col-md-4 col-lg-3 my-5"
            :style="{ '--i': index }"
          />
        </transition-group>
      </section>
      <Pagination
        :total="59"
        :limit="limit"
        @change-page="getArticlesFromPage"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import useArticles from "~/composables/useArticles";
const { articles, getArticles } = useArticles();

const limit = ref(16);

const getArticlesFromPage = (page: number) => {
  getArticles(page, limit.value);
};

await getArticlesFromPage(1);
</script>
