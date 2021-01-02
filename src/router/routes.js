
const routes = [
  {
    path: '/', redirect: '/search'
  },
  {
    path: '/search',
    component: () => import('layouts/LandingPageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/wishlist', component: () => import('pages/Wishlist.vue') },
  { path: '/help', component: () => import('pages/Help.vue') },
  { path: '/results', component: () => import('pages/BooksResult.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/err',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
