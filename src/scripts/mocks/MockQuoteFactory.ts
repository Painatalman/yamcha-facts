import QuoteFactory from '../interfaces/QuoteFactory'
import QuoteDTO from '../QuoteDTO'
import QuoteDataParsed from '../types/QuoteDataParsed'

export default class MockQuoteFactory implements QuoteFactory {
  createQuote(_data: QuoteDataParsed) {
    return new QuoteDTO({
      text: "this is a mock",
      id: "1"
    })
  }
}