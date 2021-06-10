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
  <q-drawer
    side="right"
    behavior="mobile"
    v-model="filtersModal"
    overlay
    bordered
    content-style="background-color:#e0e0e0">
      <book-filters-mobile/>
  </q-drawer>
  <mobile-sticky-view stickyClass="bg-primary"/>
  </q-page>
</template>

<script>
import Book from '../components/Book.vue'
import OfferModal from '../components/offer/OfferModal.vue'
import BookFiltersWeb from '../components/filters/BookFiltersWeb.vue'
import BookFiltersMobile from '../components/filters/BookFiltersMobile.vue'
import MobileStickyView from '../components/MobileStickyView.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  components: { Book, OfferModal, BookFiltersWeb, BookFiltersMobile, MobileStickyView },
  data () {
    return {
      current: 1
    }
  },
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
