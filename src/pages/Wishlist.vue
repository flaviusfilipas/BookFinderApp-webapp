<template>
    <q-page class="column">
        <div class="col-2">
          <div class="q-ma-sm text-h3 text-center">Wishlist </div>
        </div>
        <div class="q-mt-sm col-10 ">
          <q-list style="width:50%;margin:0 auto;" bordered separator>
           <q-item class="flex bg-grey-3" clickable v-for="book in wishlist" :key="book.id">
               <div class="row">
                <div class="col">
                  <div class="row">
                    <div class="col flex flex-center">
                      <q-item-section avatar>
                        <q-avatar style="height:1.5em" square size="5em">
                          <img :src="book.imgSource"/>
                        </q-avatar>
                        </q-item-section>
                    </div>
                    <div class="col">
                      <q-item-section top>
                        <q-item-label class="text-h5" v-text="book.title"></q-item-label>
                        <q-item-label class= "text-subtitle2" v-text="book.author"></q-item-label>
                        <q-item-label class = "text-caption text-italic" v-text="book.isbn"></q-item-label>
                        <hr>
                        <q-item-label class="text-subtitle2">Sold by Carturesti</q-item-label>
                        <q-item-label class="text-h5">55 lei</q-item-label>
                    </q-item-section>
                    </div>
                  </div>
                </div>
              </div>
              <q-btn-dropdown class="settings-dropdown" color="primary" label="Options">
                    <q-list>
                      <q-item clickable v-close-popup @click="priceAlertModel = true">
                        <q-item-section>
                          <q-item-label>Add price alert</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="addStockAlert">
                        <q-item-section>
                          <q-item-label>Add stock alert</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="deleteFromWishlist(book.id)">
                        <q-item-section>
                          <q-item-label>Delete from wishlist</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
              </q-btn-dropdown>
            </q-item>
            <div v-show="wishlist.length > 0">
              <q-item class="flex bg-grey-4">
                  <q-btn class="suggestions-button" color="deep-orange" text-color="white" label="Get suggestions"/>
                    <q-tooltip>Get suggestions depending on the items on your wishlist</q-tooltip>
              </q-item>
          </div>
          </q-list>
        </div>
        <q-dialog v-model="priceAlertModel" persistent>
           <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Alert me when price falls below:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="Enter amount" dense v-model="price" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Alert" @click= "notifyPriceAlert" v-close-popup />
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
      priceAlertModel: false,
      price: '',
      confirmDeletePopup: false
    }
  },
  methods: {
    deleteFromWishlist (bookId) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you really want to delete the book from wishlist ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // TODO move this operation into store
        vue.delete(this.wishlist, bookId)
        this.$q.notify({
          type: 'positive',
          timeout: 500,
          message: 'Succesfully deleted item from wishlist'
        })
      })
    },
    addStockAlert () {
      this.notifyStockAlert()
    },
    notifyPriceAlert () {
      this.$q.notify({
        type: 'positive',
        timeout: 500,
        message: `You will be notified when price will be less than ${this.price} lei`
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
  .list{
    width:50%;
  }
  .settings-dropdown{
    align-self: baseline;
    margin:0 0 auto auto;
  }
  .suggestions-button{
    align-self: baseline;
    margin:0 0 auto auto;
  }
</style>
