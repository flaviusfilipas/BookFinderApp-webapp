<template>
   <q-btn class="q-pa-md" flat round unelevated>
      <q-avatar exact class="cursor-pointer" color='white' text-color="blue"> {{user | getCapitalizedFirstLetter }} </q-avatar>
        <q-menu>
            <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Delete Account</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logOut">
              <q-item-section>
                <q-item-label>Log Out</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
    </q-btn>
</template>

<script>
import { SessionStorage } from 'quasar'
import { mapActions, mapState } from 'vuex'
export default {
  methods: {
    ...mapActions('authStore', ['logoutUser']),
    logOut () {
      this.logoutUser()
    }
  },
  computed: {
    ...mapState('authStore', ['loggedIn']),
    user () {
      return SessionStorage.getItem('userName')
    }
  },
  filters: {
    getCapitalizedFirstLetter (name) {
      return name.charAt(0).toUpperCase()
    }
  }
}
</script>

<style>

</style>
