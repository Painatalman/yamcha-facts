import id from "./id"

type QuoteData = string | {
  text: string,
  isNerdy?: boolean,
  id?: id
}

export default QuoteData
