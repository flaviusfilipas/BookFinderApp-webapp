<template>
    <q-page class="watchlist-page row">
      <div class="col-2 q-ma-sm">
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
      <q-list class="row">
          <q-card class="my-card q-pa-sm q-ma-sm" v-for="book in wishlist" :key="book.id">
          <q-card-section horizontal>
          <q-img :src="book.imgSource">
            <!-- <div style="max-height:45%" class="image-book-info absolute-bottom">
              <div class="text-subtitle2" v-text="book.title"></div>
              <div class="text-caption">By: {{book.author}}</div>
            </div> -->
          </q-img>
          <q-card-actions class="q-ml-xs" vertical style="background-color:#f8f1f1;border-radius:10px;padding:0px">
            <q-btn :class="[isHidden ? 'hidden' : '']"  flat round color="yellow" icon="star" />
            <q-btn flat round color="warning" icon="add_alert" @click="alertModal =true" >
              <q-tooltip>
                 Add alert
              </q-tooltip>
            </q-btn>
                <q-btn-dropdown rounded flat color="red" dropdown-icon="close">
                  <q-list>
                    <q-item clickable v-close-popup @click="deleteFromWatchlist(book.id)">
                      <q-item-section>
                        <q-item-label>Delete from watchlist</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="deleteAlerts(book.id)">
                      <q-item-section>
                        <q-item-label>Delete alerts</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
              </q-btn-dropdown>
          </q-card-actions>
          </q-card-section>
          <q-card-section class="q-pa-xs book-info-section">
            <div class="watch-book-info-area text-subtitle2">{{book.title}}</div>
            <div class="watch-book-info-area text-caption">By: {{book.author}}</div>
            <div class="watch-book-info-area text-caption text-bold">ISBN: {{book.isbn}}</div>
            <div class="watch-book-info-area text-caption text-italic">{{book.type}}, {{book.pages}} pages, publisher {{book.publisher}}</div>
            <div class="watch-book-info-area text-caption text-italic text-positive">In stock</div>
            <div class="watch-book-info-area text-caption text-italic">Sold by <b>Carturesti</b></div>
            <div class="watch-book-info-area text-subtitle1 text-bold">Price: 55 lei</div>
          </q-card-section>
        </q-card>
      </q-list>
    </div>
     <q-dialog v-model="alertModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Choose type of alert:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
              <q-option-group
                :options="alertOps"
                type="radio"
                v-model="alertOpt"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" @click= "notifyAlert" v-close-popup />
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
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" v-close-popup />
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
import vue from 'vue'
export default {
  data () {
    return {
      filterModal: false,
      text: '',
      alertModal: false,
      isHidden: true,
      filter: [],
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
      alertOpt: ''
    }
  },
  methods: {
    deleteFromWatchlist (bookId) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you really want to delete the book from watchlist? ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // TODO move this operation into store
        vue.delete(this.wishlist, bookId)
        this.$q.notify({
          type: 'positive',
          timeout: 500,
          message: 'Succesfully deleted item from watchlist'
        })
      })
    },
    deleteAlerts (bookId) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you really want to delete all the alerts for this book? ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // TODO move this operation into store
        vue.delete(this.wishlist, bookId)
        this.$q.notify({
          type: 'positive',
          timeout: 500,
          message: 'Succesfully deleted all alerts'
        })
      })
    },
    notifyAlert () {
      switch (this.alertOpt) {
        case 'price':
          this.notifyPriceAlert()
          break
        case 'stock': this.notifyStockAlert()
          break
        default: alert('Invalid option')
      }
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
    }
  },
  computed: {
    wishlist () {
      return this.$store.getters['booksStore/getWishlistBooks']
    }
  }
}
</script>

<style scoped>
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
     .watchlist-filters{
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
