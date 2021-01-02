import QuoteDTO from './QuoteDTO';

export default interface QuoteProvider {
  getRandomQuote: () => Promise<QuoteDTO>;
}
