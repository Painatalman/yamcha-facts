import QuoteFactoryInterface from './interfaces/QuoteFactory'
import QuoteDTOInterface from './interfaces/QuoteDTO'
import QuoteDTO from './QuoteDTO'
import QuoteDataParsed from './types/QuoteDataParsed'

export default class QuoteFactory implements QuoteFactoryInterface {
  createQuote(data:QuoteDataParsed) {
    return new QuoteDTO(data)
  }
}
