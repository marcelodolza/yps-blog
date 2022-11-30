<template>
  <footer class="Pagination">
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
          v-for="(pg, key) in totalPages"
          :key="key"
          class="btn rounded-0 border-0 mx-1 fw-semibold"
          :class="[modelValue === pg ? 'btn-dark ' : 'btn-secondary text-dark']"
          @click="updatePage(pg)"
        >
          {{ pg }}
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
  modelValue: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  route: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const router = useRouter();

const totalPages = computed(() => Math.round(props.total / props.limit));
const isFirstPage = computed(() => props.modelValue === 1);
const isLastPage = computed(() => props.modelValue === totalPages.value);

const updateRoute = (page: any) =>
  props.route && router.push({ query: { page } });

const prev = () => {
  const page = props.modelValue > 1 ? props.modelValue - 1 : 1;
  updateRoute(page);
  emit("update:modelValue", page);
};

const next = () => {
  const page =
    props.modelValue < totalPages.value - 1
      ? props.modelValue + 1
      : totalPages.value;
  updateRoute(page);
  emit("update:modelValue", page);
};

const updatePage = (page: number) => {
  updateRoute(page);
  emit("update:modelValue", page);
};
</script>
