<template>
  <div class="c-paginationActions">
    <nuxt-link v-if="prevPage" :to="prevPage" class="o-btn">Previous Page</nuxt-link>
    <nuxt-link v-if="nextPage" :to="nextPage" class="o-btn u-marginLeftAuto">Next Page</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['prevPage', 'nextPage']
  }
</script>

<style>
  .c-paginationActions {
    padding: 2em 0 1em;
    display: flex;

    border-top: .125em solid currentColor;
  }
</style>
