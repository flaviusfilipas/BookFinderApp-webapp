
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
    path: '/login',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Login.vue')
      }
    ]
  }, {
    path: '/register',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Register.vue')
      }
    ]
  },
  {
    path: '/watchlist',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Watchlist.vue')
      }
    ]
  }
  // Always leave this as last one,
  // but you can also remove it
]

export default routes
