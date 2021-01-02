import QuoteFactory from '../QuoteFactory';

describe('Quote', () => {
  it('should allow access to its content', () => {
    const factory = new QuoteFactory();
    const quote = factory.createQuote({
      text: "Yamcha's Master balls always fail",
      id: '0',
      isNerdy: false
    });

    expect(quote.getContent()).toEqual("Yamcha's Master balls always fail");
  });

  it('should allow access to its id', () => {
    const factory = new QuoteFactory();
    const quote = factory.createQuote({
      text: "Yamcha's Master balls always fail",
      id: '2',
      isNerdy: true
    });

    expect(quote.getId()).toEqual('2');
  });

  it('should be compared based on its id, not content', () => {
    const factory = new QuoteFactory();
    const quote = factory.createQuote({
      text: "Yamcha's Master balls always fail",
      id: '1',
      isNerdy: true
    });
    const sameContentQuote = factory.createQuote({
      text: "Yamcha's Master balls always fail",
      id: '2',
      isNerdy: false
    });
    const diffContentQuote = factory.createQuote({
      text: "A man once said: 'If you ain't first, you're Yamcha!'",
      id: '1',
      isNerdy: true
    });

    expect(quote.equals(sameContentQuote)).toBe(false);
    expect(quote.equals(diffContentQuote)).toBe(true);
  });
});
