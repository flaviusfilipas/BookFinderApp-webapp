<template>
        <q-page class ="flex">
             <q-list class="fit" separator>
               <q-item clickable v-for="book in booksResults" :key="book.id" :to="'/books/' + book.id">
                  <!-- <q-item-section>
                    <q-item-label>Stuff</q-item-label>
                     <img :src="drink.strDrinkThumb">
                     </q-item-section> -->
                  <q-item-section avatar>
                      <q-avatar style="height:1.5em" square size="5em">
                        <img
                          :src="book.imgSource"
                          />
                      </q-avatar>
                  </q-item-section>
                  <q-item-section top>
                    <q-item-label class="text-h5" v-text="book.title"></q-item-label>
                    <q-item-label class= "text-subtitle2" v-text="book.author"></q-item-label>
                    <q-item-label class = "text-caption text-italic" v-text="book.isbn"></q-item-label>

                  </q-item-section>

                  <!-- <q-item-section>
                    <q-item>
                      <q-btn round color="secondary" icon="add" @click="addToWishlists(drink)"/>
                    </q-item>
                  </q-item-section> -->
               </q-item>
             </q-list>
        </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      name: 'Books Result',
      current: 1
    }
  },
  computed: {
    booksResults () {
      return this.$store.getters['booksStore/getBooks']
    }
  },
  methods: {
    ...mapActions('booksStore', ['addToWishlist']),
    addToWishlists (item) {
      this.addToWishlist(item, item)
    }

  }
}

</script>
<style scoped>
</style>
