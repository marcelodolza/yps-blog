<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 38 38"
    stroke="currentColor"
    class="overflow-visible"
  >
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" :stroke-width="strokeWidth">
        <circle stroke-opacity=".15" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  strokeWidth: {
    type: Number,
    default: 5,
  },
});
</script>
