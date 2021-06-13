<template>
  <q-card-actions class="watchlist-actions q-ml-xs" vertical>
    <q-btn v-if="hasAlerts(book)" flat round color="yellow" icon="star" >
      <q-tooltip v-if="hasAlerts(book)">
        {{getAlertTypesForBook(book)}}
      </q-tooltip>
      </q-btn>
    <q-btn flat round color="warning" icon="add_alert" @click="showAlertsModal()" >
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
          <q-item clickable v-close-popup @click="showDeleteAlertsModal()">
            <q-item-section>
              <q-item-label>Delete alerts</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-card-actions>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('modalsStore', ['setAlertsModalVisibility', 'setDeleteAlertsModalVisibility']),
    ...mapActions('booksStore', ['deleteBookFromWatchlist', 'setCurrentWatchlistBook']),
    showAlertsModal () {
      this.setCurrentWatchlistBook(this.book)
      this.setAlertsModalVisibility(true)
    },
    getAlertTypesForBook (book) {
      const alertTypes = [book.hasStockAlert ? 'stock' : '', book.hasPriceAlert ? 'price' : ''].filter(alert => alert !== '')
      return alertTypes.length > 1 ? 'This book has enabled stock and price alerts' : `This book has enabled ${alertTypes[0]} alert`
    },
    hasAlerts (book) {
      if (book.hasStockAlert || book.hasPriceAlert) {
        return true
      }
      return false
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
    showDeleteAlertsModal () {
      this.setCurrentWatchlistBook(this.book)
      this.setDeleteAlertsModalVisibility(true)
    }
  }
}
</script>

<style>
.watchlist-actions{
  border-radius:10px;
  padding:0px;
}
</style>
