<template>
  <div>
    <div class="q-ma-xs">
      <div class="text-h6 q-mb-xs">Author</div>
        <q-select
        v-model="optAuthors"
        multiple
        :options="authors"
        use-chips
        stack-label
        label="Select authors/s"
      />
    </div>
    <div class="q-ma-xs">
      <div class="text-h6 q-mb-xs">Publisher</div>
        <q-select
        v-model="optPublishers"
        multiple
        :options="publishers"
        use-chips
        stack-label
        label="Select publisher/s"
      />
    </div>
    <div class="q-ma-xs">
      <div class="text-h6">Type</div>
        <q-select
        v-model="optTypes"
        multiple
        :options="coverTypes"
        use-chips
        stack-label
        label="Select book type/s"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions('booksStore', ['setFilter'])
  },
  computed: {
    ...mapState('booksStore', ['filters']),
    ...mapGetters('booksStore', {
      authors: 'getAuthors',
      publishers: 'getPublishers',
      coverTypes: 'getCoverTypes'
    }),
    optAuthors: {
      get () {
        return this.filters.author
      },
      set (value) {
        this.setFilter({ value: value, filterType: 'author' })
        console.log(value)
      }
    },
    optPublishers: {
      get () {
        return this.filters.publisher
      },
      set (value) {
        console.log(value)
        this.setFilter({ value: value, filterType: 'publisher' })
      }
    },
    optTypes: {
      get () {
        return this.filters.coverType
      },
      set (value) {
        console.log(value)
        this.setFilter({ value: value, filterType: 'coverType' })
      }
    }
  }
}
</script>

<style>
  .q-chip{
    background-color: #f8f1f1;
  }
</style>
