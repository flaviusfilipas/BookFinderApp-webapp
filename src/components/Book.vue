<template>
    <q-card class="my-card q-ma-sm">
      <div class="book-image-container">
          <img class="book-image q-ma-md" :src="book.imgUrl">
        </div>
      <q-card-section class="q-pa-xs" >
          <div class="book-info-area text-subtitle2 text-center" v-text="book.title">
          </div>
              <q-tooltip>{{book.title}}</q-tooltip>
          <div class="book-info-area text-caption text-center" >By: {{book.author}}</div>
      </q-card-section>
      <q-card-section class="q-pa-xs"   >
        <div :class="[book.isbn !== null ? 'book-info-area text-bold text-center' : 'book-info-area text-bold text-center invisible']">ISBN: {{book.isbn}}</div>
        <div class="book-info-area text-italic text-center">{{ book | processBookInformation }}</div>
      </q-card-section>
      <q-card-actions class="q-pa-xs">
        <q-btn flat @click="showOffersModal(book)"> Offers</q-btn>
      </q-card-actions>
  </q-card>
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
    ...mapActions('booksStore', ['setOffersLoadingSpinner', 'setOffersModalVisibility', 'setCurrentBook', 'findCurrentOffers']),
    showOffersModal (currentBook) {
      this.setCurrentBook(currentBook)
      // this.currentBook = currentBook
      this.setOffersModalVisibility(true)
      this.setOffersLoadingSpinner(true)
      // this.offersModal = true
      // this.isOffersLoadingSpinnerVisible = true
      this.findCurrentOffers(currentBook)
    }
  },
  filters: {
    processBookInformation (book) {
      const bookInfo = [book.coverType, `${book.numberOfPages} pages`, `publisher ${book.publisher}`]
      if (bookInfo !== null && bookInfo !== undefined) {
        return bookInfo.filter(info => (info !== null && info !== undefined) && (!info.includes('null') && !info.includes('undefined'))).join(', ')
      }
      return 'Information currently unavailable '
    }
  }
}
</script>

<style>
.book-image-container{
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .book-image{
   display:block;
   max-width:100%;
   max-height:100%
  }
  .book-info-area{
    height:44px;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .my-card{
  width: 100%;
  max-width: 200px;
  }
  @media(max-width: 695px){
   .my-card{
    width: 100%;
    max-width: 150px;
    }
  }
</style>
