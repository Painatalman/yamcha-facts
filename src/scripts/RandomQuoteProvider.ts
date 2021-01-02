import QuoteDAO from './interfaces/QuoteDAO';
import QuoteFactory from './interfaces/QuoteFactory';
import QuoteProvider from './interfaces/QuoteProvider';
import QuoteDTO from './interfaces/QuoteDTO';
import QuoteDataParsed from './types/QuoteDataParsed';

/**
 * Get random quotes, never duplicated as long as there's at least two quotes
 */
export default class RandomQuoteProvider implements QuoteProvider {
  private _dao: QuoteDAO;
  private _factory: QuoteFactory;
  private _lastId?: string;

  public constructor({
    dao,
    factory
  }: {
    dao: QuoteDAO;
    factory: QuoteFactory;
  }) {
    this._dao = dao;
    this._factory = factory;
    this._lastId = undefined;
  }

  public async getRandomQuote(): Promise<QuoteDTO> {
    const quoteData = await this._dao.fetchRandomQuoteData(this._lastId);
    return this._updateQuote(quoteData);
  }

  public async getRandomNonNerdyQuote(): Promise<QuoteDTO> {
    const quoteData = await this._dao.fetchRandomNonNerdyQuoteData(
      this._lastId
    );
    return this._updateQuote(quoteData);
  }

  private _updateQuote(data: QuoteDataParsed): QuoteDTO {
    this._lastId = data.id;

    return this._factory.createQuote(data);
  }
}
