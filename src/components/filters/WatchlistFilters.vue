<template>
  <q-option-group
    class="q-mb-sm"
    :options="filters"
    v-model="filter"
    color="blue"
    type="checkbox"/>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      filters: [
        {
          label: 'Show price alerts',
          value: 'price'
        }, {
          label: 'Show stock alerts',
          value: 'stock'
        }
      ]
    }
  },
  methods: {
    ...mapActions('booksStore', ['setWatchlistFilters'])
  },
  computed: {
    ...mapState('booksStore', ['watchlistFilters']),
    filter: {
      get () {
        return this.watchlistFilters
      },
      set (value) {
        this.setWatchlistFilters(value)
      }
    }
  }
}
</script>

<style>

</style>
