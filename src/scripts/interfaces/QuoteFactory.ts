import QuoteDTO from './QuoteDTO';
import QuoteDataParsed from '../types/QuoteDataParsed';

/**
 * Creates a QuoteDTO from quote data
 * It does NOT parse it, it instead creates an object with methods to get data
 */
export default interface QuoteFactory {
  createQuote: (data: QuoteDataParsed) => QuoteDTO;
}
