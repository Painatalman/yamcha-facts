import QuoteController from '../QuoteController';
import MockQuoteDAO from '../mocks/MockQuoteDAO';
import MockQuoteFactory from '../mocks/MockQuoteFactory';
import QuoteFactory from '../QuoteFactory';
import QuoteDTO from '../QuoteDTO';
import RandomQuoteProvider from '../RandomQuoteProvider';
import QuoteDataParsed from '../types/QuoteDataParsed';

describe('Quote Provider', (): void => {
  describe('initialization', (): void => {
    it('should not throw errors when initialized', (): void => {
      try {
        const dao = new MockQuoteDAO();
        const factory = new MockQuoteFactory();

        new RandomQuoteProvider({ dao, factory });
      } catch (e) {
        throw new Error(`NotInitialized: ${e.message}`);
      }
    });
  });
  describe('get random quote', (): void => {
    it('should provide a random quote', async (): Promise<void> => {
      const dao = new MockQuoteDAO();
      const factory = new MockQuoteFactory();

      const quoteData = {
        id: '3',
        text: 'Something',
        isNerdy: false
      };

      dao.fetchRandomQuoteData = jest.fn(
        (): Promise<QuoteDataParsed> => Promise.resolve(quoteData)
      );
      factory.createQuote = jest.fn((): QuoteDTO => new QuoteDTO(quoteData));

      const provider = new RandomQuoteProvider({ dao, factory });
      const quote = await provider.getRandomQuote();

      expect(dao.fetchRandomQuoteData).toHaveBeenCalledWith(undefined);
      expect(dao.fetchRandomQuoteData).toHaveBeenCalledTimes(1);
      expect(factory.createQuote).toHaveBeenCalledTimes(1);
      expect(quote).toEqual(
        new QuoteDTO({
          id: '3',
          text: 'Something'
        })
      );
    });
    it('should not provide the same quote in a row', async (): Promise<void> => {
      const dao = new MockQuoteDAO();
      const factory = new QuoteFactory();

      const quoteData = {
        id: '3',
        text: 'Something',
        isNerdy: false
      };

      dao.fetchRandomQuoteData = jest.fn(
        (): Promise<QuoteDataParsed> => Promise.resolve(quoteData)
      );
      factory.createQuote = jest.fn(factory.createQuote);

      const provider = new RandomQuoteProvider({ dao, factory });
      let quote = await provider.getRandomQuote();

      expect(dao.fetchRandomQuoteData).toHaveBeenCalledWith(undefined);
      expect(dao.fetchRandomQuoteData).toHaveBeenCalledTimes(1);
      expect(factory.createQuote).toHaveBeenCalledTimes(1);
      expect(quote).toEqual(
        new QuoteDTO({
          id: '3',
          text: 'Something'
        })
      );

      quote = await provider.getRandomQuote();

      expect(dao.fetchRandomQuoteData).toHaveBeenCalledWith('3');
      expect(dao.fetchRandomQuoteData).toHaveBeenCalledTimes(2);
      expect(factory.createQuote).toHaveBeenCalledTimes(2);
    });
  });
  describe('get random non-nerdy quote', (): void => {
    it('should provide a random non-nerdy quote', async (): Promise<void> => {
      const dao = new MockQuoteDAO();
      const factory = new MockQuoteFactory();

      const quoteData = {
        id: '3',
        text: 'Something',
        isNerdy: false
      };

      dao.fetchRandomNonNerdyQuoteData = jest.fn(
        (): Promise<QuoteDataParsed> => Promise.resolve(quoteData)
      );
      factory.createQuote = jest.fn((): QuoteDTO => new QuoteDTO(quoteData));

      const provider = new RandomQuoteProvider({ dao, factory });
      const quote = await provider.getRandomNonNerdyQuote();

      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledWith(undefined);
      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledTimes(1);
      expect(factory.createQuote).toHaveBeenCalledTimes(1);
      expect(quote).toEqual(
        new QuoteDTO({
          id: '3',
          text: 'Something'
        })
      );
    });
    it('should not provide the same quote in a row', async (): Promise<void> => {
      const dao = new MockQuoteDAO();
      const factory = new MockQuoteFactory();

      const quoteData = {
        id: '3',
        text: 'Something',
        isNerdy: false
      };

      dao.fetchRandomNonNerdyQuoteData = jest.fn(
        (): Promise<QuoteDataParsed> => Promise.resolve(quoteData)
      );
      factory.createQuote = jest.fn((): QuoteDTO => new QuoteDTO(quoteData));

      const provider = new RandomQuoteProvider({ dao, factory });
      let quote = await provider.getRandomNonNerdyQuote();

      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledWith(undefined);
      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledTimes(1);
      expect(factory.createQuote).toHaveBeenCalledTimes(1);
      expect(quote).toEqual(
        new QuoteDTO({
          id: '3',
          text: 'Something'
        })
      );

      quote = await provider.getRandomNonNerdyQuote();

      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledWith('3');
      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledTimes(2);
      expect(factory.createQuote).toHaveBeenCalledTimes(2);
    });
  });
});
