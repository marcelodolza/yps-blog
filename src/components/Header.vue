<template>
  <header
    class="Header position-fixed w-100 top-0 d-flex justify-content-center align-items-center"
  >
    <div class="row w-100">
      <div class="col-12">
        <div
          class="h-100 w-100 d-flex justify-content-between align-items-center"
        >
          <NuxtLink class="Header__logo h-100" to="/">
            <Logo class="d-flex w-auto" />
          </NuxtLink>
          <Search />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.Header {
  background-color: #101921;
  height: 60px;
  z-index: 10;
  &__logo {
    padding: 7px 0;
    margin-right: 15px;
    & > svg {
      height: 100%;
      display: block;
    }
  }
}
</style>
