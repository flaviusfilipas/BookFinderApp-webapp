import { SessionStorage } from 'quasar'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedIn = SessionStorage.getItem('loggedIn')
    if (!loggedIn && to.path === '/watchlist') {
      next()
    } else {
      next()
    }
  })
}
