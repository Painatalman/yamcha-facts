import QuoteDataParsed from '../types/QuoteDataParsed'
import id from '../types/id'

// connects with a remote data source and returns parsed data
export default interface QuoteDataProviderInterface {
  fetchRandomQuoteData: (excludedId?:id) => Promise<QuoteDataParsed>
  fetchRandomNonNerdyQuoteData: (excludedId?:id) => Promise<QuoteDataParsed>
}
