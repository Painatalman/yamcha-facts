import data from './data/data.json'
import QuoteFactory from './QuoteFactory'
import QuoteController from './QuoteController'
import JSONFileQuoteDAO from './JSONFileQuoteDAO'
import YamchaQuoteRenderer from './yamchaQuoteRenderer'
import QuoteDTO from './interfaces/QuoteDTO.js'
import validateCheckbox from './validators/validateCheckbox'
import validateElement from './validators/validateElement'
import validateAnchor from './validators/validateAnchor'
import TeleportSoundPlayer from './TeleportSoundPlayer'

const SELECTORS = {
  QUOTE_EL_ID: 'quote',
  QUOTE_CHANGE_TRIGGER_ID: 'quotebutton',
  TWITTER_SHARE_ID: 'twitteranchor',
  NON_NERDY_CONTROL_ID: 'nonNerdyOnlyControl',
  SOUND_CONTROL_ID: 'soundControl'
}
const { TWITTER_SHARE_ID, QUOTE_EL_ID, QUOTE_CHANGE_TRIGGER_ID, NON_NERDY_CONTROL_ID } = SELECTORS

const quoteEl:HTMLElement = validateElement(
  document.getElementById(SELECTORS.QUOTE_EL_ID)
)
const quoteChanger:HTMLElement = validateElement(
  document.getElementById(SELECTORS.QUOTE_CHANGE_TRIGGER_ID)
)
const twitterShare:HTMLAnchorElement = validateAnchor(
  document.getElementById(SELECTORS.TWITTER_SHARE_ID)
)
const nonNerdyOnlyControl:HTMLInputElement = validateCheckbox(
  document.getElementById(SELECTORS.NON_NERDY_CONTROL_ID)
)
const soundControl:HTMLInputElement = validateCheckbox(
  document.getElementById(SELECTORS.SOUND_CONTROL_ID)
)

const quoteController = new QuoteController(
  {
    dao: new JSONFileQuoteDAO(data),
    factory: new QuoteFactory(),
    renderer: new YamchaQuoteRenderer(quoteEl),
    soundPlayer: new TeleportSoundPlayer()
  }
)

const updateTwitterLink = (quote:QuoteDTO) => {
  const text = quote.getContent()
  twitterShare.href = 'https:// twitter.com/intent/tweet?via=Mi_PiCo&hashtags=yamcha-facts&url=https://painatalman.github.io/yamcha-facts&text=' + text
}

/**
 * Gets a random quote and updates the block for quotes
 */
const changeQuote = () => {
  quoteController.update()
    .then(updateTwitterLink)
}

const toggleNonNerdy = () => {
  const nonNerdyOnly = !nonNerdyOnlyControl.checked
  quoteController.toggleNonNerdyOnly(nonNerdyOnly)
    .then(quoteOrNothing => quoteOrNothing && updateTwitterLink(quoteOrNothing))
}

const toggleSound = () => {
  const shouldPlaySound = !soundControl.checked
  quoteController.toggleSound(shouldPlaySound)
}

quoteChanger.addEventListener('click', changeQuote)
nonNerdyOnlyControl.addEventListener('change', toggleNonNerdy)
soundControl.addEventListener('change', toggleSound)

// set initial quote
changeQuote()
