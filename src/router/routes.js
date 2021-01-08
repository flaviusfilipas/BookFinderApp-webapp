
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
  {
    path: '/results',
    component: () => import('layouts/ResultsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BooksResult.vue') }
    ]
  },
  {
    path: '/books',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      { path: ':id', component: () => import('pages/IndividualBook.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Login.vue')
      }
    ]
  },
  {
    path: '/wishlist',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Wishlist.vue')
      }
    ]
  },
  { path: '/help', component: () => import('pages/Help.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/err',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
