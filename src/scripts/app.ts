import data from './data/data.json'
import QuoteFactory from './QuoteFactory'
import QuoteController from './QuoteController'
import JSONFileQuoteDAO from './JSONFileQuoteDAO'
import YamchaQuoteRenderer from './yamchaQuoteRenderer'

const teleportSound:HTMLAudioElement = new Audio('https://www.myinstants.com/media/sounds/dbz-teleport.mp3')

const SELECTORS = {
  QUOTE_EL_ID: 'quote',
  QUOTE_CHANGE_TRIGGER_ID: 'quotebutton',
  TWITTER_SHARE_ID: 'twitteranchor'
}
const { TWITTER_SHARE_ID, QUOTE_EL_ID, QUOTE_CHANGE_TRIGGER_ID } = SELECTORS

const quoteEl:HTMLElement|null = document.getElementById(SELECTORS.QUOTE_EL_ID)
const quoteChanger:HTMLElement|null = document.getElementById(SELECTORS.QUOTE_CHANGE_TRIGGER_ID)
const twitterShare:HTMLElement|null = document.getElementById(SELECTORS.TWITTER_SHARE_ID)

if (!quoteEl) {
  throw new Error(`No element with id: ${QUOTE_EL_ID}`)
}
if (!(quoteChanger instanceof HTMLButtonElement)) {
  throw new Error(`No element with id: ${QUOTE_CHANGE_TRIGGER_ID}`)
}
if (!(twitterShare instanceof HTMLAnchorElement)) {
  throw new Error(`Element with id "${TWITTER_SHARE_ID}" must be an anchor`)
}

const quoteController = new QuoteController(
  {
    dao: new JSONFileQuoteDAO(data),
    factory: new QuoteFactory(),
    renderer: new YamchaQuoteRenderer(quoteEl)
  }
)

/**
 * Gets a random quote and updates the block for quotes
 */
const changeQuote = () => {
  teleportSound.play()
  quoteController.update()
    .then(quote => {
      const text = quote.getContent()
      twitterShare.href = 'https:// twitter.com/intent/tweet?via=Mi_PiCo&hashtags=yamcha-facts&url=https://painatalman.github.io/yamcha-facts&text=' + text
    })
}

quoteChanger.addEventListener('click', changeQuote)

// set initial quote
changeQuote()
