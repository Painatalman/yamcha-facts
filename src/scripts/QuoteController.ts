import QuoteFactory from './interfaces/QuoteFactory'
import QuoteDAO from './interfaces/QuoteDAO'
import QuoteRenderer from './interfaces/QuoteRenderer'
import id from './types/id'
import QuoteDataParsed from './types/QuoteDataParsed'
import QuoteDTO from './interfaces/QuoteDTO'
import QuoteControllerSettings from './types/QuoteControllerSettings'


class QuoteController {
  _dao: QuoteDAO
  _factory: QuoteFactory
  _renderer: QuoteRenderer
  _lastQuoteId: id|undefined
  _settings: QuoteControllerSettings

  constructor({
    dao, factory, renderer
  }: {
    dao: QuoteDAO,
    factory: QuoteFactory,
    renderer: QuoteRenderer
  }) {
    this._dao = dao
    this._factory = factory
    this._renderer = renderer
    this._lastQuoteId = undefined
    this._settings = {
      nonNerdyOnly: false
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

  async update() {
    const nonNerdyOnly = this._settings.nonNerdyOnly

    const quote = nonNerdyOnly ?
      await this._getRandomNonNerdyQuote()
      : await this._getRandomQuote()
    
    await this._renderQuote(quote)

    return quote
  }
}

export default QuoteController 
