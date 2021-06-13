<template>
  <q-card class="watchlist-card q-pa-sm q-ma-sm">
    <q-card-section horizontal>
      <q-img class="watchlist-book-image cursor-pointer" @click="goToProviderPage(book.bookDTO.offer.link)" :src="book.bookDTO.imgUrl" height="190px">
        <q-tooltip>Go to provider</q-tooltip>
      </q-img>
      <watchlist-book-actions :book="book"/>
    </q-card-section>
    <watchlist-book-info-section :book="book" />
  </q-card>
</template>

<script>
import WatchlistBookInfoSection from './WatchlistBookInfoSection.vue'
import WatchlistBookActions from './WatchlistBookActions.vue'
export default {
  components: { WatchlistBookInfoSection, WatchlistBookActions },
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToProviderPage (link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style>
  .watchlist-card{
    width: 100%;
    max-width: 200px;
  }
  .watchlist-book-image {
    height:100%;
    max-height:190px;
  }
   @media(max-width: 897px){
    .watchlist-card {
      width: 100%;
      max-width: 150px;
    }
   }
</style>
