import YamchaQuoteRenderer from '../yamchaQuoteRenderer'
import QuoteDTO from '../QuoteDTO'

describe('Yamcha Quote Renderer', () => {
  describe('render', () => {
    it('should update its target element based on a quote\'s content', async () => {
      document.body.innerHTML = `
        <div id="quote">
          Not what you expect
        </div>
      `

      const el = document.getElementById('quote')

      if (!el) {
        throw new Error('Configuration error: element with id quote not found')
      }

      const renderer = new YamchaQuoteRenderer(el)
      const quote = new QuoteDTO({
        text: 'What you expect',
        id: '3'
      })

      // mock hide and show: they make no sense in a headless environment
      renderer._hideQuote = jest.fn(() => Promise.resolve())
      renderer._showQuote = jest.fn(() => Promise.resolve())

      await renderer.render(quote)

      expect(el.textContent).toEqual('What you expect')
    })
  })
})
