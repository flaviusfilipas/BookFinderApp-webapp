<template>
  <q-page class="row results-page">
    <div class="web-filter-div col-2 q-ma-sm">
      <book-filters-web/>
    </div>
    <div class="col-sm-9 col-xs-12">
      <div class="flex">
          <div class="row">
            <book v-for="book in booksResults" :key="book.isbn" :book="book"/>
        </div>
      </div>
    </div>
    <offer-modal></offer-modal>
  <filter-drawer>
    <mobile-filters-view>
      <book-filters-mobile/>
    </mobile-filters-view>
  </filter-drawer>
  <mobile-sticky-view stickyClass="bg-primary"/>
  </q-page>
</template>

<script>
import Book from '../components/core/Book.vue'
import OfferModal from '../components/offer/OfferModal.vue'
import BookFiltersWeb from '../components/filters/BookFiltersWeb.vue'
import BookFiltersMobile from '../components/filters/BookFiltersMobile.vue'
import MobileStickyView from '../components/MobileStickyView.vue'
import MobileFiltersView from '../components/filters/MobileFiltersView.vue'
import FilterDrawer from '../components/filters/FilterDrawer.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  components: { Book, OfferModal, BookFiltersWeb, BookFiltersMobile, FilterDrawer, MobileFiltersView, MobileStickyView },
  methods: {
    ...mapActions('modalsStore', ['setFilterModal'])

  },
  computed: {
    ...mapState('modalsStore', ['filterModal']),
    ...mapGetters('booksStore', { booksResults: 'getBooks' }),
    filtersModal: {
      get () {
        return this.filterModal
      },
      set (value) {
        this.setFilterModal(value)
        console.log(value)
      }
    },
    ...mapGetters('modalsStore', { filterModal: 'getFilterModal' })
  }
}
</script>

<style lang="scss">
  @media(max-width: 695px){
    .web-filter-div{
      display: none;
    }
    .results-page{
      margin-top: 48px;
    }
  };

</style>
