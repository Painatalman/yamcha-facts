import QuoteDTO from "../QuoteDTO";

describe('Quote', () => {
  it('should allow access to its content', () => {
    const quote = new QuoteDTO({
      text: 'Yamcha\'s Master balls always fail',
      id: '0'
    })

    expect(quote.getContent()).toEqual("Yamcha's Master balls always fail")
  })
  
  it('should allow access to its id', () => {
    const quote = new QuoteDTO({
      text: 'Yamcha\'s Master balls always fail',
      id: '2'
    })

    expect(quote.getId()).toEqual('2')
  })

  it('should be compared based on its id, not content', () => {
    const quote = new QuoteDTO({
      text: 'Yamcha\'s Master balls always fail',
      id: '1'
    })
    const sameContentQuote = new QuoteDTO({
      text: 'Yamcha\'s Master balls always fail',
      id: '2'
    })
    const diffContentQuote = new QuoteDTO({
      text: 'A man once said: \'If you ain\'t first, you\'re Yamcha!\'',
      id: '1'
    })

    expect(quote.equals(sameContentQuote)).toBe(false)
    expect(quote.equals(diffContentQuote)).toBe(true)
  })
})



