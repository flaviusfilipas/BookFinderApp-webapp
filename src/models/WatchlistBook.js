export default class WatchlistBook {
  constructor (book, currentUserId) {
    this.id = null
    this.bookDTO = book
    this.originalPrice = book.offer.price
    this.lastPrice = book.offer.lastPrice
    this.currentUserId = currentUserId
    this.hasStockAlert = false
    this.hasPriceAlert = false
  }
}
