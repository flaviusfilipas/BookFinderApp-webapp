import Vue from 'vue'
import axios from 'axios'
const state = {
  watchlistBooks: [
    {
      id: 1,
      title: 'Sapiens. Scurta istorie a omenirii',
      author: 'Yuval Noah Harari',
      isbn: '978-1-79921-863-0',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'Hardcover',
      pages: 384,
      publisher: 'Polirom',
      hasStock: true,
      hasStockAlert: false,
      hasPriceAlert: false,
      provider: 'Carturesti',
      price: 64
    }, {
      id: 2,
      title: 'Sapiens. A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      isbn: '9780099590088',
      imgSource: 'http://mcdn.elefant.ro/mnresize/350/350/is/product-images/cartero/801a0f96/0d46/41b8/83cd/3487a8f6e379/801a0f96-0d46-41b8-83cd-3487a8f6e379_1.jpg',
      type: 'Hardcover',
      pages: 512,
      publisher: 'Vintage',
      hasStock: true,
      hasStockAlert: false,
      hasPriceAlert: false,
      provider: 'Carturesti',
      price: 64
    }, {
      id: 3,
      title: 'Cosmosapiens- Evolutia omului de la originile universului',
      author: 'John Hands',
      isbn: '978-973-50-6584-3',
      imgSource: 'http://mcdn.elefant.ro/mnresize/350/350/is/product-images/cartero/434fb1c2/ebf9/4caf/8f10/a6427e460a9d/434fb1c2-ebf9-4caf-8f10-a6427e460a9d_1.PNG',
      type: 'Hardcover',
      pages: 756,
      publisher: 'Humanitas',
      hasStock: false,
      hasStockAlert: false,
      hasPriceAlert: false,
      provider: 'Elefant',
      price: 64
    }
  ],
  unfilteredBooks: [],
  filteredBooks: [],
  books: [
    {
      id: 1,
      title: 'Sapiens-Cele mai recente descoperiri',
      author: 'Francois Savaier, Silvana Condemi',
      isbn: '978-973-50-6868-4',
      imgSource: 'http://mcdn.elefant.ro/mnresize/350/350/is/product-images/cartero/e13ea723/c3a7/407a/a60f/4c056d485f50/e13ea723-c3a7-407a-a60f-4c056d485f50_1.jpg',
      type: 'Paperback',
      pages: 140,
      publisher: 'Humanitas'
    }, {
      id: 2,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '978-1-79921-863-0',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'Hardcover',
      pages: 384,
      publisher: 'Polirom'
    }, {
      id: 3,
      title: 'Cu drag, Simon. Simon si planul homo sapiens(editia de film)',
      author: 'Becky Albertalli',
      isbn: ' 978-606-8754-42-0',
      imgSource: 'http://mcdn.elefant.ro/mnresize/350/350/images/46/1237646/cu-drag-simon-simon-si-planul-homo-sapiens-editia-de-film_1_fullsize.jpg',
      type: 'Hardcover',
      pages: 288,
      publisher: 'Epica'
    }, {
      id: 4,
      title: 'Sapiens. A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      isbn: '9780099590088',
      imgSource: 'http://mcdn.elefant.ro/mnresize/350/350/is/product-images/cartero/801a0f96/0d46/41b8/83cd/3487a8f6e379/801a0f96-0d46-41b8-83cd-3487a8f6e379_1.jpg',
      type: 'Hardcover',
      pages: 512,
      publisher: 'Vintage'
    }, {
      id: 5,
      title: 'Sapiens. O istorie grafica. Volumul I. Nasterea omenirii',
      author: 'Yuval Noah Harari, David Vandermeulen, Daniel Casanave',
      isbn: '9789734683093',
      imgSource: 'https://cdn.dc5.ro/img-prod/915949772-0-240.jpeg',
      type: 'Hardcover',
      pages: 248,
      publisher: 'Polirom'
    },
    {
      id: 6,
      title: 'Cosmosapiens- Evolutia omului de la originile universului',
      author: 'John Hands',
      isbn: '978-973-50-6584-3',
      imgSource: 'http://mcdn.elefant.ro/mnresize/350/350/is/product-images/cartero/434fb1c2/ebf9/4caf/8f10/a6427e460a9d/434fb1c2-ebf9-4caf-8f10-a6427e460a9d_1.PNG',
      type: 'Hardcover',
      pages: 756,
      publisher: 'Humanitas'
    }, {
      id: 7,
      title: 'Sapiens. A Brief History of Humankind: (Patterns of Life), Paperback',
      author: 'Yuval Noah Harari',
      isbn: '1784873640',
      imgSource: 'http://mcdn.elefant.ro/mnresize/750/750/is/product-images/carte-straina/gardners/49bdc011/ba1a/403d/bf16/9991c1449201/49bdc011-ba1a-403d-bf16-9991c1449201_1.jpg',
      type: 'Paperback',
      pages: 544,
      publisher: 'Vintage Publishing'
    }, {
      id: 8,
      title: 'A Pocket History of Human Evolution: How We Became Sapiens, Paperback',
      author: 'Silvana Condemi',
      isbn: '1615196048',
      imgSource: 'http://mcdn.elefant.ro/mnresize/750/750/is/product-images/carte-straina/ingram/20200404/0f16cb80/fe34/447d/bf0c/079ce84e08fb/0f16cb80-fe34-447d-bf0c-079ce84e08fb_1.jpg',
      type: 'Paperback',
      pages: 160,
      publisher: 'Experiment'
    }
  ],
  authors: [
    {
      label: 'Yuval Noah Harari',
      value: 'Yuval Noah Harari'
    }, {
      label: 'John Hands',
      value: 'John Hands'
    }, {
      label: 'Becky Albertalli',
      value: 'Becky Albertalli'
    }, {
      label: 'Francois Savaier',
      value: 'Francois Savaier'
    }, {
      label: 'Silvana Condemi',
      value: 'Silvana Condemi'
    }, {
      label: 'David Vandermeulen',
      value: 'David Vandermeulen'
    }, {
      label: 'Daniel Casanave',
      value: 'Daniel Casanave'
    }
  ],
  publishers: [
    {
      label: 'Litera',
      value: 'Litera'
    }, {
      label: 'Humanitas',
      value: 'Humanitas'
    }, {
      label: 'Polirom',
      value: 'Polirom'
    }, {
      label: 'Experiment',
      value: 'Experiment'
    }, {
      label: 'Vintage Publishing',
      value: 'Vintage Publishing'
    }, {
      label: 'Vintage',
      value: 'Vintage'
    }, {
      label: 'Epica',
      value: 'Epica'
    }
  ],
  bookTypes: [
    {
      label: 'Hardcover',
      value: 'Hardcover'
    }, {
      label: 'Paperback',
      value: 'Paperback'
    }
  ],
  offers: [
    {
      id: 1,
      storeName: 'Carturesti',
      hasStock: true,
      price: 60,
      transportaionPrice: 16,
      bookUrl: 'https://carturesti.ro/carte/sapiens-scurta-istorie-a-omenirii-1983201?p=1',
      isAddedToWatchlist: false
    }, {
      id: 2,
      storeName: 'Elefant',
      hasStock: false,
      price: 55,
      transportaionPrice: 20,
      bookUrl: 'https://www.elefant.ro/sapiens-scurta-istorie-a-omenirii_801a0f96-0d46-41b8-83cd-3487a8f6e379?tracking=searchterm:sapiens',
      isAddedToWatchlist: false
    }, {
      id: 3,
      storeName: 'Libris',
      hasStock: true,
      price: 50,
      transportaionPrice: 15,
      bookUrl: 'https://www.libris.ro/sapiens-scurta-istorie-a-omenirii-yuval-noah-POL978-973-46-4888-7--p1166978.html',
      isAddedToWatchlist: false
    }, {
      id: 4,
      storeName: 'Librarie.net',
      hasStock: false,
      price: 65,
      transportaionPrice: 16,
      bookUrl: 'https://www.librarie.net/p/298142/sapiens-scurta-istorie-a-omenirii',
      isAddedToWatchlist: false
    }, {
      id: 5,
      storeName: 'Emag',
      hasStock: true,
      price: 63.27,
      transportaionPrice: 10,
      bookUrl: 'https://www.emag.ro/sapiens-scurta-istorie-a-omenirii-yuval-noah-harari-9789734648887/pd/D67WBNBBM/?X-Search-Id=60bccc323beb6c1b71f6&X-Product-Id=41691636&X-Search-Page=1&X-Search-Position=0&X-Section=search&X-MB=0&X-Search-Action=view',
      isAddedToWatchlist: false
    }
  ],
  filters: {
    author: [],
    publisher: [],
    type: []
  },
  watchlistFilters: []
}

const actions = {
  addToWishlist ({ commit }, payload) {
    commit('addToWishlist', payload)
  },
  setAuthorsFilter ({ commit }, value) {
    commit('setAuthorsFilter', value)
  },
  setPublishersFilter ({ commit }, value) {
    commit('setPublishersFilter', value)
  },
  setWatchlistFilters ({ commit }, value) {
    commit('setWatchlistFilters', value)
  },
  filterBooks ({ commit }) {
    commit('filterBooks')
  },
  clearFilters ({ commit }) {
    commit('clearFilters')
  },
  setBookTypesFilter ({ commit }, value) {
    commit('setBookTypesFilter', value)
  },
  addAlert ({ commit }, payload) {
    commit('addAlert', payload)
  },
  deleteBookFromWatchlist ({ commit }, bookId) {
    commit('deleteFromWatchlist', bookId)
  },
  deleteAlert ({ commit }, payload) {
    commit('deleteAlert', payload)
  },
  searchBooks ({ commit }, searchWord) {
    const SPLASH_URL = 'http://localhost:8050/render.html'
    const SCRAPYRT_URL = 'http://localhost:9080/crawl.json'
    const divertaUri = encodeURI(`${SPLASH_URL}?url=https://www.dol.ro/?sn.q=${searchWord}&sn.l=40&sn.s=-score&sn.o=0&forbidden_content_types=text/css,font/*&filters=easylist&images=0`)
    const carturestiUrl = encodeURIComponent(`https://www.carturesti.ro/product/search/${searchWord}?page=1&id_product_type=26`)
    const carturestiUri = encodeURI(`${SPLASH_URL}?url=${carturestiUrl}&forbidden_content_types=text/css,font/*&filters=easylist`)
    const librisUrl = encodeURIComponent(`https://www.libris.ro/?sn.l=30&sn.q=${searchWord}`)
    const librisUri = encodeURI(`${SPLASH_URL}?url=${librisUrl}&forbidden_content_types=text/css,font/*&filters=easylist`)
    const librarieNetUri = encodeURI(`${SPLASH_URL}?url=https://www.librarie.net/cautare-rezultate.php?t=${searchWord}&forbidden_content_types=text/css,font/*&filters=easylist`)
    const elefantUri = encodeURIComponent(`https://www.elefant.ro/search?SearchTerm=${searchWord}&StockAvailability=true&SortValue=bestseller`)
    const emagUri = encodeURI(`${SPLASH_URL}?url=https://www.emag.ro/search/${searchWord}%20carte?ref=effective_search&forbidden_content_types=text/css,font/*`)

    const divertaReq = axios.get(`${SCRAPYRT_URL}?url=${divertaUri}&spider_name=diverta`)
    const carturestiReq = axios.get(`${SCRAPYRT_URL}?url=${carturestiUri}&spider_name=carturesti`)
    const librisReq = axios.get(`${SCRAPYRT_URL}?url=${librisUri}&spider_name=libris`)
    const librarieNetReq = axios.get(`${SCRAPYRT_URL}?url=${librarieNetUri}&spider_name=librarienet`)
    const elefantReq = axios.get(`${SCRAPYRT_URL}?url=${elefantUri}&spider_name=elefant`)
    const emagReq = axios.get(`${SCRAPYRT_URL}?url=${emagUri}&spider_name=emag`)
    this._vm.$q.loading.show({
      message: 'Searching books'
    })
    axios.all([divertaReq, carturestiReq, librisReq, librarieNetReq, elefantReq, emagReq])
      .then(axios.spread((...responses) => {
        const divertaResponse = responses[0].data
        const carturestiResponse = responses[1].data
        const librisResponse = responses[2].data
        const librarieNetResponse = responses[3].data
        const elefantResponse = responses[4].data
        const emagResponse = responses[5].data
        commit('addBooks', { divertaResponse, carturestiResponse, librisResponse, librarieNetResponse, elefantResponse, emagResponse })
        this._vm.$q.loading.hide()
        this.$router.push('results')
      })).catch(errors => {
      // react on errors.
      })
  }
}

const mutations = {
  addBooks (state, payload) {
    console.log(payload)
    state.unfilteredBooks = [...payload.divertaResponse.items, ...payload.carturestiResponse.items,
      ...payload.librisResponse.items, ...payload.librarieNetResponse.items, ...payload.elefantResponse.items, ...payload.emagResponse.items]
    console.log(state.unfilteredBooks)
    const unfilteredBooks = state.unfilteredBooks
    for (const book of unfilteredBooks) {
      const existentBook = state.filteredBooks.find(element => book.isbn !== null && element.isbn === book.isbn)
      if (existentBook) {
        existentBook.offers.push(book.offer)
      } else {
        // eslint-disable-next-line dot-notation
        const filteredBook = { ...book, offers: [] }
        filteredBook.offers.push(book.offer)
        state.filteredBooks.push(filteredBook)
      }
    }

    console.log(state.filteredBooks)
  },

  addToWishlist (state, payload) {
    for (let i = 0; i < state.offers.length; i++) {
      if (state.offers[i].id === payload.id) {
        state.offers[i].isAddedToWatchlist = true
      }
    }
  },
  setAuthorsFilter (state, value) {
    const filters = []
    for (let i = 0; i < value.length; i++) {
      if (typeof (value[i]) === 'object') {
        filters.push(value[i].label)
      } else {
        filters.push(value[i])
      }
    }
    state.filters.author = filters
  },
  setPublishersFilter (state, value) {
    const filters = []
    for (let i = 0; i < value.length; i++) {
      if (typeof (value[i]) === 'object') {
        filters.push(value[i].label)
      } else {
        filters.push(value[i])
      }
    }
    state.filters.publisher = filters
  },
  setBookTypesFilter (state, value) {
    const filters = []
    for (let i = 0; i < value.length; i++) {
      if (typeof (value[i]) === 'object') {
        filters.push(value[i].label)
      } else {
        filters.push(value[i])
      }
    }
    state.filters.type = filters
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
    state.filters.type = []
    state.watchlistFilters = []
  },
  addAlert (state, payload) {
    for (let i = 0; i < state.watchlistBooks.length; i++) {
      if (state.watchlistBooks[i].id === payload.currentBook.id) {
        if (payload.alertOpt === 'stock') {
          state.watchlistBooks[i].hasStockAlert = true
        } else {
          state.watchlistBooks[i].hasPriceAlert = true
        }
      }
    }
  },
  deleteFromWatchlist (state, bookId) {
    const watchlistBooks = state.watchlistBooks
    const index = watchlistBooks.indexOf(watchlistBooks.find(book => { return book.id === bookId }))
    Vue.delete(state.watchlistBooks, index)
  },
  deleteAlert (state, payload) {
    for (let i = 0; i < state.watchlistBooks.length; i++) {
      if (state.watchlistBooks[i].id === payload.currentBook.id) {
        if (payload.deleteAlertOpt === 'stock') {
          state.watchlistBooks[i].hasStockAlert = false
        } else if (payload.deleteAlertOpt === 'price') {
          state.watchlistBooks[i].hasPriceAlert = false
        } else {
          state.watchlistBooks[i].hasPriceAlert = false
          state.watchlistBooks[i].hasStockAlert = false
        }
      }
    }
  }
}

const getters = {
  getDrinks: (state) => {
    return state.drinks
  },
  getUnfilteredBooks: (state) => {
    return state.unfilteredBooks
  },
  getFilteredBooks: (state) => {
    return state.filteredBooks
  },
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
    const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value)
    const filteredBooks = state.books.filter(item => {
      return filterKeys.every(key => {
        if (!state.filters[key].length) return true
        return state.filters[key].find(filter => getValue(item[key]).includes(getValue(filter)))
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
  getBookTypes: (state) => {
    return state.bookTypes
  },
  getOffers: (state) => {
    return state.offers
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
