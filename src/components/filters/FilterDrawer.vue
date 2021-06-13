<template>
  <q-drawer
    side="right"
    behavior="mobile"
    v-model="filtersModal"
    overlay
    bordered
    content-style="background-color:#e0e0e0">
      <slot></slot>
  </q-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('modalsStore', ['setFilterModal'])
  },
  computed: {
    ...mapState('modalsStore', ['filterModal']),
    filtersModal: {
      get () {
        return this.filterModal
      },
      set (value) {
        this.setFilterModal(value)
        console.log(value)
      }
    }
  }
}
</script>

<style>

</style>
