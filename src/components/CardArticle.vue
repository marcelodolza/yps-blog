<template>
  <li
    class="CardArticle position-relative"
    :class="{
      'CardArticle--h d-flex overflow-hidden': horizontal,
      'CardArticle--active': active,
    }"
  >
    <NuxtLink
      :to="`/article/${id}`"
      class="d-flex justify-content-center align-items-center"
      :class="{ 'w-50': horizontal, 'mb-3': !horizontal }"
    >
      <img :src="image" class="CardArticle__img card-img-top" :alt="title" />
    </NuxtLink>
    <div class="card-body px-3" :class="{ 'w-100': horizontal }">
      <NuxtLink :to="`/article/${id}`" class="text-decoration-none text-dark">
        <h4
          class="card-title text-capitalize d-block"
          :class="{ 'fs-6 my-2': horizontal, 'my-4': !horizontal }"
        >
          {{ title }}
        </h4>
      </NuxtLink>
      <p class="card-text small fw-light">
        {{ description }}
      </p>
      <BaseLink :to="`/article/${id}`">Read more</BaseLink>
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
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.CardArticle {
  &--h {
    &:before,
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
      transition: all 0.3s var(--animation-primary);
    }
    &:before {
      bottom: 0;
      margin: auto;
      width: 0px;
      height: 0px;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid var(--bs-dark);
      transform: translateX(-100%);
      transition: all 0.4s ease;
    }
    &:after {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 80, 0, 0.08);
      transform: scaleY(50%);
      opacity: 0;
    }
  }

  &__img {
    transition: all 0.2s var(--animation-primary);
    &:hover {
      transform: scale(1.03);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
  }

  &--active {
    &:after {
      transform: scaleY(100%);
      opacity: 1;
    }
    &:before {
      transform: translateX(0);
    }
  }
}
</style>
