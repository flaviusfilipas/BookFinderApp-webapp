<template>
    <q-page class="row">
      <div class="col-2 q-ma-sm">
       <div class="column filters">
         <div class="col-1 text-center text-h4">
            Watchlist
         </div>
         <hr>
          <div>
            <q-list class="filters" padding>
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
    <div class="col-9">
      <q-list class="row">
          <q-card class="my-card q-pa-sm q-ma-sm" v-for="book in wishlist" :key="book.id">
          <q-card-section horizontal>
          <q-img :src="book.imgSource">
            <div style="height:45%" class="absolute-bottom">
              <div class="text-subtitle2" v-text="book.title"></div>
              <div class="text-caption">By: {{book.author}}</div>
            </div>
          </q-img>
          <q-card-actions vertical style="background-color:#f8f1f1;border-radius:10px">
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
          <q-card-section>
            <div class="text-caption text-bold">ISBN: {{book.isbn}}</div>
            <div class="text-caption text-italic">{{book.type}}, {{book.pages}} pages, publisher {{book.publisher}}</div>
            <div class="text-caption text-italic text-positive">In stock</div>
            <div class="text-caption text-italic">Sold by <b>Carturesti</b></div>
            <div class="text-subtitle1 text-bold">Price: 55 lei</div>
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
    </q-page>
</template>

<script>
import vue from 'vue'
export default {
  data () {
    return {
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

<style>
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
</style>
