export default interface QuoteDTO {
  getId: () => string
  getContent: () => string
  equals: (quote:QuoteDTO) => boolean
}