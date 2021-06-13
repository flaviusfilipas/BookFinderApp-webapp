<template>
  <q-card-section class="q-pa-xs book-info-section">
    <span class="watch-book-info-area">
      <div class="watch-book-info-area text-subtitle2">{{book.bookDTO.title}}</div>
      <q-tooltip>{{book.bookDTO.title}}</q-tooltip>
    </span>
    <div class="watch-book-info-area text-caption">By: {{book.bookDTO.author}}</div>
    <div class="watch-book-info-area text-caption text-bold">ISBN: {{book.bookDTO.isbn}}</div>
    <div class="watch-book-info-area text-caption text-italic">{{book.bookDTO.coverType}}, {{book.bookDTO.numberOfPages}} pages, publisher {{book.bookDTO.publisher}}</div>
    <div v-if="book.bookDTO.offer.hasStock" class="watch-book-info-area text-caption text-italic text-positive">In stock</div>
    <div v-else class="watch-book-info-area text-caption text-italic text-negative">Not in stock</div>
    <div class="watch-book-info-area text-caption text-italic">Sold by <b>{{book.bookDTO.offer.provider}}</b></div>
    <div class="watch-book-info-area text-subtitle1 text-bold">Original Price: {{book.originalPrice}} lei</div>
    <div class="watch-book-info-area text-subtitle1 text-bold">Last Price: {{book.lastPrice}} lei</div>
  </q-card-section>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.watch-book-info-area{
  height:40px;
  text-overflow:ellipsis;
  overflow:hidden;
}
@media(min-width: 897px) {
  .book-info-section-title{
    display: none;
  }
}
@media(max-width: 897px){
  .book-info-section{
     padding: 0px;
  }
}
</style>
