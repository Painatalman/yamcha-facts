import QuoteFactory from './interfaces/QuoteFactory'
import QuoteDAO from './interfaces/QuoteDAO'
import QuoteRenderer from './interfaces/QuoteRenderer'
import id from './types/id'
import QuoteDataParsed from './types/QuoteDataParsed'
import QuoteDTO from './interfaces/QuoteDTO'
import QuoteControllerSettings from './types/QuoteControllerSettings'
import SoundPlayer from './interfaces/SoundPlayer'


class QuoteController {
  private _dao: QuoteDAO
  private _factory: QuoteFactory
  private _renderer: QuoteRenderer
  private _soundPlayer: SoundPlayer|undefined
  private _lastQuoteId: id|undefined
  private _settings: QuoteControllerSettings

  constructor({
    dao, factory, renderer, settings, soundPlayer
  }: {
    dao: QuoteDAO;
    factory: QuoteFactory;
    renderer: QuoteRenderer;
    soundPlayer?: SoundPlayer;
    settings?: Record<string, any>;
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

  private async _getRandomQuote() {
    const quoteData = await this._dao.fetchRandomQuoteData(
      this._lastQuoteId
    )

    return this._createQuoteAndSetLastId(quoteData)
  }

  private async _getRandomNonNerdyQuote() {
    const quoteData = await this._dao.fetchRandomNonNerdyQuoteData(
      this._lastQuoteId
    )

    return this._createQuoteAndSetLastId(quoteData)
  }

  private async _renderQuote(quote: QuoteDTO) {
    await this._renderer.render(quote)
  }

  private _playSoundIfApplicable() {
    const {_soundPlayer, _settings } = this

    if (_soundPlayer && _settings.playSound) {
      _soundPlayer.play()  
    }
  }

  public async update() {
    const nonNerdyOnly = this._settings.nonNerdyOnly

    const quote = nonNerdyOnly ?
      await this._getRandomNonNerdyQuote()
      : await this._getRandomQuote()
    this._playSoundIfApplicable()
    await this._renderQuote(quote)

    return quote
  }

  public async toggleNonNerdyOnly(nonNerdyOnly: boolean) {
    if (nonNerdyOnly === this._settings.nonNerdyOnly) {
      return Promise.resolve()
    }

    this._settings.nonNerdyOnly = nonNerdyOnly
    return await this.update()
  }

  public toggleSound(shouldPlay: boolean) {
    this._settings.playSound = shouldPlay
  }
}

export default QuoteController 
