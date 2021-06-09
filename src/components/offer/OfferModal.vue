<template>
      <q-dialog ref='offersDialog' v-model="offersModal" full-width persistent>
      <offer-card @closeDialog='closeDialog(value)'/>
    </q-dialog>
</template>

<script>
import OfferCard from './OfferCard.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { OfferCard },
  methods: {
    ...mapGetters('booksStore', ['getOffersModal']),
    ...mapActions('booksStore', ['setOffersModalVisibility']),
    closeDialog () {
      this.$refs.offersDialog.hide()
    }
  },
  computed: {
    offersModal: {
      get () {
        return this.getOffersModal()
      },
      set (value) {
        this.setOffersModalVisibility(value)
      }
    }
  }
}
</script>

<style>
</style>
