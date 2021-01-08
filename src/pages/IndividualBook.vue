<template>
  <q-page class="q-ml-sm row">
  <div class="bg-grey-2 col-3">
    <div class="column">
      <div class="col bookStyle q-mt-lg">
       <q-avatar square style= "width:0.7em" size="25em">
         <img src="https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg"/>
        </q-avatar>
      </div>
      <div class="col bookStyle">
        <div class="column">
         <div class="text-h4">Sapiens</div>
          <div class= "text-subtitle1">Yuval Noah Harrari</div>
          <div class = "text-subtitle1 text-italic">978-1-79921-863-0</div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-9">
    <q-markup-table class="q-ma-sm" flat bordered>
      <thead class="bg-grey-4">
        <tr>
          <th colspan="7">
            <div class="row no-wrap items-center">
              <div class="text-h4">Offers</div>
            </div>
          </th>
        </tr>
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
        <tr v-for="offer in offers" :key="offer.id">
          <td class="text-left">{{offer.storeName}}</td>
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
          <td class="text-right">{{offer.price.toFixed(2)}}</td>
          <td class="text-center">{{offer.transportaionPrice.toFixed(2)}}</td>
          <td class="text-right">{{(offer.price + offer.transportaionPrice).toFixed(2)}}</td>
          <td class="text-center">
              <q-btn color="primary" icon="shopping_cart" label="Go to store" @click="redirectToProvider(offer.bookUrl)" />
          </td>
          <td>
              <q-btn flat round icon="favorite_border"/>
                <q-tooltip>
                  Add to wishlist
                </q-tooltip>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('booksStore', ['addToWishlist']),
    addToWishlists (item) {
      this.addToWishlist(item, item)
      this.$q.notify({
        type: 'positive',
        timeout: 100,
        message: 'Book added to wishlist'
      })
    },

    redirectToProvider (providerUrl) {
      window.open(providerUrl, '_blank')
    }
  },
  computed: {
    offers () {
      return this.$store.getters['booksStore/getOffers']
    }
  }
}
</script>

<style>
  .bookStyle{
    display: flex;
    justify-content: center;
  }
</style>
