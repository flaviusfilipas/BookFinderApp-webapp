<template>
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
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import functions from '../../shared/functions.js'
export default {
  data () {
    return {
      alertOpt: []
    }
  },
  methods: {
    ...mapActions('booksStore', ['addAlert']),
    ...mapActions('modalsStore', ['setAlertsModalVisibility']),
    addBookAlert () {
      const currentBook = this.currentWatchlistBook
      const alertOpt = this.alertOpt
      this.addAlert({ currentBook, alertOpt })
      this.notifyAlert()
    },
    notifyAlert () {
      const alertOption = functions.getAlertType(this.alertOpt)
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
    }
  },
  computed: {
    ...mapState('booksStore', ['currentWatchlistBook']),
    ...mapGetters('modalsStore', ['getAlertsModal']),
    alertModal: {
      get () {
        return this.getAlertsModal
      },
      set (value) {
        this.setAlertsModalVisibility(value)
      }
    },
    alertOps () {
      return [
        {
          label: 'Price alert',
          value: 'price',
          disable: this.currentWatchlistBook.hasPriceAlert
        },
        {
          label: 'Stock alert',
          value: 'stock',
          disable: this.currentWatchlistBook.hasStockAlert
        }
      ]
    }
  }
}
</script>

<style>

</style>
