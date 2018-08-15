import QuoteFactory from '../QuoteFactory'
import QuoteDTO from "../interfaces/QuoteDTO"
import QuoteDataParsed from '../types/QuoteDataParsed'

class MockQuoteDTO implements QuoteDTO {
  getContent(): string {
    return 'mock'
  }

  getId() {
    return '_mock'
  }

  equals() {
    return false
  }
}

describe('Quote Factory', () => {
  it(
    'should generate a quote from parsed data',
    async () => {
      const { createQuote } = new QuoteFactory()
      const data:QuoteDataParsed = {
        id: '_mock',
        text: 'mock',
        isNerdy: false
      }

      expect(createQuote(data)).toEqual(new MockQuoteDTO())
    }
  )
})
