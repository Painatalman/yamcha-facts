import QuoteDTO from '../interfaces/QuoteDTO'
import QuoteRenderer from '../interfaces/QuoteRenderer'

export default class MockQuoteRenderer implements QuoteRenderer {
  async render(_quote: QuoteDTO) {
    return Promise.resolve()
  }
}
