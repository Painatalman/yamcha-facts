import QuoteController from '../QuoteController';
import MockQuoteDAO from '../mocks/MockQuoteDAO';
import MockQuoteFactory from '../mocks/MockQuoteFactory';
import MockQuoteRenderer from '../mocks/MockQuoteRenderer';
import QuoteDTO from '../QuoteDTO';

describe('Quote Controller', () => {
  describe('initialization', () => {
    it('should be initialized properly with default parameters', () => {
      const dao = new MockQuoteDAO();
      const factory = new MockQuoteFactory();
      const renderer = new MockQuoteRenderer();

      const controller = new QuoteController({ dao, factory, renderer });

      dao.fetchRandomQuoteData = jest.fn(() =>
        Promise.resolve({
          text: 'a',
          isNerdy: false,
          id: '1'
        })
      );
      dao.fetchRandomNonNerdyQuoteData = jest.fn(() =>
        Promise.resolve({
          text: 'a',
          isNerdy: false,
          id: '1'
        })
      );

      controller.update();

      expect(dao.fetchRandomQuoteData).toHaveBeenCalledTimes(1);
      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledTimes(0);
    });
    it('should be initializable with option to not show nerdy quotes', async () => {
      const dao = new MockQuoteDAO();
      const factory = new MockQuoteFactory();
      const renderer = new MockQuoteRenderer();

      dao.fetchRandomQuoteData = jest.fn(() =>
        Promise.resolve({
          text: 'a',
          isNerdy: false,
          id: '1'
        })
      );
      dao.fetchRandomNonNerdyQuoteData = jest.fn(() =>
        Promise.resolve({
          text: 'a',
          isNerdy: false,
          id: '1'
        })
      );

      const controller = new QuoteController({
        dao,
        factory,
        renderer,
        settings: {
          nonNerdyOnly: true
        }
      });

      await controller.update();

      expect(dao.fetchRandomQuoteData).toHaveBeenCalledTimes(0);
      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledTimes(1);
    });
  });
  describe('update', () => {
    it('should order creation of a default quote and update its last id', async () => {
      const dao = new MockQuoteDAO();
      const factory = new MockQuoteFactory();
      const renderer = new MockQuoteRenderer();

      const originalRender = renderer.render.bind(renderer);
      const quoteData = {
        id: '3',
        text: 'Something',
        isNerdy: false
      };

      dao.fetchRandomQuoteData = jest.fn(() => Promise.resolve(quoteData));
      factory.createQuote = jest.fn(() => new QuoteDTO(quoteData));
      renderer.render = jest.fn(originalRender);

      const controller = new QuoteController({ dao, factory, renderer });
      await controller.update();

      expect(dao.fetchRandomQuoteData).toHaveBeenCalledWith(undefined);
      expect(dao.fetchRandomQuoteData).toHaveBeenCalledTimes(1);
      expect(factory.createQuote).toHaveBeenCalledTimes(1);
      expect(renderer.render).toHaveBeenCalledTimes(1);

      await controller.update();

      expect(dao.fetchRandomQuoteData).toHaveBeenCalledWith('3');
      expect(dao.fetchRandomQuoteData).toHaveBeenCalledTimes(2);
      expect(factory.createQuote).toHaveBeenCalledTimes(2);
      expect(renderer.render).toHaveBeenCalledTimes(2);
    });
    it('should order creation of a non-nerdy default quote', async () => {
      const dao = new MockQuoteDAO();
      const factory = new MockQuoteFactory();
      const renderer = new MockQuoteRenderer();

      const originalRender = renderer.render.bind(renderer);
      const quoteData = {
        id: '3',
        text: 'Something',
        isNerdy: false
      };

      dao.fetchRandomNonNerdyQuoteData = jest.fn(() =>
        Promise.resolve(quoteData)
      );
      factory.createQuote = jest.fn(() => new QuoteDTO(quoteData));
      renderer.render = jest.fn(originalRender);

      const controller = new QuoteController({
        dao,
        factory,
        renderer,
        settings: {
          nonNerdyOnly: true
        }
      });
      await controller.update();

      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledWith(undefined);
      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledTimes(1);
      expect(factory.createQuote).toHaveBeenCalledTimes(1);
      expect(renderer.render).toHaveBeenCalledTimes(1);

      await controller.update();

      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledWith('3');
      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledTimes(2);
      expect(factory.createQuote).toHaveBeenCalledTimes(2);
      expect(renderer.render).toHaveBeenCalledTimes(2);
    });
  });
  describe('toggleNonNerdyOnly', () => {
    it('should properly set option to only show non-nerdy quotes', () => {
      const dao = new MockQuoteDAO();
      const factory = new MockQuoteFactory();
      const renderer = new MockQuoteRenderer();

      dao.fetchRandomQuoteData = jest.fn(() =>
        Promise.resolve({
          text: 'a',
          isNerdy: false,
          id: '1'
        })
      );
      dao.fetchRandomNonNerdyQuoteData = jest.fn(() =>
        Promise.resolve({
          text: 'a',
          isNerdy: false,
          id: '1'
        })
      );

      const controller = new QuoteController({ dao, factory, renderer });

      // toggling the quote automatically calls "update"
      controller.toggleNonNerdyOnly(true);
      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledTimes(1);
      expect(dao.fetchRandomQuoteData).toHaveBeenCalledTimes(0);
      controller.toggleNonNerdyOnly(false);
      expect(dao.fetchRandomNonNerdyQuoteData).toHaveBeenCalledTimes(1);
      expect(dao.fetchRandomQuoteData).toHaveBeenCalledTimes(1);
    });

    it('should update when nonNerdyOnly value changes', async () => {
      const dao = new MockQuoteDAO();
      const factory = new MockQuoteFactory();
      const renderer = new MockQuoteRenderer();
      const controller = new QuoteController({ dao, factory, renderer });
      const originalUpdate = controller.update.bind(controller);
      controller.update = jest.fn(originalUpdate);

      await controller.toggleNonNerdyOnly(false);
      expect(controller.update).toHaveBeenCalledTimes(0);
      await controller.toggleNonNerdyOnly(true);
      expect(controller.update).toHaveBeenCalledTimes(1);
      await controller.toggleNonNerdyOnly(true);
      expect(controller.update).toHaveBeenCalledTimes(1);
      await controller.toggleNonNerdyOnly(false);
      expect(controller.update).toHaveBeenCalledTimes(2);
    });
  });
});
