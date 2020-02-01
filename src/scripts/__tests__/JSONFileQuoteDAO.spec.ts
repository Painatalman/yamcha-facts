import QuoteDataCollection from "../types/QuoteDataCollection"
import JSONFileQuoteDAO from "../JSONFileQuoteDAO"
import * as getRandomInt from '../utils/getRandomInt'

// TODO: create a test to check if data is being validated or not on initialization

describe('Raw quote provider', () => {
  it('should provide the same quotes and extras as those in the source', () => {
    const data: QuoteDataCollection = {
      "quotes": [
        {
          "text": "A dinosaur can't teach Yamcha how to ride a ball",
          "isNerdy": true
        },
        "Someone shared a picture of Yamcha on $socialnetwork. Yamcha's account was deleted",
        "Yamcha can die from \"just a flesh wound\"",
        {
          "text": "Yamcha's Master balls always fail",
          "id": "2"
        }
      ],
      "extras": {
        "unpopular": [
          "Internet Explorer",
          "EA"
        ],
        "socialnetwork": [
          "Facebook"
        ]
      }
    }

    const provider = new JSONFileQuoteDAO(data)

    expect(provider._quoteDataList).toEqual(
      [
        {
          "text": "A dinosaur can't teach Yamcha how to ride a ball",
          "isNerdy": true,
          "id": "0"
        },
        {
          "text": "Someone shared a picture of Yamcha on $socialnetwork. Yamcha's account was deleted",
          "isNerdy": false,
          "id": "1"
        },
        {
          "text": "Yamcha can die from \"just a flesh wound\"",
          "id": "3",
          "isNerdy": false
        },
        {
          "text": "Yamcha's Master balls always fail",
          "id": "2",
          "isNerdy": false
        }
      ]
    )
    expect(Object.keys(data.extras)).toEqual(['unpopular', 'socialnetwork'])
  })

  describe('fetch random quote data', () => {
    it(
      'should always provide the same quote, if there is only one',
      async () => {
        const data: QuoteDataCollection = {
          "quotes": [
            "Yamcha lost"
          ],
          "extras": {}
        }
        const provider = new JSONFileQuoteDAO(data)
        const quote = await provider.fetchRandomQuoteData()

        expect(quote).toEqual({
          text: "Yamcha lost",
          id: '0',
          isNerdy: false
        })

        const anotherQuote = await provider.fetchRandomQuoteData()

        expect(anotherQuote).toEqual({
          text: "Yamcha lost",
          id: '0',
          isNerdy: false
        })
      }
    )

    it(
      'should be able to fetch a simple quote',
      async () => {
        const data: QuoteDataCollection = {
          "quotes": [
            "Yamcha lost",
            {
              text: "Yamcha won"
            },
            {
              text: "Yamcha did it again",
              isNerdy: false
            },
            {
              text: "Yamcha did it yet again",
              isNerdy: true
            }
          ],
          "extras": {}
        }
        jest.spyOn(getRandomInt, 'default').mockImplementationOnce(
          () => 0
        )

        const provider = new JSONFileQuoteDAO(data)
        const quote = await provider.fetchRandomQuoteData()

        expect(quote).toEqual({
          text: "Yamcha lost",
          id: '0',
          isNerdy: false
        })
      }
    )

    it(
      'should be able to fetch a quote from a data item with text',
      async () => {
        jest.spyOn(getRandomInt, 'default').mockImplementationOnce(
          () => 1
        )

        const data: QuoteDataCollection = {
          "quotes": [
            "Yamcha lost",
            {
              text: "Yamcha won"
            },
            {
              text: "Yamcha did it again",
              isNerdy: false
            },
            {
              text: "Yamcha did it yet again",
              isNerdy: true
            }
          ],
          "extras": {}
        }
        const provider = new JSONFileQuoteDAO(data)
        const quote = await provider.fetchRandomQuoteData()
        
        expect(quote).toEqual({
          text: "Yamcha won",
          id: '1',
          isNerdy: false
        })
      }
    )

    it(
      'should be able to fetch a nerdy quote',
      async () => {
        jest.spyOn(getRandomInt, 'default').mockImplementationOnce(
          () => 3
        )

        const data: QuoteDataCollection = {
          "quotes": [
            "Yamcha lost",
            {
              text: "Yamcha won"
            },
            {
              text: "Yamcha did it again",
              isNerdy: false
            },
            {
              text: "Yamcha did it yet again",
              isNerdy: true
            }
          ],
          "extras": {}
        }
        const provider = new JSONFileQuoteDAO(data)
        const quote = await provider.fetchRandomQuoteData()

        expect(quote).toEqual({
          text: "Yamcha did it yet again",
          id: '3',
          isNerdy: true
        })
      }
    )

    it(
      'should provide a quote with extras applied, without changing data',
      async () => {
        const data: QuoteDataCollection = {
          "quotes": [
            "Yamcha lost a popularity contest against $unpopular"
          ],
          "extras": {
            "unpopular": [
              "Internet Explorer"
            ]
          }
        }
        const provider = new JSONFileQuoteDAO(data)
        const quote = await provider.fetchRandomQuoteData()

        expect(quote).toEqual({
          text: "Yamcha lost a popularity contest against Internet Explorer",
          id: '0',
          isNerdy: false
        })

        expect(provider._quoteDataList).toEqual(
          [
            {
              text: "Yamcha lost a popularity contest against $unpopular",
              isNerdy: false,
              id: '0'
            }
          ]
        )
        expect(provider._extras).toEqual(
          {
            "unpopular": [
              "Internet Explorer"
            ]
          }
        )
      }
    )

    it(
      'should exclude a quote with a specific id',
      async () => {
        const data: QuoteDataCollection = {
          "quotes": [{
            text: "Yamcha did it yet again",
            id: '1',
            isNerdy: false
          },
            {
              text: "Yamcha did it yet again",
              id: '3',
              isNerdy: true
            },
            {
              text: "Yamcha did it yet again",
              id: '2',
              isNerdy: true
            }],
          "extras": {}
        }

        const provider = new JSONFileQuoteDAO(data)

        jest.spyOn(getRandomInt, 'default').mockImplementationOnce(
          () => 1
        )
         const quote = await provider.fetchRandomQuoteData("3")
         expect(quote).toEqual({
           text: "Yamcha did it yet again",
           id: '2',
           isNerdy: true
         })  
      }
    )

    it(
      'should throw when no quote is available',
      async () => {
        let data: QuoteDataCollection
        let provider:JSONFileQuoteDAO
        
        data = {
          "quotes": [],
          "extras": {}
        }
        provider = new JSONFileQuoteDAO(data)

        try {
          await provider.fetchRandomQuoteData()
        } catch (e) {
          expect(e.message).toBe('No quotes available')
        }

        data = {
          "quotes": [{
            text: "Can't catch me",
            id: '1'
          }],
          "extras": {}
        }
        provider = new JSONFileQuoteDAO(data)

        try {
          await provider.fetchRandomQuoteData('1')
        } catch (e) {
          expect(e.message).toBe('No quotes available')
        }
      }
    )
  })

  describe('fetch random nerdy quote data', () => {
    it(
      'should throw if there\'s no non-nerdy quotes',
      async () => {
        let data: QuoteDataCollection
        let provider:JSONFileQuoteDAO

        data = {
          "quotes": [],
          "extras": {}
        }
        provider = new JSONFileQuoteDAO(data)

        try {
          await provider.fetchRandomNonNerdyQuoteData()
        } catch (e) {
          expect(e.message).toBe('No non-nerdy quotes. They\'re either all nerdy, or there\'s no quotes at all')
        }

        data = {
          "quotes": [
            {
              text: "Yamcha lost",
              id: '0',
              isNerdy: true
            },
            {
              text: "Yamcha lost",
              id: '1',
              isNerdy: true
            }
          ],
          "extras": {}
        }
        provider = new JSONFileQuoteDAO(data)
        
        try {
          await provider.fetchRandomNonNerdyQuoteData()
        } catch (e) {
          expect(e.message).toBe('No non-nerdy quotes. They\'re either all nerdy, or there\'s no quotes at all')
        }
      }
    )

    it(
      'should get non-nerdy quotes normally',
      async () => {
        const data: QuoteDataCollection = {
          "quotes": [
            {
              text: "Yamcha lost",
              id: '0',
              isNerdy: true
            },
            {
              text: "Yamcha lost",
              id: '1',
              isNerdy: false
            },
            "Yamcha sucks"
          ],
          "extras": {}
        }
        const provider = new JSONFileQuoteDAO(data)
        let quote

        jest.spyOn(getRandomInt, 'default').mockImplementationOnce(() => 0)
        quote = await provider.fetchRandomNonNerdyQuoteData()

        expect(quote).toEqual({
          text: "Yamcha lost",
          id: '1',
          isNerdy: false
        })

        jest.spyOn(getRandomInt, 'default').mockImplementationOnce(() => 1)
        quote = await provider.fetchRandomNonNerdyQuoteData()

        expect(quote).toEqual({
          text: "Yamcha sucks",
          id: '2',
          isNerdy: false
        })
      }
    )
  })

  describe('fetch by id', () => {
    it(
      'should return data matching a provided id',
      async () => {
        const data: QuoteDataCollection = {
          "quotes": [
            {
              text: "Yamcha won",
              id: '0',
              isNerdy: true
            },
            {
              text: "Yamcha lost",
              id: '1',
              isNerdy: true
            }
          ],
          "extras": {}
        }
        const provider = new JSONFileQuoteDAO(data)
        const quoteData = await provider.fetchQuoteData('1')

        expect(quoteData).toEqual({
          text: "Yamcha lost",
          id: '1',
          isNerdy: true
        })
      }
    )

    it(
      'should signal when there\'s no quote matching the requested id',
      async () => {
        let data: QuoteDataCollection
        let provider:JSONFileQuoteDAO

        data = {
          "quotes": [],
          "extras": {}
        }
        provider = new JSONFileQuoteDAO(data)
        try {
          await provider.fetchQuoteData('2')
        } catch (e) {
          expect(e.message).toEqual('No quote matching id 2')
        }

        data = {
          "quotes": [
            {
              text: "Yamcha won",
              id: '0',
              isNerdy: true
            },
            {
              text: "Yamcha lost",
              id: '1',
              isNerdy: true
            }
          ],
          "extras": {}
        }
        provider = new JSONFileQuoteDAO(data)
        try {
          await provider.fetchQuoteData('2')
        } catch(e) {
          expect(e.message).toEqual('No quote matching id 2')
        }
      }
    )
  })
})