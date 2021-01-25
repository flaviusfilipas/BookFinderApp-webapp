<template>
  <q-page class="row results-page">
    <div class="web-filter-div col-2 q-ma-sm">
      <q-list class="filters" padding>
        <q-item-label class="q-ml-sm q-mb-sm text-h6">
          Authors
        </q-item-label>
        <q-option-group
          class="q-mb-sm"
          :options="authors"
          v-model="optAuthors"
          color="blue"
          type="checkbox"/>
        <q-item-label class="q-ml-sm q-mb-sm text-h6">
          Publishers
        </q-item-label>
        <q-option-group
        :options="publishers"
        v-model="optPublishers"
        color="blue"
        type="checkbox"
        />
      </q-list>
    </div>
    <div class="col-sm-9 col-xs-12">
      <q-list class="row">
          <q-card class="my-card q-pa-sm q-ma-sm" v-for="book in booksResults" :key="book.id">
          <q-img :src="book.imgSource">
            <div class="absolute-bottom">
              <div class="text-h6" v-text="book.title"></div>
              <div class="text-subtitle2">By: {{book.author}}</div>
            </div>
          </q-img>
          <q-card-section>
            <div class="text-caption text-bold">ISBN: {{book.isbn}}</div>
            <div class="text-caption text-italic">{{book.type}}, {{book.pages}} pages, publisher {{book.publisher}}</div>
          </q-card-section>
          <q-card-actions class="relative-position">
            <q-btn flat @click="offersModal = true"> Offers</q-btn>
          </q-card-actions>
        </q-card>
      </q-list>
    </div>
    <q-dialog v-model="offersModal" full-width>
    <q-card>
     <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Offers</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

      <q-card-section class="q-pt-none">
        <q-markup-table class="q-ma-sm" flat bordered>
          <thead class="bg-another">
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
                  <q-btn round flat icon="shopping_cart" @click="redirectToProvider(offer.bookUrl)" >
                    <q-tooltip>
                        Go to provider's page
                    </q-tooltip>
                  </q-btn>
              </td>
              <td>
                  <q-btn round flat icon="visibility" @click="addToWatchlist">
                    <q-tooltip>
                      Add to watchlist
                    </q-tooltip>
                  </q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-drawer
  side="right"
  behavior="mobile"
  v-model="filterModal"
  overlay
  bordered
  content-style="background-color:#f8f1f1"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">Choose filters</div>
      </q-card-section>

      <q-card-section>
        <q-item-label class="text-h6">Authors</q-item-label>
          <q-select
          v-model="optAuthors"
          multiple
          :options="authors"
          use-chips
          stack-label
          label="Select authors/s"
        />
        <q-item-label class="text-h6">Publishers</q-item-label>
          <q-select
          v-model="optPublishers"
          multiple
          :options="publishers"
          use-chips
          stack-label
          label="Select publisher/s"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Confirm" v-close-popup />
      </q-card-actions>
      </q-card>
  </q-drawer>
  <q-page-sticky expand class="bg-primary" position="top" >
      <div class="q-ml-xs flex col-11">
        <div class="col">
          <q-input class="mobile-input text-white q-pa-xs" bg-color="white" dark dense standout v-model="text">
            <template v-slot:append>
              <q-icon class="text-grey-9" v-if="text === ''" name="search" />
              <q-icon v-else name="clear" class="text-dark cursor-pointer" @click="text = ''" />
            </template>
          </q-input>
        </div>
        <div class="filter-div q-ma-xs">
          <q-btn flat round icon="filter_list" @click="filterModal = true"/>
        </div>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      text: '',
      current: 1,
      optAuthors: [],
      optPublishers: [],
      offersModal: false,
      filterModal: false
    }
  },
  computed: {
    booksResults () {
      return this.$store.getters['booksStore/getBooks']
    },
    authors () {
      return this.$store.getters['booksStore/getAuthors']
    },
    publishers () {
      return this.$store.getters['booksStore/getPublishers']
    },
    offers () {
      return this.$store.getters['booksStore/getOffers']
    }
  },
  methods: {
    ...mapActions('booksStore', ['addToWishlist']),
    addToWatchlist () {
      this.$q.notify({
        type: 'positive',
        timeout: 100,
        message: 'Book added to watchlist'
      })
    },

    redirectToProvider (providerUrl) {
      window.open(providerUrl, '_blank')
    }
  }
}
</script>

<style lang="scss">
  .my-card{
  width: 100%;
  max-width: 200px;
  }
  .filters{
    background-color: #f8f1f1;
    border-radius: 25px;
    position: sticky;
    top:0;
  }
  .q-chip{
    background-color: #f8f1f1;
  }
   @media(min-width: 695px) {
    .q-page-sticky{
      display: none;
    }
  }
  @media(max-width: 695px){
    .web-filter-div{
      display: none;
    }
    .my-card{
    width: 100%;
    max-width: 150px;
    }
    .filters{
      display: none;
    }
    .filter-div{
      background-color:#f8f1f1;
      height:2.8em;
      border-radius:3px;
    }
    .q-page-sticky{
      justify-content: flex-start;
    }
    .header-input{
      display: none;
    }
    .results-page{
      margin-top: 48px;
    }
  };

</style>
