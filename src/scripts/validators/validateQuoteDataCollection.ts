import id from '../types/id'
import QuoteDataParsed from '../types/QuoteDataParsed'
import QuoteDataParsedCollection from '../types/QuoteDataParsedCollection'
import QuoteDataExtra from '../types/QuoteDataExtra'
import getExtrasFromQuoteText from '../utils/getExtrasFromQuoteText'
import copyWithoutDuplicates from '../utils/copyWithoutDuplicates'

export default function validateQuoteDataParsedCollection(data:QuoteDataParsedCollection) {
  function _checkForDuplicateIds(data:QuoteDataParsedCollection) {
    const usedIds:id[] = []

    data.quotes.forEach(
      ({ id }:QuoteDataParsed) => {
        if (usedIds.includes(id) ) {
          throw new Error(
            `InvalidDataDuplicateID: ${id}.\nPlease check your data file for duplicate data`
          )
        } 
        usedIds.push(id)
      }
    )
  }
  function _checkForEmptyExtras(extraData:QuoteDataExtra) {
    for(const extraName of Object.keys(extraData)) {
      if (extraData[extraName].length === 0) {
        throw new Error(`InvalidDataEmptyExtra: ${extraName}`)
      }
    }
  }
  function _checkForNonExistingExtras({quotes, extras}: QuoteDataParsedCollection) {
    const requiredExtras:string[] = quotes.reduce(
      (extras:string[], { text }: QuoteDataParsed):string[] => {
        return copyWithoutDuplicates(
          [
            ...extras,
            ...getExtrasFromQuoteText(text)  
          ]
        )
      },
      []
    )

    requiredExtras.forEach(extra => {
      // SHAME: truth be told, the second check is redundant if we're requiring extras to have content
      if (!extras[extra] || extras[extra].length < 1) {
        throw new Error(`InvalidDataMissingExtra: ${extra}`)
      }
    })
  }

  _checkForDuplicateIds(data)
  _checkForEmptyExtras(data.extras)
  _checkForNonExistingExtras(data)
}
