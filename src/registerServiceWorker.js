import { Workbox } from "workbox-window"

let wb

if ("serviceWorker" in navigator) {
  wb = new Workbox(`${process.env.BASE_URL}service-worker.js`)
  wb.register().then((registration) => {
    console.log('Service worker registration succeeded:', registration)
  }, (error) => {
    console.error(`Service worker registration failed: ${error}`)
  })
} else {
  wb = null
  console.error('Service workers are not supported.')
}

export default wb
