import QuoteFactoryInterface from './interfaces/QuoteFactory';
import QuoteDTO from './QuoteDTO';
import QuoteDataParsed from './types/QuoteDataParsed';

/**
 * Parses data into a properly formatted quote
 */
export default class QuoteFactory implements QuoteFactoryInterface {
  public createQuote(data: QuoteDataParsed): QuoteDTO {
    return new QuoteDTO(data);
  }
}
