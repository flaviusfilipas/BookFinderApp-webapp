<template>
  <q-list class="filters" padding>
    <q-item-label class="q-ml-sm q-mb-sm text-h6">
      Author
    </q-item-label>
    <q-option-group
      class="q-mb-sm"
      :options="authors"
      v-model="optAuthors"
      color="blue"
      type="checkbox"/>
    <q-item-label class="q-ml-sm q-mb-sm text-h6">
      Publisher
    </q-item-label>
    <q-option-group
    :options="publishers"
    v-model="optPublishers"
    color="blue"
    type="checkbox"
    />
    <q-item-label class="q-ml-sm q-mb-sm text-h6">
      Type
    </q-item-label>
    <q-option-group
    :options="coverTypes"
    v-model="optTypes"
    color="blue"
    type="checkbox"
    />
  </q-list>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions('booksStore', ['setFilter', 'clearFilters']),
    clearAllFilters () {
      this.clearFilters()
    }
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
  .filters{
    background-color: #f8f1f1;
    border-radius: 25px;
    position: sticky;
    top:0;
  }
  @media(max-width: 695px){
    .filters{
      display: none;
    }
  }
</style>
