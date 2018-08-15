import QuoteDTO from "./QuoteDTO"

export default interface QuoteRenderer {
  render: (quote:QuoteDTO) => Promise<void>
}
