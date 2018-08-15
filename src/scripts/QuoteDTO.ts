import QuoteDTOInterface from "./interfaces/QuoteDTO";

export default class QuoteDTO implements QuoteDTOInterface {
  private _text:string
  private _id:string

  constructor({ text, id }: { text:string, id:string }) {
    this._text = text
    this._id = id
  }

  getContent() {
    return this._text
  }

  getId() {
    return this._id
  }

  equals(quote:QuoteDTOInterface) {
    return quote.getId() === this._id
  }
}