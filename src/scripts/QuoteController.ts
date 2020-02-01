import QuoteFactory from './interfaces/QuoteFactory'
import QuoteDAO from './interfaces/QuoteDAO'
import QuoteRenderer from './interfaces/QuoteRenderer'
import id from './types/id'
import QuoteDataParsed from './types/QuoteDataParsed'
import QuoteDTO from './interfaces/QuoteDTO'
import QuoteControllerSettings from './types/QuoteControllerSettings'
import SoundPlayer from './interfaces/SoundPlayer'


class QuoteController {
  _dao: QuoteDAO
  _factory: QuoteFactory
  _renderer: QuoteRenderer
  _soundPlayer: SoundPlayer|undefined
  _lastQuoteId: id|undefined
  _settings: QuoteControllerSettings

  constructor({
    dao, factory, renderer, settings, soundPlayer
  }: {
    dao: QuoteDAO,
    factory: QuoteFactory,
    renderer: QuoteRenderer,
    soundPlayer?: SoundPlayer,
    settings?: Object
  }) {
    const defaultSettings = {
      nonNerdyOnly: false,
      playSound: false
    }

    this._dao = dao
    this._factory = factory
    this._renderer = renderer
    this._lastQuoteId = undefined
    this._soundPlayer = soundPlayer
    this._settings = {
      ...defaultSettings,
      ...(settings || {})
    }
  }

  _createQuoteAndSetLastId(quoteData: QuoteDataParsed) {
    const quote = this._factory.createQuote(quoteData)

    this._lastQuoteId = quote.getId()

    return quote 
  }

  async _getRandomQuote() {
    const quoteData = await this._dao.fetchRandomQuoteData(
      this._lastQuoteId
    )

    return this._createQuoteAndSetLastId(quoteData)
  }

  async _getRandomNonNerdyQuote() {
    const quoteData = await this._dao.fetchRandomNonNerdyQuoteData(
      this._lastQuoteId
    )

    return this._createQuoteAndSetLastId(quoteData)
  }

  async _renderQuote(quote:QuoteDTO) {
    await this._renderer.render(quote)
  }

  _playSoundIfApplicable() {
    const {_soundPlayer, _settings } = this

    if (_soundPlayer && _settings.playSound) {
      _soundPlayer.play()  
    }
  }

  async update() {
    const nonNerdyOnly = this._settings.nonNerdyOnly

    const quote = nonNerdyOnly ?
      await this._getRandomNonNerdyQuote()
      : await this._getRandomQuote()
    this._playSoundIfApplicable()
    await this._renderQuote(quote)

    return quote
  }

  async toggleNonNerdyOnly(nonNerdyOnly: boolean) {
    if (nonNerdyOnly === this._settings.nonNerdyOnly) {
      return Promise.resolve()
    }

    this._settings.nonNerdyOnly = nonNerdyOnly
    return await this.update()
  }

  toggleSound(shouldPlay: boolean) {
    this._settings.playSound = shouldPlay
  }
}

export default QuoteController 
