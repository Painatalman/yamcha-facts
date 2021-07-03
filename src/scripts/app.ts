import data from './data/data.json';
import QuoteDTO from './interfaces/QuoteDTO.js';
import JSONFileQuoteDAO from './JSONFileQuoteDAO';
import QuoteController from './QuoteController';
import QuoteFactory from './QuoteFactory';
import TeleportSoundPlayer from './TeleportSoundPlayer';
import validateAnchor from './validators/validateAnchor';
import validateCheckbox from './validators/validateCheckbox';
import validateElement from './validators/validateElement';
import YamchaQuoteRenderer from './yamchaQuoteRenderer';

const SELECTORS = {
  QUOTE_EL_ID: 'quote',
  QUOTE_CHANGE_TRIGGER_ID: 'quotebutton',
  TWITTER_SHARE_ID: 'twitteranchor',
  NON_NERDY_CONTROL_ID: 'nonNerdyOnlyControl',
  SOUND_CONTROL_ID: 'soundControl'
};

const quoteEl: HTMLElement = validateElement(
  document.getElementById(SELECTORS.QUOTE_EL_ID)
);
const quoteChanger: HTMLElement = validateElement(
  document.getElementById(SELECTORS.QUOTE_CHANGE_TRIGGER_ID)
);
const twitterShare: HTMLAnchorElement = validateAnchor(
  document.getElementById(SELECTORS.TWITTER_SHARE_ID)
);
const nonNerdyOnlyControl: HTMLInputElement = validateCheckbox(
  document.getElementById(SELECTORS.NON_NERDY_CONTROL_ID)
);
const soundControl: HTMLInputElement = validateCheckbox(
  document.getElementById(SELECTORS.SOUND_CONTROL_ID)
);

const quoteController = new QuoteController({
  dao: new JSONFileQuoteDAO(data),
  factory: new QuoteFactory(),
  renderer: new YamchaQuoteRenderer(quoteEl),
  soundPlayer: new TeleportSoundPlayer()
});

const updateTwitterLink = (quote: QuoteDTO) => {
  const text = quote.getContent();
  twitterShare.href = `https:// twitter.com/intent/tweet?via=Mi_PiCo&hashtags=yamcha-facts&url=https://painatalman.github.io/yamcha-facts&text=${text}`;
};

/**
 * Gets a random quote and updates the block for quotes
 *
 * @returns {void}
 */
const changeQuote = (): void => {
  quoteController.update().then(updateTwitterLink);
};

const toggleNonNerdy = () => {
  const nonNerdyOnly = !nonNerdyOnlyControl.checked;
  quoteController
    .toggleNonNerdyOnly(nonNerdyOnly)
    .then(
      (quoteOrNothing) => quoteOrNothing && updateTwitterLink(quoteOrNothing)
    );
};

const toggleSound = () => {
  const shouldPlaySound = soundControl.checked;
  quoteController.toggleSound(shouldPlaySound);
};

quoteChanger.addEventListener('click', changeQuote);
nonNerdyOnlyControl.addEventListener('change', toggleNonNerdy);
soundControl.addEventListener('change', toggleSound);

// set initial quote
changeQuote();
