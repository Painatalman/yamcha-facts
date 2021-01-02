import YamchaQuoteRenderer from '../yamchaQuoteRenderer';
import QuoteDTO from '../QuoteDTO';

function mockMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  });
}

describe('Yamcha Quote Renderer', () => {
  describe('render', () => {
    beforeAll(() => {
      mockMatchMedia();
    });
    it("should update its target element based on a quote's content", async () => {
      document.body.innerHTML = `
        <div id="quote">
          Not what you expect
        </div>
      `;

      const el = document.getElementById('quote');

      if (!el) {
        throw new Error('Configuration error: element with id quote not found');
      }

      const renderer = new YamchaQuoteRenderer(el);
      const quote = new QuoteDTO({
        text: 'What you expect',
        id: '3'
      });

      await renderer.render(quote);

      expect(el.textContent).toEqual('What you expect');
    });
  });
});
