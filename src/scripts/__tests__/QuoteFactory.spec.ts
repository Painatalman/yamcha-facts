import QuoteFactory from '../QuoteFactory'
import QuoteDTO from "../QuoteDTO"
import QuoteDataParsed from '../types/QuoteDataParsed'

describe('Quote Factory', () => {
  it(
    'should generate a quote from parsed data',
    async () => {
      const { createQuote } = new QuoteFactory()
      const data:QuoteDataParsed = {
        id: '2',
        text: 'Just Yamcha',
        isNerdy: false
      }

      expect(createQuote(data)).toEqual(new QuoteDTO(data))
    }
  )
})
