<template>
  <footer class="Pagination py-5">
    <div class="mx-auto container d-flex justify-content-between">
      <button
        class="btn rounded-0 border-0 fw-semibold"
        :class="[
          isFirstPage ? 'disabled btn-secondary text-dark' : 'btn-primary',
        ]"
        @click="prev"
      >
        ← <span class="d-none d-sm-inline-block">Previous</span>
      </button>
      <div>
        <button
          v-for="(page, key) in totalPages"
          :key="key"
          class="btn rounded-0 border-0 mx-1 fw-semibold"
          :class="[
            currentPage === page ? 'btn-dark ' : 'btn-secondary text-dark',
          ]"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </div>
      <button
        class="btn rounded-0 border-0 fw-semibold"
        :class="[
          isLastPage ? 'disabled btn-secondary text-dark' : 'btn-primary',
        ]"
        @click="next"
      >
        <span class="d-none d-sm-inline-block">Next</span> →
      </button>
    </div>
  </footer>
</template>
<script setup lang="ts">
const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["changePage"]);
const route = useRoute();
const router = useRouter();

const totalPages = computed(() => Math.round(props.total / props.limit));
const currentPage = computed(() => Number(route.query.page || 1));
const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const prev = () => {
  const page = currentPage.value > 1 ? currentPage.value - 1 : 1;
  router.push({ query: { page } });
  emit("changePage", page);
};

const next = () => {
  const page =
    currentPage.value < totalPages.value - 1
      ? currentPage.value + 1
      : totalPages.value;
  router.push({ query: { page } });
  emit("changePage", page);
};

const changePage = (page: number) => {
  router.push({ query: { page } });
  emit("changePage", page);
};
</script>
