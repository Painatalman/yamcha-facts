import QuoteDataCollection from "../types/QuoteDataCollection"
import Validator from "../validators/QuoteDataCollectionValidator"

describe('Validate quote data', () => {
  it(
    'should not allow duplicate IDs',
    () => {
      const data: QuoteDataCollection = {
        quotes: [
          {
            "text": "Yamcha's Master balls always fail",
            "id": '2'
          },
          {
            "text": "Yamcha's Master balls never fail",
            "id": '2'
          }
        ],
        extras: {}
      }
      const validator = new Validator()

      expect(() => validator.validate(data)).toThrowError('Data has duplicate IDs')
    }
  )

  it(
    'should make sure any extra slot can be filled',
    () => {
      const data: QuoteDataCollection = {
        quotes: [
          "Yamcha lost against $enemy",
        ],
        extras: {}
      }
      const dataWithExtraButNoOptions: QuoteDataCollection = {
        quotes: [
          "Yamcha lost against $enemy",
        ],
        extras: {
          enemy: []
        }
      }
      const validator = new Validator()

      expect(() => validator.validate(data)).toThrowError('Unavailable extra')
      expect(
        () => validator.validate(dataWithExtraButNoOptions)
      ).toThrowError('Unavailable extra')
    }
  )
})
