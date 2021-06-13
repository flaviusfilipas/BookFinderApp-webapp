import axios from 'axios'
import WatchlistBook from '../models/WatchlistBook'
import endpoints from '../shared/endpoints'
import functions from '../shared/functions'
import { SessionStorage } from 'quasar'

function buildDeleteAlertMessage (alertType) {
  return `Succesfully deleted ${alertType} ${alertType !== 'all' ? 'alert' : 'alerts'}`
}
const state = {
  watchlistBooks: [],
  books: [],
  authors: [],
  publishers: [],
  coverTypes: [],
  currentOffer: [],
  filters: {
    author: [],
    publisher: [],
    coverType: []
  },
  watchlistFilters: [],
  currentBook: {},
  currentWatchlistBook: {}
}

const actions = {
  addToWishlist ({ commit }, payload) {
    const watchlistBook = new WatchlistBook(payload.book, payload.currentUserId)
    axios.post(`${endpoints.BACKEND_URL}${endpoints.POST_WATCHLIST_BOOK}`, watchlistBook)
      .then(response => {
        commit('addToWishlist', payload.book.offer)
      })
  },
  getWatchlistBooksForCurrentUser ({ commit }) {
    const currentUserId = SessionStorage.getItem('userId')
    axios.get(`${endpoints.BACKEND_URL}${endpoints.BOOKS_URI}/watchlist/user/${currentUserId}`)
      .then(response => {
        commit('getWatchlistBooksForCurrentUser', response.data)
      })
  },
  setFilter ({ commit }, payload) {
    commit('setFilters', payload)
  },
  setWatchlistFilters ({ commit }, value) {
    commit('setWatchlistFilters', value)
  },
  clearFilters ({ commit }) {
    commit('clearFilters')
  },
  clearCurrentOffer ({ commit }) {
    commit('clearCurrentOffer')
  },
  setCurrentBook ({ commit }, currentBook) {
    commit('setCurrentBook', currentBook)
  },
  setCurrentWatchlistBook ({ commit }, watchlistBook) {
    commit('setCurrentWatchlistBook', watchlistBook)
  },
  addAlert ({ dispatch }, payload) {
    const alertType = functions.getAlertType(payload.alertOpt)
    axios.post(`${endpoints.BACKEND_URL}${endpoints.USER_WATCHLIST_URI}/alerts/${payload.currentBook.id}?alertType=${alertType}`)
      .then(response => {
        dispatch('getWatchlistBooksForCurrentUser')
      })
  },
  deleteBookFromWatchlist ({ dispatch }, bookId) {
    axios.delete(`${endpoints.BACKEND_URL}${endpoints.USER_WATCHLIST_URI}/${bookId}`)
      .then(response => {
        dispatch('getWatchlistBooksForCurrentUser')
        this._vm.$q.notify({
          type: 'positive',
          timeout: 500,
          message: 'Succesfully deleted item from watchlist'
        })
      })
  },
  deleteAlerts ({ dispatch }, payload) {
    const alertType = functions.getAlertType(payload.deleteAlertOpt)
    axios.delete(`${endpoints.BACKEND_URL}${endpoints.USER_WATCHLIST_URI}/alerts/${payload.currentBook.id}?alertType=${alertType}`)
      .then(response => {
        dispatch('getWatchlistBooksForCurrentUser')
        this._vm.$q.notify({
          type: 'positive',
          timeout: 650,
          message: buildDeleteAlertMessage(alertType)
        })
      })
  },
  searchBooks ({ commit }, searchWord) {
    const carturestiUrl = encodeURIComponent(`https://www.carturesti.ro/product/search/${searchWord}?page=1&id_product_type=26`)
    const carturestiUri = encodeURI(`${endpoints.SPLASH_URL}?url=${carturestiUrl}&wait=1&forbidden_content_types=text/css,font/*&filters=easylist`)
    const carturestiReq = axios.get(`${endpoints.SCRAPYRT_URL}?url=${carturestiUri}&spider_name=carturesti`)
    this._vm.$q.loading.show({
      message: 'Searching books'
    })
    carturestiReq.then(response => {
      commit('addBooks', response.data)
      this._vm.$q.loading.hide()
      if (this.$router.currentRoute.path !== '/results') {
        this.$router.push('results')
      }
    }).catch(errors => {})
  },
  findCurrentOffers ({ commit }, currentBook) {
    console.log('current book isbn ' + currentBook.isbn)
    const divertaUri = encodeURI(`${endpoints.SPLASH_URL}?url=https://www.dol.ro/?sn.q=${currentBook.isbn}&wait=1&forbidden_content_types=text/css,font/*&filters=easylist&images=0`)
    const librisUrl = `https://www.libris.ro/?sn.q=${currentBook.isbn}`
    const librisUri = encodeURI(`${endpoints.SPLASH_URL}?url=${librisUrl}&forbidden_content_types=text/css,font/*&filters=easylist`)
    const librarieNetUri = encodeURI(`${endpoints.SPLASH_URL}?url=https://www.librarie.net/cautare-rezultate.php?t=${currentBook.title}&forbidden_content_types=text/css,font/*&filters=easylist`)
    const emagUri = encodeURI(`${endpoints.SPLASH_URL}?url=https://www.emag.ro/search/${currentBook.isbn}?ref=effective_search&forbidden_content_types=text/css,font/*`)

    const divertaReq = axios.get(`${endpoints.SCRAPYRT_URL}?url=${divertaUri}&spider_name=diverta`)
    const librisReq = axios.get(`${endpoints.SCRAPYRT_URL}?url=${librisUri}&spider_name=libris`)
    const librarieNetReq = axios.get(`${endpoints.SCRAPYRT_URL}?url=${librarieNetUri}&spider_name=librarienet&crawl_args=${encodeURIComponent(`{"isbn":"${currentBook.isbn}"}`)}`)
    const emagReq = axios.get(`${endpoints.SCRAPYRT_URL}?url=${emagUri}&spider_name=emag`)
    const elefantUri = encodeURIComponent(`https://www.elefant.ro/search?SearchTerm=${currentBook.isbn}`)
    const elefantReq = axios.get(`${endpoints.SCRAPYRT_URL}?url=${elefantUri}&spider_name=elefant`)
    const booksExpressUri = encodeURIComponent(`https://www.books-express.ro/search?q=${currentBook.isbn}`)
    const booksExpressReq = axios.get(`${endpoints.SCRAPYRT_URL}?url=${booksExpressUri}&spider_name=booksExpress&callback=parse_book_info`)
    axios.all([divertaReq, librisReq, librarieNetReq, emagReq, elefantReq, booksExpressReq])
      .then(axios.spread((...responses) => {
        const divertaResponse = responses[0].data
        const librisResponse = responses[1].data
        const librarieNetResponse = responses[2].data
        const emagResponse = responses[3].data
        const elefantResponse = responses[4].data
        const booksExpressResponse = responses[5].data
        console.log(responses)
        commit('buildOffer', { divertaResponse, librisResponse, librarieNetResponse, emagResponse, elefantResponse, booksExpressResponse, currentBook })
      })).catch(errors => {
      // react on errors.
      })
  }
}

const mutations = {
  getWatchlistBooksForCurrentUser (state, payload) {
    state.watchlistBooks = payload
  },
  clearCurrentOffer (state) {
    state.currentOffer = []
  },
  buildOffer (state, payload) {
    console.log('offer')
    console.log(payload)
    state.currentOffer = []
    state.currentOffer.push({ ...payload.currentBook.offer, isAddedToWatchlist: false })
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(payload)) {
      if (value.items.length > 0) {
        state.currentOffer.push({ ...value.items[0].offer, isAddedToWatchlist: false })
      }
    }
  },
  addBooks (state, payload) {
    console.log(payload)
    const authors = []
    const publishers = []
    const coverTypes = []
    const list = payload.items.map(book => {
      const author = book.author
      const publisher = book.publisher
      const coverType = book.coverType
      if (author !== null && author !== undefined) {
        authors.push({ value: author, label: author })
      }
      if (publisher !== null && publisher !== undefined) {
        publishers.push({ value: publisher, label: publisher })
      }
      if (coverType !== null && coverType !== undefined) {
        coverTypes.push({ value: coverType, label: coverType })
      }
      return book
    })
    state.books = list
    state.authors = [...new Map(authors.map(item => [item.value, item])).values()]
    state.publishers = [...new Map(publishers.map(item => [item.value, item])).values()]
    state.coverTypes = [...new Map(coverTypes.map(item => [item.value, item])).values()]
    console.log(state.books)
  },

  addToWishlist (state, payload) {
    const offer = state.currentOffer.find(element => element.provider === payload.provider)
    offer.isAddedToWatchlist = true
  },
  setFilters (state, payload) {
    const filters = []
    for (let i = 0; i < payload.value.length; i++) {
      if (typeof (payload.value[i]) === 'object') {
        filters.push(payload.value[i].label)
      } else {
        filters.push(payload.value[i])
      }
    }
    switch (payload.filterType) {
      case 'author': state.filters.author = filters
        break
      case 'publisher': state.filters.publisher = filters
        break
      case 'coverType': state.filters.coverType = filters
        break
      default: alert('Invalid filterType')
    }
  },
  setWatchlistFilters (state, value) {
    const filters = []
    for (let i = 0; i < value.length; i++) {
      filters.push(value[i])
    }
    state.watchlistFilters = filters
  },
  clearFilters (state) {
    state.filters.author = []
    state.filters.publisher = []
    state.filters.coverType = []
    state.watchlistFilters = []
  },
  setCurrentBook (state, currentBook) {
    state.currentBook = currentBook
  },
  setCurrentWatchlistBook (state, watchlistBook) {
    state.currentWatchlistBook = watchlistBook
  }
}

const getters = {
  getWishlistBooks: (state) => {
    if (state.watchlistFilters.length > 0) {
      if (state.watchlistFilters.length > 1) {
        return state.watchlistBooks.filter(item => {
          return item.hasPriceAlert === true || item.hasStockAlert === true
        })
      } else {
        if (state.watchlistFilters[0] === 'stock') {
          return state.watchlistBooks.filter(item => {
            return item.hasStockAlert === true
          })
        } else {
          return state.watchlistBooks.filter(item => {
            return item.hasPriceAlert === true
          })
        }
      }
    }
    return state.watchlistBooks
  },
  getBooks: (state) => {
    const filterKeys = Object.keys(state.filters)
    const filteredBooks = state.books.filter(item => {
      return filterKeys.every(key => {
        if (!state.filters[key].length) return true
        return state.filters[key].find(filter => {
          if (item[key] !== null && item[key] !== undefined) {
            return item[key].includes(filter)
          } return false
        })
      })
    })
    if (state.filters) {
      return filteredBooks
    }
    return state.books
  },
  getAuthors: (state) => {
    return state.authors
  },
  getPublishers: (state) => {
    return state.publishers
  },
  getCoverTypes: (state) => {
    return state.coverTypes
  },
  getCurrentOffer: (state) => {
    return state.currentOffer
  },
  getCurrentBook: (state) => {
    return state.currentBook
  },
  getCurrentWatchlistBook: (state) => {
    return state.currentWatchlistBook
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
