import QuoteDataParsedCollection from "../types/QuoteDataParsedCollection"
import validateQuoteDataCollection from "../validators/validateQuoteDataCollection"

describe('Validate quote data', () => {
  it(
    'should not throw when data is valid',
    () => {
      const data: QuoteDataParsedCollection = {
        quotes: [
          {
            text: "Example with $someextra",
            id: '1',
            isNerdy: true
          },
          {
            text: "Yamcha's Master balls never fail",
            id: '2',
            isNerdy: false
          }
        ],
        extras: {
          someextra: ['option']
        }
      }

      validateQuoteDataCollection(data)
    }
  )

  it(
    'should not allow duplicate IDs',
    () => {
      const data: QuoteDataParsedCollection = {
        quotes: [
          {
            text: "Yamcha's Master balls always fail",
            id: '2',
            isNerdy: true
          },
          {
            text: "Yamcha's Master balls never fail",
            id: '2',
            isNerdy: false
          }
        ],
        extras: {}
      }

      expect(
        () => validateQuoteDataCollection(data)
      ).toThrowError(
        `InvalidDataDuplicateID: 2.\nPlease check your data file for duplicate data`
      )
    }
  )

  it(
    'should not allow empty extra properties',
    () => {
      const data: QuoteDataParsedCollection = {
        quotes: [
          {
            text: "Yamcha's Master balls always fail",
            id: '2',
            isNerdy: true
          },
          {
            text: "Yamcha's Master balls never fail",
            id: '3',
            isNerdy: false
          }
        ],
        extras: {
          example: []
        }
      }

      expect(
        () => validateQuoteDataCollection(data)
      ).toThrowError('InvalidDataEmptyExtra: example')
    }
  )

  it(
    'should not allow data with quotes with no values available for its extras',
    () => {
      const data: QuoteDataParsedCollection = {
        quotes: [
          {
            text: 'Yamcha lost against $enemy',
            isNerdy: false,
            id: '1'
          }  
        ],
        extras: {}
      }

      expect(
        () => validateQuoteDataCollection(data)
      ).toThrowError('InvalidDataMissingExtra: enemy')
    }
  )
})
