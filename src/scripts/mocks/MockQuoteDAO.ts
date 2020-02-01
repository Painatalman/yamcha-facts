import QuoteDAO from '../interfaces/QuoteDAO'
import id from '../types/id'

// for testing purposes
export default class MockQuoteDAO implements QuoteDAO {
  async fetchRandomQuoteData(_excludedId?:id) {
    return await Promise.resolve({
      "text": "A dinosaur can't teach Yamcha how to ride a ball",
      "isNerdy": true,
      "id": "1"
    })
  }

  async fetchRandomNonNerdyQuoteData(_excludedId ?: id) {
    return await Promise.resolve({
      "text": "A dinosaur can't teach Yamcha how to ride a ball",
      "isNerdy": false,
      "id": "2"
    })
  }

  async fetchQuoteData(_id:id) {
    return await Promise.resolve({
      "text": "A dinosaur can't teach Yamcha how to ride a ball",
      "isNerdy": true,
      "id": "1"
    })
  }
}
