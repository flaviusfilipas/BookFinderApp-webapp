export default class WatchlistBook {
  constructor (book, offer, currentUserId) {
    this.id = null
    this.bookDTO = book
    this.originalPrice = offer.price
    this.lastPrice = offer.lastPrice
    this.currentUserId = currentUserId
    this.hasStockAlert = false
    this.hasPriceAlert = false
  }
}
