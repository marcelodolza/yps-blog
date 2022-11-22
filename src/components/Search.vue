<template>
  <div class="w-100 d-flex justify-content-end">
    <Transition name="fade">
      <div
        v-if="isFocused"
        class="Search__overlay position-fixed top-0 bottom-0 start-0 end-0 z-10 w-100 h-100"
        @click="focusOut"
      ></div>
    </Transition>
    <div
      class="Search rounded-top z-10"
      :class="{
        'text-light': !isFocused,
        'Search--focused text-dark bg-white': isFocused,
        'rounded-bottom': !isFocused || !isAllowed,
        'Search--completed text-dark': isFocused && isAllowed,
      }"
    >
      <div class="d-flex align-items-center px-2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="Search__icon d-block pe-none position-absolute"
        >
          <path
            d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
        <form class="w-100" @submit.prevent>
          <input
            v-model="term"
            type="text"
            placeholder="Enter a search term"
            class="Search__input py-2 w-100"
            minlength="3"
            @focusin="() => (isFocused = true)"
            @input="inputHandler"
          />
        </form>
        <button
          class="Search__btn d-none d-sm-flex btn btn-primary text-dark rounded-0 border-0 p-1 text-center position-relative justify-content-center align-items-center"
        >
          <Transition name="fade">
            <Loader
              v-if="isTyping"
              class="Search__loader position-absolute top-0 bottom-0 m-auto"
            />
            <div
              v-else
              class="d-flex justify-content-center align-items-center position-absolute position-absolute top-0 bottom-0"
            >
              Search
            </div>
          </Transition>
        </button>
      </div>
      <div class="Search__result position-absolute shadow rounded-bottom">
        <SearchResult />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSearch from "~/composables/useSearch";
const { term, isFocused, isTyping, isAllowed, focusOut, changeTerm } =
  useSearch();

const inputHandler = (e: Event) => {
  const el = e.target as HTMLInputElement;

  if (el.value.length < 3) return;

  changeTerm();
};
</script>

<style lang="scss" scoped>
.Search {
  transition: all 0.3s;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  &:hover {
    border: 1px solid var(--bs-secondary);
  }
  &__input {
    background: transparent;
    border: 0;
    transition: all 0.3s var(--animation-cubic);
    outline: none;
    color: currentColor;
    padding-left: 30px;
  }
  &__btn {
    font-size: 14px;
    font-weight: bold;
    width: 100px;
    height: 29px;
  }
  &__loader {
    width: 18px;
    height: 18px;
  }
  &__result {
    height: 0;
    background: white;
    overflow-y: auto;
    transition: all 0.2s var(--animation-cubic);
    left: -1px;
    right: -1px;
  }
  &__overlay {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 768px) {
    width: 400px;
  }

  /* Status */

  &--focused {
    width: 100%;
    @media (min-width: 768px) {
      width: 550px;
    }
    @media (max-width: 576px) {
      position: absolute;
      left: calc(var(--bs-gutter-x) * 0.5);
      right: calc(var(--bs-gutter-x) * 0.5);
      width: auto;
      top: 9px;
    }
  }
  &--completed {
    .Search__result {
      height: 450px;
    }
  }
}
</style>
