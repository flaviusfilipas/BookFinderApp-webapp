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
    v-model="filterModal"
    overlay
    bordered
    content-style="background-color:#e0e0e0">
      <book-filters-mobile/>
  </q-drawer>
  <q-page-sticky expand class="bg-primary" position="top" >
      <div class="q-ml-xs flex col-11">
        <div class="col">
          <searchbar inputClass="mobile-input text-white q-pa-xs" bgColor="white" iconClass="text-grey-9"/>
        </div>
        <div class="filter-div q-ma-xs">
          <q-btn flat round icon="filter_list" @click="filterModal = true"/>
        </div>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
import Book from '../components/Book.vue'
import OfferModal from '../components/offer/OfferModal.vue'
import BookFiltersWeb from '../components/filters/BookFiltersWeb.vue'
import BookFiltersMobile from '../components/filters/BookFiltersMobile.vue'
import Searchbar from '../components/Searchbar.vue'
import { mapGetters } from 'vuex'
export default {
  components: { Book, OfferModal, BookFiltersWeb, BookFiltersMobile, Searchbar },
  data () {
    return {
      current: 1,
      filterModal: false,
      currentBook: {}
    }
  },
  computed: {
    ...mapGetters('booksStore', { booksResults: 'getBooks' })
  }
}
</script>

<style lang="scss">
   @media(min-width: 695px) {
    .q-page-sticky{
      display: none;
    }
  }
  @media(max-width: 695px){
    .web-filter-div{
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
