import id from "./id"

type QuoteDataParsedMinusId = {
  text: string,
  isNerdy: boolean,
  id: id | undefined
}

export default QuoteDataParsedMinusId
