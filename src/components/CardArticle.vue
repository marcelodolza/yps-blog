<template>
  <li class="CardArticle" :class="{ 'd-flex ': horizontal }">
    <NuxtLink
      :to="`/article/${id}`"
      class="d-flex justify-content-center align-items-center"
      :class="{ 'w-50': horizontal, 'mb-3': !horizontal }"
    >
      <img
        :src="image"
        class="CardArticle__img card-img-top"
        :alt="title"
        @click="emit('onClick')"
      />
    </NuxtLink>
    <div class="card-body px-3" :class="{ 'w-100': horizontal }">
      <NuxtLink :to="`/article/${id}`" class="text-decoration-none text-dark">
        <h4
          class="card-title text-capitalize d-block"
          :class="{ 'fs-6 my-2': horizontal, 'my-4': !horizontal }"
          @click="emit('onClick')"
        >
          {{ title }}
        </h4>
      </NuxtLink>
      <p class="card-text small fw-light">
        {{ description }}
      </p>
      <BaseLink :to="`/article/${id}`" @click="emit('onClick')"
        >Read more</BaseLink
      >
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["onClick"]);
</script>

<style lang="scss" scoped>
.CardArticle {
  &__img {
    transition: all 0.2s var(--animation-cubic);
    &:hover {
      transform: scale(1.03);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
