<template>
  <q-input
  :class="inputClass"
  :bg-color="bgColor"
  placeholder="Search By Title, ISBN, Author or Keyword"
  dark
  dense
  standout
  v-model="searchText"
  @keyup.enter="search">
    <template v-slot:append>
      <q-icon :class="iconClass" name="search" v-model='searchText' @click='search'/>
    </template>
  </q-input>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    inputClass: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      required: false
    },
    iconClass: {
      type: String
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    ...mapActions('booksStore', ['searchBooks']),
    search () {
      this.searchBooks(this.searchText)
    }
  }
}
</script>

<style>

</style>
