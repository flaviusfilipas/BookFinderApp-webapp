const BACKEND_URL = 'http://localhost:8081'
const SPLASH_URL = 'http://localhost:8050/render.html'
const SCRAPYRT_URL = 'http://localhost:9080/crawl.json'
const POST_USER = '/api/users'
const PUT_USER = '/api/users'
const BOOKS_URI = '/api/books'
const USER_WATCHLIST_URI = '/api/user-watchlists'
const POST_WATCHLIST_BOOK = `${BOOKS_URI}/watchlist`

export default {
  BACKEND_URL,
  SPLASH_URL,
  SCRAPYRT_URL,
  POST_USER,
  PUT_USER,
  BOOKS_URI,
  USER_WATCHLIST_URI,
  POST_WATCHLIST_BOOK
}
