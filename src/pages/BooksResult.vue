<template>
  <q-page class="row">
    <div class="col-2 q-ma-sm">
      <q-list class="filters" padding>
        <q-item-label class="q-ml-sm q-mb-sm text-h6">
          Authors
        </q-item-label>
        <q-option-group
          class="q-mb-sm"
          :options="authors"
          v-model="optAuthors"
            color="blue"
          type="checkbox"/>
        <q-item-label class="q-ml-sm q-mb-sm text-h6">
          Publishers
        </q-item-label>
        <q-option-group
        :options="publishers"
        v-model="optPublishers"
        color="blue"
        type="checkbox"
        />
      </q-list>
    </div>
    <div class="col-9">
      <q-list class="row">
          <q-card class="my-card q-pa-sm q-ma-sm" v-for="book in booksResults" :key="book.id">
          <q-img :src="book.imgSource">
            <div class="absolute-bottom">
              <div class="text-h6" v-text="book.title"></div>
              <div class="text-subtitle2">By: {{book.author}}</div>
            </div>
          </q-img>
          <q-card-section>
            <div class="text-overline">ISBN: {{book.isbn}}</div>
            <div class="text-caption text-italic">{{book.type}}, {{book.pages}} pages, publisher {{book.publisher}}</div>
          </q-card-section>
          <q-card-actions class="relative-position">
            <q-btn flat>Offers</q-btn>
          </q-card-actions>
        </q-card>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      current: 1,
      optAuthors: ['yuval'],
      optPublishers: ['Gotham']
    }
  },
  computed: {
    booksResults () {
      return this.$store.getters['booksStore/getBooks']
    },
    authors () {
      return this.$store.getters['booksStore/getAuthors']
    },
    publishers () {
      return this.$store.getters['booksStore/getPublishers']
    }
  },
  methods: {
    ...mapActions('booksStore', ['addToWishlist']),
    addToWishlists (item) {
      this.addToWishlist(item, item)
    },
    goToBook (bookId) {
      this.$q.loading.show({
        message: 'Finding best offers'
      })
      setTimeout(() => {
        this.$q.loading.hide()
        this.$router.push(`/books/${bookId}`)
      }, 2500)
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
  }
</style>
