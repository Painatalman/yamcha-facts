import QuoteData from "../types/QuoteData";

export default interface QuoteDataValidator {
  validate: (data:QuoteData[]) => void
}
