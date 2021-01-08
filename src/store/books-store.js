const state = {
  drinks: [],
  wishlistDrinks: [],
  books: [
    {
      id: 1,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg'
    }, {
      id: 2,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      editura: 'Harper Perennial',
      isbn: '978-1-79921-863-0',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg'
    }, {
      id: 3,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg'
    }, {
      id: 4,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg'
    }, {
      id: 5,
      title: 'Sapiens',
      author: 'Yuval Noah Harrari',
      isbn: '978-1-79921-863-0',
      editura: 'Harper Perennial',
      imgSource: 'https://cdn.dc5.ro/img-prod/1983201-0-240.jpeg'
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
  ]
}

const actions = {
  saveDrinks ({ commit }, payload) {
    commit('saveDrinks', payload)
  },
  addToWishlist ({ commit }, payload) {
    commit('addToWishlist', payload)
  }
}

const mutations = {
  saveDrinks (state, payload) {
    Object.assign(state.drinks, payload.drinks)
  },
  addToWishlist (state, payload) {
    state.wishlistDrinks.push(payload)
  }
}

const getters = {
  getDrinks: (state) => {
    return state.drinks
  },
  getWishlistDrinks: (state) => {
    return state.wishlistDrinks
  },
  getBooks: (state) => {
    return state.books
  },
  getAuthors: (state) => {
    return state.authors
  },
  getPublishers: (state) => {
    return state.publishers
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
