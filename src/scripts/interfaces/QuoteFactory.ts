import QuoteDTO from './QuoteDTO'
import QuoteDataParsed from '../types/QuoteDataParsed'

export default interface QuoteFactory {
  createQuote: (data:QuoteDataParsed) => QuoteDTO
}

