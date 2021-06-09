<template>
  <q-page class="row results-page">
    <div class="web-filter-div col-2 q-ma-sm">
      <q-list class="filters" padding>
        <q-item-label class="q-ml-sm q-mb-sm text-h6">
          Author
        </q-item-label>
        <q-option-group
          class="q-mb-sm"
          :options="authors"
          v-model="optAuthors"
          color="blue"
          type="checkbox"/>
        <q-item-label class="q-ml-sm q-mb-sm text-h6">
          Publisher
        </q-item-label>
        <q-option-group
        :options="publishers"
        v-model="optPublishers"
        color="blue"
        type="checkbox"
        />
        <q-item-label class="q-ml-sm q-mb-sm text-h6">
          Type
        </q-item-label>
        <q-option-group
        :options="bookTypes"
        v-model="optTypes"
        color="blue"
        type="checkbox"
        />
      </q-list>
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
      <div class="q-ma-xs q-pa-xs text-h5 text-center" style="background-color:#f8f1f1;border-radius:3px">Choose filters</div>
      <div class="q-ma-xs">
        <div class="text-h6 q-mb-xs">Author</div>
          <q-select
          v-model="optAuthors"
          multiple
          :options="authors"
          use-chips
          stack-label
          label="Select authors/s"
        />
      </div>
      <div class="q-ma-xs">
        <div class="text-h6 q-mb-xs">Publisher</div>
          <q-select
          v-model="optPublishers"
          multiple
          :options="publishers"
          use-chips
          stack-label
          label="Select publisher/s"
        />
      </div>
      <div class="q-ma-xs">
        <div class="text-h6">Type</div>
          <q-select
          v-model="optTypes"
          multiple
          :options="bookTypes"
          use-chips
          stack-label
          label="Select book type/s"
        />
      </div>
      <div class="row absolute-bottom justify-end">
        <q-btn class="bg-secondary text-negative" label="Clear filters" @click="clearFilters"/>
      </div>
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
import Book from '../components/Book.vue'
import OfferModal from '../components/offer/OfferModal.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: { Book, OfferModal },
  data () {
    return {
      text: '',
      current: 1,
      filterModal: false,
      currentBook: {}
    }
  },
  computed: {
    // TODO replace with mapGetters
    booksResults () {
      return this.$store.getters['booksStore/getBooks']
    },
    authors () {
      return this.$store.getters['booksStore/getAuthors']
    },
    publishers () {
      return this.$store.getters['booksStore/getPublishers']
    },
    bookTypes () {
      return this.$store.getters['booksStore/getBookTypes']
    },
    ...mapState('booksStore', ['filters']),
    optAuthors: {
      get () {
        return this.filters.author
      },
      set (value) {
        this.setFilter({ value: value, filterType: 'author' })
        console.log(value)
      }
    },
    optPublishers: {
      get () {
        return this.filters.publisher
      },
      set (value) {
        console.log(value)
        this.setFilter({ value: value, filterType: 'publisher' })
      }
    },
    optTypes: {
      get () {
        return this.filters.coverType
      },
      set (value) {
        console.log(value)
        this.setFilter({ value: value, filterType: 'coverType' })
      }
    }
  },
  methods: {
    ...mapActions('booksStore', ['setFilter', 'filterBooks', 'clearFilters']),
    clearAllFilters () {
      this.clearFilters()
    }
  }
}
</script>

<style lang="scss">
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
