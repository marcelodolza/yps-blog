<template>
  <div v-if="isFocused" class="SearchResult text-dark custom-scrollbar h-100">
    <transition name="fade">
      <div
        v-if="loading || !termDebounced.length"
        class="SearchResult__loader position-absolute top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center"
      >
        <Loader :stroke-width="3" />
      </div>
    </transition>

    <transition-group class="list-unstyled m-0 w-100" tag="ul" name="list">
      <CardArticle
        v-for="({ id, title, image, intro, active }, index) in articles"
        :id="id"
        :key="id"
        :title="title"
        :image="image"
        :description="`${intro.slice(0, 120)}...`"
        horizontal
        class="py-2 px-3 border-top"
        :style="{ '--i': index }"
        :active="active"
      />
    </transition-group>

    <div
      v-if="articles && !articles.length && !loading && termDebounced"
      class="position-absolute top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center flex-column"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-primary"
      >
        <path
          d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
      <b class="my-2"> No results found </b>
    </div>
    <Pagination
      v-if="showPagination"
      v-model="page"
      class="py-3 position-relative"
      :total="total"
      :limit="limit"
      :route="false"
      @update:model-value="getResultFromPage"
    />
  </div>
</template>

<script setup lang="ts">
import useSearch from "~/composables/useSearch";

const total = ref(20); // API must provide
const limit = ref(10);
const page = ref(1);
const { isFocused, termDebounced, loading, articles, getResult } = useSearch();

const showPagination = computed(
  () => articles.value && articles.value.length === limit.value // Fake
);

const getResultFromPage = (page: number) => getResult(page, limit.value);
</script>

<style lang="scss" scoped>
.SearchResult {
  overflow-y: auto;
  overflow-x: hidden;
  &__loader {
    z-index: 10;
    background-color: rgba(255, 2500, 255, 0.7);
    & > svg {
      margin-top: -40px;
    }
  }
}
</style>
