import QuoteDTO from './QuoteDTO'

export default interface QuoteController {
  update: () => Promise<QuoteDTO>,
  toggleNonNerdyOnly: () => Promise<QuoteDTO|undefined>,
  toggleSound: () => void
}