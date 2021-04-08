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
        <div style="margin:0 0 auto auto;">
           <q-btn class="suggestions-button" color="primary" text-color="white" label="Get suggestions"/>
        </div>
       </div>
    </div>
    <div class="col-sm-9 col-xs-12">
      <div class="flex">
        <div class="row">
            <q-card ref="bookCard" class="my-card q-pa-sm q-ma-sm" v-for="book in wishlist" :key="book.id">
              <q-card-section horizontal>
              <!-- <div class="book-image-container">
                  <img class="book-image" :src="book.imgSource">
              </div> -->
              <q-img :src="book.bookDTO.imgUrl" style="height:100%; max-height:190px" height="190px">
            </q-img>
              <q-card-actions class="q-ml-xs" vertical style="border-radius:10px;padding:0px;">
                <q-btn v-if="hasAlerts(book)" flat round color="yellow" icon="star" >
                  <q-tooltip v-if="hasAlerts(book)">
                    {{getAlertTypesForBook(book)}}
                  </q-tooltip>
                 </q-btn>
                <q-btn flat round color="warning" icon="add_alert" @click="showAlertsModal(book)" >
                  <q-tooltip>
                    Add alert
                  </q-tooltip>
                </q-btn>
                <q-btn rounded flat color="red" icon="close" >
                    <q-menu>
                      <q-list>
                      <q-item clickable v-close-popup @click="deleteFromWatchlist(book.id)">
                        <q-item-section>
                          <q-item-label>Delete from watchlist</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="showDeleteAlertsModal(book)">
                        <q-item-section>
                          <q-item-label>Delete alerts</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-card-actions>
            </q-card-section>
            <q-card-section class="q-pa-xs book-info-section">
              <span class="watch-book-info-area">
                <div class="watch-book-info-area text-subtitle2">{{book.bookDTO.title}}</div>
                <q-tooltip>{{book.bookDTO.title}}</q-tooltip>
              </span>
              <div class="watch-book-info-area text-caption">By: {{book.bookDTO.author}}</div>
              <div class="watch-book-info-area text-caption text-bold">ISBN: {{book.bookDTO.isbn}}</div>
              <div class="watch-book-info-area text-caption text-italic">{{book.bookDTO.coverType}}, {{book.bookDTO.numberOfPages}} pages, publisher {{book.bookDTO.publisher}}</div>
              <div v-if="book.bookDTO.offer.hasStock" class="watch-book-info-area text-caption text-italic text-positive">In stock</div>
              <div v-else class="watch-book-info-area text-caption text-italic text-negative">Not in stock</div>
              <div class="watch-book-info-area text-caption text-italic">Sold by <b>{{book.bookDTO.offer.provider}}</b></div>
              <div class="watch-book-info-area text-subtitle1 text-bold">Original Price: {{book.originalPrice}} lei</div>
              <div class="watch-book-info-area text-subtitle1 text-bold">Last Price: {{book.lastPrice}} lei</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-dialog v-model = "deleteAlertsModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Choose type of alert to delete:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-option-group
            :options="deleteAlertOps"
            type="checkbox"
            v-model="deleteAlertOpt"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" @click = "deleteAlert" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alertModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Choose type of alert:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-option-group
            :options="alertOps"
            type="checkbox"
            v-model="alertOpt"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" @click = "addBookAlert" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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

    <q-page-sticky expand class="q-mb-xl sticky-pg bg-primary" position="top" >
      <div class="q-ml-xs flex col-11">
        <div class="col">
          <q-input class="text-white q-pa-xs" bg-color="white" dark dense standout v-model="text">
            <template v-slot:append>
              <q-icon class="text-grey-9" v-if="text === ''" name="search" />
              <q-icon v-else name="clear" class="text-dark cursor-pointer" @click="text = ''" />
            </template>
          </q-input>
        </div>
        <div class="sort-div q-ma-xs">
           <q-btn flat round icon="filter_list" @click="filterModal = true">
              <q-tooltip>Filter results</q-tooltip>
           </q-btn>
        </div>
        <div class="sort-div q-ma-xs">
          <q-btn flat round icon="assistant">
            <q-tooltip>Get suggestions</q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-page-sticky>
    </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      filterModal: false,
      text: '',
      alertModal: false,
      isHidden: false,
      filters: [
        {
          label: 'Show price alerts',
          value: 'price'
        }, {
          label: 'Show stock alerts',
          value: 'stock'
        }
      ],
      alertOps: [
        {
          label: 'Price alert',
          value: 'price'
        },
        {
          label: 'Stock alert',
          value: 'stock'
        }
      ],
      deleteAlertOps: [
        {
          label: 'Price alert',
          value: 'price'
        },
        {
          label: 'Stock alert',
          value: 'stock'
        }
      ],
      deleteAlertOpt: [],
      alertOpt: [],
      currentBook: {},
      deleteAlertsModal: false
    }
  },
  methods: {
    getAlertTypesForBook (book) {
      const alertTypes = [book.hasStockAlert ? 'stock' : '', book.hasPriceAlert ? 'price' : ''].filter(alert => alert !== '')
      return alertTypes.length > 1 ? 'This book has enabled stock and price alerts' : `This book has enabled ${alertTypes[0]} alert`
    },
    showAlertsModal (currentBook) {
      this.alertModal = true
      this.currentBook = currentBook
    },
    ...mapActions('booksStore', ['setWatchlistFilters', 'clearFilters', 'addAlert', 'deleteBookFromWatchlist', 'deleteAlerts', 'getWatchlistBooksForCurrentUser']),
    addBookAlert () {
      const currentBook = this.currentBook
      const alertOpt = this.alertOpt
      this.addAlert({ currentBook, alertOpt })
      this.notifyAlert()
    },
    hasAlerts (book) {
      if (book.hasStockAlert || book.hasPriceAlert) {
        return true
      }
      return false
    },
    hasAllAlerts (book) {
      return book.hasStockAlert && book.hasPriceAlert
    },
    deleteFromWatchlist (bookId) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you really want to delete the book from watchlist? ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteBookFromWatchlist(bookId)
      })
    },
    showDeleteAlertsModal (book) {
      this.deleteAlertsModal = true
      this.currentBook = book
    },
    deleteAlert () {
      const currentBook = this.currentBook
      const deleteAlertOpt = this.deleteAlertOpt
      this.deleteAlerts({ currentBook, deleteAlertOpt })
      this.deleteAlertOpt = []
    },
    handleNotifyMessage () {
      const noun = this.deleteAlertOpt !== 'all' ? 'alert' : 'alerts'
      return `Succesfully deleted ${this.deleteAlertOpt} ${noun}`
    },
    notifyAlert () {
      let alertOption = ''
      if (this.alertOpt.length > 1) {
        alertOption = 'all'
      } else {
        alertOption = this.alertOpt[0]
      }
      switch (alertOption) {
        case 'price':
          this.notifyPriceAlert()
          break
        case 'stock': this.notifyStockAlert()
          break
        case 'all': this.notifyAlerts()
          break
        default: alert('Invalid option')
      }
      this.alertOpt = []
    },
    notifyPriceAlert () {
      this.$q.notify({
        type: 'positive',
        timeout: 500,
        message: 'You will be notified when price will go down '
      })
    },
    notifyStockAlert () {
      this.$q.notify({
        type: 'positive',
        timeout: 500,
        message: 'You will be notified when book will be back in stock'
      })
    },
    notifyAlerts () {
      this.$q.notify({
        type: 'positive',
        timeout: 500,
        message: 'You will be notified when book will be back in stock and when price will go down'
      })
    },
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
  .book-image-container{
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
   .book-image{
   display:block;
   max-width:100%;
   max-height:100%
  }
  .watch-book-info-area{
    height:40px;
    text-overflow:ellipsis;
    overflow:hidden;
  }

  .my-card{
  width: 100%;
  max-width: 200px;
  }
  .watchlist-filters{
    background-color: #f8f1f1;
    border-radius: 25px;
    position: sticky;
    top:0;
  }

  @media(min-width: 897px) {
    .sticky-pg{
      display: none;
    }
    .book-info-section-title{
      display: none;
    }
  }
  @media(max-width: 897px){
  .my-card{
    width: 100%;
    max-width: 150px;
    }
     .watchlist-filters-container{
      display: none;
    }
    .sort-div{
      background-color:#f8f1f1;
      height:2.8em;
      border-radius:3px;
    }
    .sticky-pg{
      justify-content: flex-start;
    }
    .header-searchbar{
      display: none;
    }
    .watchlist-page{
      margin-top: 48px;
    }
    .book-info-section{
      padding: 0px;
    }
    .image-book-info{
      display: none
    }
    .book-info-section-title{
      background: rgba(0, 0, 0, 0.47);
    }
  };
</style>
