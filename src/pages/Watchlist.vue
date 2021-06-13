<template>
    <q-page class="watchlist-page row">
      <div class="watchlist-filters-container col-2 q-ma-sm ">
       <div class="column watchlist-filters">
         <div class="col-1 text-center text-h4">
            Watchlist
         </div>
         <hr>
          <div>
            <q-list class="watchlist-filters" padding>
              <q-item-label class="q-ml-sm q-mb-sm text-h5">
                Filters
              </q-item-label>
              <q-option-group
                class="q-mb-sm"
                :options="filters"
                v-model="filter"
                color="blue"
                type="checkbox"/>
            </q-list>
          </div>
          <hr>
        <!-- <div style="margin:0 0 auto auto;">
           <q-btn class="suggestions-button" color="primary" text-color="white" label="Get suggestions"/>
        </div> -->
       </div>
    </div>
    <div class="col-sm-9 col-xs-12">
      <div class="flex">
        <div class="row">
          <watchlist-book v-for="book in wishlist" :key="book.id" :book="book"/>
        </div>
      </div>
    </div>
    <delete-alert-modal/>
    <alert-modal/>

    <q-dialog v-model="filterModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Choose filter</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-option-group
              :options="filters"
              type="checkbox"
              v-model="filter"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Clear filters" @click='clearAllFilters'/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <mobile-sticky-view stickyClass="q-mb-xl sticky-pg bg-primary"/>
    </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MobileStickyView from '../components/MobileStickyView.vue'
import WatchlistBook from '../components/core/WatchlistBook.vue'
import DeleteAlertModal from '../components/modals/DeleteAlertModal.vue'
import AlertModal from '../components/modals/AlertModal.vue'
export default {
  components: { MobileStickyView, WatchlistBook, DeleteAlertModal, AlertModal },
  data () {
    return {
      filterModal: false,
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
    ...mapActions('booksStore', ['setWatchlistFilters', 'clearFilters', 'getWatchlistBooksForCurrentUser']),
    clearAllFilters () {
      this.clearFilters()
    }
  },
  computed: {
    wishlist () {
      return this.$store.getters['booksStore/getWishlistBooks']
    },
    ...mapState('booksStore', ['watchlistFilters']),
    filter: {
      get () {
        return this.watchlistFilters
      },
      set (value) {
        this.setWatchlistFilters(value)
        console.log(value)
      }
    }
  },
  beforeMount () {
    this.getWatchlistBooksForCurrentUser()
  }
}
</script>

<style scoped>
  .watchlist-filters{
    background-color: #f8f1f1;
    border-radius: 25px;
    position: sticky;
    top:0;
  }
  @media(max-width: 897px){
    .watchlist-filters-container{
      display: none;
    }
    .watchlist-page{
      margin-top: 48px;
    }
  };
</style>
