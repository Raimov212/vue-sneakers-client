import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCOZkKl-Vnp5Xq12CDfgge7bNJRfJcCxZI',
  authDomain: 'sneakers-b83da.firebaseapp.com',
  projectId: 'sneakers-b83da',
  storageBucket: 'sneakers-b83da.appspot.com',
  messagingSenderId: '482831920654',
  appId: '1:482831920654:web:e600a8752107b50924165f',
  measurementId: 'G-8GPYSLDRFJ'
}

const app = initializeApp(firebaseConfig)
export const firebase = getAnalytics(app)
