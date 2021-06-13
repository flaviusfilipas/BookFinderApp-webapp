<template>
  <div>
  <div class="filter-text q-ma-xs q-pa-xs text-h5 text-center">Choose filters</div>
    <slot></slot>
  <div class="row absolute-bottom justify-end">
    <q-btn class="bg-secondary text-negative" label="Clear filters" @click="clearAllFilters"/>
  </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('booksStore', ['clearFilters']),
    clearAllFilters () {
      this.clearFilters()
    }
  }
}
</script>

<style>
 .filter-text{
    background-color:#f8f1f1;
    border-radius:3px
  }
</style>
