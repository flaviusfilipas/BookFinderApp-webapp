<template>
   <q-card>
     <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Offers</div>
          <q-space />
          <q-btn @click='clearOfferState' icon="close" flat round dense/>
        </q-card-section>

      <q-card-section class="q-pt-none">
        <offer-table/>
      </q-card-section>
      <q-inner-loading :showing="isOffersLoadingSpinnerVisible">
        <div>Searching best offers</div>
        <q-spinner-gears size="50px" color="bg-blue-9" />
      </q-inner-loading>
    </q-card>
</template>

<script>
import OfferTable from './OfferTable.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { OfferTable },
  methods: {
    ...mapActions('booksStore', ['clearCurrentOffer']),
    ...mapGetters('booksStore', ['getOffersLoadingSpinnerState']),
    clearOfferState () {
      this.$emit('closeDialog')
      this.clearCurrentOffer()
    }
  },
  computed: {
    isOffersLoadingSpinnerVisible () {
      return this.getOffersLoadingSpinnerState()
    }
  }
}
</script>

<style>

</style>
