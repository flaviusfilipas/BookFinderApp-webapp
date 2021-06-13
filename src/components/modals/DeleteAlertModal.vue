<template>
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
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      deleteAlertOpt: []
    }
  },
  methods: {
    ...mapActions('booksStore', ['deleteAlerts']),
    ...mapActions('modalsStore', ['setDeleteAlertsModalVisibility']),
    deleteAlert () {
      const currentBook = this.currentWatchlistBook
      const deleteAlertOpt = this.deleteAlertOpt
      this.deleteAlerts({ currentBook, deleteAlertOpt })
      this.deleteAlertOpt = []
    }
  },
  computed: {
    ...mapState('booksStore', ['currentWatchlistBook']),
    ...mapGetters('modalsStore', ['getDeleteAlertsModal']),
    deleteAlertsModal: {
      get () {
        return this.getDeleteAlertsModal
      },
      set (value) {
        this.setDeleteAlertsModalVisibility(value)
      }
    },
    deleteAlertOps () {
      return [
        {
          label: 'Price alert',
          value: 'price',
          disable: !this.currentWatchlistBook.hasPriceAlert
        },
        {
          label: 'Stock alert',
          value: 'stock',
          disable: !this.currentWatchlistBook.hasStockAlert
        }
      ]
    }
  }
}
</script>

<style>

</style>
