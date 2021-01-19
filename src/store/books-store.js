const state = {
  drinks: [],
  wishlistBooks: [
    {
      id: 1,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'Hardcover',
      pages: 450,
      publisher: 'Litera'
    }, {
      id: 2,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      editura: 'Harper Perennial',
      isbn: '978-1-79921-863-0',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'Hardcover',
      pages: 450,
      publisher: 'Litera'
    }, {
      id: 3,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'Hardcover',
      pages: 450,
      publisher: 'Litera'
    }
  ],
  books: [
    {
      id: 1,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'Paperback',
      pages: 450,
      publisher: 'Litera'
    }, {
      id: 2,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      editura: 'Harper Perennial',
      isbn: '978-1-79921-863-0',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'Hardcover',
      pages: 395,
      publisher: 'Humanitas'
    }, {
      id: 3,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'E-book',
      pages: 465,
      publisher: 'Polirom'
    }, {
      id: 4,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'Paperback',
      pages: 450,
      publisher: 'Litera'
    }, {
      id: 5,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg',
      type: 'Hardcover',
      pages: 450,
      publisher: 'Litera'
    }
  ],
  authors: [
    {
      label: 'Yuval Noah Harrari',
      value: 'yuval'
    }, {
      label: 'Mircea Eliade',
      value: 'Mircea'
    }, {
      label: 'Mihai Eminescu',
      value: 'Mihai'
    }, {
      label: 'Cristi Popesco',
      value: 'Cristi'
    }, {
      label: 'Batman',
      value: 'Batman'
    }
  ],
  publishers: [
    {
      label: 'Litera',
      value: 'Litera'
    }, {
      label: 'Humanits',
      value: 'Humanits'
    }, {
      label: 'Polirom',
      value: 'Polirom'
    }, {
      label: 'Doncafe',
      value: 'Doncafe'
    }, {
      label: 'Gotham.ink',
      value: 'Gotham'
    }
  ],
  offers: [
    {
      id: 1,
      storeName: 'Carturesti',
      hasStock: true,
      price: 60,
      transportaionPrice: 16,
      bookUrl: 'https://carturesti.ro/carte/sapiens-scurta-istorie-a-omenirii-1983201?p=1'
    }, {
      id: 2,
      storeName: 'Elefant',
      hasStock: false,
      price: 55,
      transportaionPrice: 20,
      bookUrl: 'https://www.elefant.ro/sapiens-scurta-istorie-a-omenirii_801a0f96-0d46-41b8-83cd-3487a8f6e379?tracking=searchterm:sapiens'
    }, {
      id: 3,
      storeName: 'Libris',
      hasStock: true,
      price: 50,
      transportaionPrice: 15,
      bookUrl: 'https://www.libris.ro/sapiens-scurta-istorie-a-omenirii-yuval-noah-POL978-973-46-4888-7--p1166978.html'
    }, {
      id: 4,
      storeName: 'Librarie.net',
      hasStock: false,
      price: 65,
      transportaionPrice: 16,
      bookUrl: 'https://www.librarie.net/p/298142/sapiens-scurta-istorie-a-omenirii'
    }, {
      id: 5,
      storeName: 'Emag',
      hasStock: true,
      price: 63.27,
      transportaionPrice: 10,
      bookUrl: 'https://www.emag.ro/sapiens-scurta-istorie-a-omenirii-yuval-noah-harari-9789734648887/pd/D67WBNBBM/?X-Search-Id=60bccc323beb6c1b71f6&X-Product-Id=41691636&X-Search-Page=1&X-Search-Position=0&X-Section=search&X-MB=0&X-Search-Action=view'
    }
  ]
}

const actions = {
  saveDrinks ({ commit }, payload) {
    commit('saveDrinks', payload)
  },
  addToWishlist ({ commit }, payload) {
    console.log(state.wishlistBooks)
    commit('addToWishlist', payload)
  }
}

const mutations = {
  saveDrinks (state, payload) {
    Object.assign(state.drinks, payload.drinks)
  },
  addToWishlist (state, payload) {
    state.wishlistBooks.push(payload)
  }
}

const getters = {
  getDrinks: (state) => {
    return state.drinks
  },
  getWishlistBooks: (state) => {
    return state.wishlistBooks
  },
  getBooks: (state) => {
    return state.books
  },
  getAuthors: (state) => {
    return state.authors
  },
  getPublishers: (state) => {
    return state.publishers
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
