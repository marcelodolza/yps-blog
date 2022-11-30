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
        v-if="total > limit"
        v-model="currentPage"
        class="py-5"
        :total="total"
        :limit="limit"
        @update:model-value="getArticlesFromPage"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import useArticles from "~/composables/useArticles";
const { articles, getArticles } = useArticles();
const route = useRoute();

const total = ref(59); // API must provide
const limit = ref(16);
const currentPage = ref(1);

onMounted(() => {
  if (route.query.page) currentPage.value = Number(route.query.page);
});

const getArticlesFromPage = (page: number) => getArticles(page, limit.value);

await getArticlesFromPage(1);
</script>
