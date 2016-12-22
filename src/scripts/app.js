import QuoteManager from './QuoteManager'
import data from '../data.json'

const teleportSound = new Audio('https://www.myinstants.com/media/sounds/dbz-teleport.mp3')
const quoteManager = new QuoteManager(data)

// weirdo trick
// elements with a specific id can be referred to via the window object
var quoteElement = window.quote
var twitterAnchor = window.twitteranchor

// Hide quote content using animatecss classes
function hideQuote() {
  quoteElement.classList.remove('zoomIn')
  quoteElement.classList.add('zoomOut')
}

// Hide quote content using animatecss classes
function showQuote() {
  quoteElement.classList.remove('zoomOut')
  quoteElement.classList.add('zoomIn')
}

/**
 * Gets a random quote and updates the block for quotes
 */
function changeQuote() {
  var quoteOrDialog = quoteManager.getRandomQuoteOrDialog()

  var quoteOrDialogAsTweet = encodeURIComponent(quoteOrDialog.join(' - '))

  if (quoteOrDialogAsTweet.length > 125) {
    quoteOrDialogAsTweet = quoteOrDialogAsTweet.substr(0, 125) + '...'
  }

  // set the quote
  quoteElement.innerHTML = quoteOrDialog.reduce((textContent, quote) => {
    return `
      ${textContent}
      <p>${quote}</p>
    `
  }, '')

  // set the twitter href
  twitterAnchor.href = 'https://twitter.com/intent/tweet?via=Mi_PiCo&hashtags=frasesdorante&url=https://painatalman.github.io/frasesdorante&text=' + quoteOrDialogAsTweet;
}

function changeQuoteWithTransition() {
  changeQuote()
  showQuote()

  quoteElement.removeEventListener('animationend', changeQuoteWithTransition)
}

/*
 * set an initial quote
 */
function setInitialQuote() {
  hideQuote()
  changeQuote()
  showQuote()
}

window.quotebutton.onclick = function startChangeQuote() {
  teleportSound.play()
  quoteElement.addEventListener(
    'animationend',
    changeQuoteWithTransition
  )
  hideQuote()
}

setInitialQuote()
