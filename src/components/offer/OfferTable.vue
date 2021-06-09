<template>
  <q-markup-table class="q-ma-sm" flat bordered>
    <thead v-if="currentOffer.length > 0" class="bg-another">
      <tr>
        <th class="text-left">Provider</th>
        <th class="text-right">Stock</th>
        <th class="text-right">Cost</th>
        <th class="text-center">
          <div>
            Transportation
          </div>
          <div>
            cost
          </div>
        </th>
        <th class="text-right">Total</th>
        <th class="text-right"></th>
        <th class="text-right"></th>
      </tr>
    </thead>
    <tbody class="bg-grey-3">
      <tr v-for="offer in currentOffer" :key="offer.id">
        <td class="text-left">{{offer.provider}}</td>
        <td class="text-right" style="font-size:1.5em">
          <div v-if="offer.hasStock" >
            <q-icon class="text-positive" name="check"/>
              <q-tooltip>Item is is stock</q-tooltip>
          </div>
          <div v-else>
            <q-icon class="text-negative" name="close" />
              <q-tooltip>Item is not in stock</q-tooltip>
          </div>
        </td>
        <td class="text-right">{{offer.price !== null ? offer.price.toFixed(2) : 'Not available'}}</td>
        <td class="text-center">{{offer.transportationCost.toFixed(2)}}
          <q-tooltip>Price may vary depending on your location</q-tooltip>
        </td>
        <td class="text-right">{{offer.price !== null ? (offer.price + offer.transportationCost).toFixed(2) : 'Indisponibil'}}</td>
        <td class="text-center">
            <q-btn round flat icon="shopping_cart" @click="redirectToProvider(offer.link)" >
              <q-tooltip>
                  Go to provider's page
              </q-tooltip>
            </q-btn>
        </td>
        <td>
            <q-btn :class= "[offer.isAddedToWatchlist ? 'text-warning disabled' : 'text-dark']" round flat icon="visibility" @click="addToWatchlist(offer)">
              <q-tooltip>
                Add to watchlist
              </q-tooltip>
            </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script>
import { SessionStorage } from 'quasar'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      isOffersLoadingSpinnerVisible: false
    }
  },
  methods: {
    ...mapActions('booksStore', ['clearCurrentOffer', 'setOffersLoadingSpinner', 'addToWishlist']),
    ...mapGetters('booksStore', ['getCurrentOffer', 'getCurrentBook']),
    ...mapState('authStore', ['loggedIn']),
    redirectToProvider (providerUrl) {
      window.open(providerUrl, '_blank')
    },
    clearOfferState () {
      this.$emit('close', 'closed')
      this.clearCurrentOffer()
    },
    addToWatchlist (offer) {
      debugger
      const currentUserId = SessionStorage.getItem('userId')
      this.getCurrentBook().offer = offer
      this.addToWishlist({ book: this.getCurrentBook(), currentUserId: currentUserId })
      if (this.loggedIn) {
        this.$q.notify({
          type: 'positive',
          timeout: 100,
          message: 'Book added to watchlist'
        })
      } else {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    currentOffer () {
      const currentOffer = [...this.getCurrentOffer()]
      console.log(currentOffer)
      return currentOffer.sort((a, b) => { return (a.price + a.transportationCost) - (b.price + b.transportationCost) })
    }
  },
  watch: {
    currentOffer (newValue) {
      this.setOffersLoadingSpinner(false)
      console.log('Changed currentOffer ')
      console.log(newValue)
    }
  }
}
</script>

<style>

</style>
