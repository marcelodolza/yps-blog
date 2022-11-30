<template>
  <NuxtLink
    class="BaseLink btn btn-link text-primary p-0 d-inline-flex justify-content-center align-items-center text-decoration-none position-relative"
    :to="to"
  >
    <slot />
    <div v-if="icon" class="BaseLink__arrow">→</div>
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.BaseLink {
  font-size: 15px;
  &:before {
    content: "";
    transition: all 0.2s var(--animation-primary);
    background-color: var(--bs-primary);
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    width: 0;
    height: 1px;
  }
  &__arrow {
    transition: all 0.2s var(--animation-primary);
    transform: translateX(0.4rem);
  }
  &:hover {
    &:before {
      width: 100%;
    }
    .BaseLink__arrow {
      transform: translateX(0.8rem);
    }
  }
}
</style>
