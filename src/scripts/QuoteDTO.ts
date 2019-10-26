import IQuote from "./interfaces/QuoteDTO";

export default class Quote implements IQuote {
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

  equals(quote:IQuote) {
    return quote.getId() === this._id
  }
}