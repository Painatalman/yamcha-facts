import getRandomInt from './utils/getRandomInt';
import getFirstIntNotIn from './utils/getFirstIntNotIn';

import QuoteDAO from './interfaces/QuoteDAO';

import QuoteDataExtra from './types/QuoteDataExtra';
import QuoteDataCollection from './types/QuoteDataCollection';
import id from './types/id';
import QuoteDataParsed from './types/QuoteDataParsed';
import QuoteData from './types/QuoteData';
import QuoteDataParsedMinusId from './types/QuoteDataParsedMinusId';
import validateQuoteDataParsedCollection from './validators/validateQuoteDataCollection';

// a provider that has its own data stored locally, doesn't do API calls
export default class JSONFileQuoteDAO implements QuoteDAO {
  private _quoteDataList: QuoteDataParsed[];
  private _extras: QuoteDataExtra;
  private _lastId: number | undefined;

  constructor({ quotes, extras }: QuoteDataCollection) {
    this._quoteDataList = this._initQuoteData(quotes);
    this._extras = extras;

    validateQuoteDataParsedCollection({
      quotes: this._quoteDataList,
      extras: this._extras
    });
  }

  _initQuoteData(quotes: QuoteData[]): QuoteDataParsed[] {
    let quoteDataNoCustomIDs: QuoteDataParsedMinusId[] = quotes.map(
      function parseQuoteData(data) {
        // checks if an unique id must be set for the quote
        if (typeof data === 'string') {
          return {
            text: data,
            id: undefined,
            isNerdy: false
          };
        }

        const { text, id, isNerdy = false } = data;

        return {
          text,
          id,
          isNerdy
        };
      }
    );

    return this._getQuoteDataWithIDs(quoteDataNoCustomIDs);
  }

  _getQuoteDataWithIDs(
    quoteDataNoCustomIDs: QuoteDataParsedMinusId[]
  ): QuoteDataParsed[] {
    const quoteIDs: id[] = quoteDataNoCustomIDs.reduce<id[]>(
      (quoteDataList, quoteData) => {
        if (typeof quoteData.id !== 'undefined') {
          quoteDataList.push(quoteData.id);
        }

        return quoteDataList;
      },
      []
    );

    return quoteDataNoCustomIDs.map<QuoteDataParsed>((quoteData) => {
      if (typeof quoteData.id === 'string') {
        return {
          ...quoteData,
          id: quoteData.id
        };
      }

      const id = '' + getFirstIntNotIn(quoteIDs.map((item) => parseInt(item)));
      quoteIDs.push(id);

      return {
        ...quoteData,
        id
      };
    });
  }

  _getRandomFilteredQuoteData(
    list: QuoteDataParsed[]
  ): Promise<QuoteDataParsed> {
    const quote = this._getRandomItemFromList(list);

    if (!quote) {
      return Promise.reject(new Error('No quotes available'));
    }

    return Promise.resolve(quote);
  }

  _getRandomExtra(type: string): string {
    if (!this._extras[type]) {
      throw new Error('there are no extras of type' + type);
    }

    const extraIndex = getRandomInt(this._extras[type].length);

    return this._extras[type][extraIndex];
  }

  _getRandomItemFromList(
    quoteDataList: QuoteDataParsed[]
  ): QuoteDataParsed | null {
    const quoteLength: number = quoteDataList.length;
    let quote;

    if (quoteLength === 0) {
      return null;
    }
    quote = quoteDataList[quoteLength === 1 ? 0 : getRandomInt(quoteLength)];

    return this._getQuoteDataWithExtras(quote);
  }

  _getQuoteDataWithExtras(quoteData: QuoteDataParsed): QuoteDataParsed {
    const text = quoteData.text.replace(
      /(^|\s+)\$([a-z]+)/g,
      (_wholeMatch, spaceOrStart: string, extraName: string) => {
        return `${spaceOrStart}${this._getRandomExtra(extraName)}`;
      }
    );

    return {
      ...quoteData,
      text
    };
  }

  fetchQuoteData(id: id) {
    const quote = this._quoteDataList.find((quoteData) => quoteData.id == id);

    if (!quote) {
      return Promise.reject(new Error(`No quote matching id ${id}`));
    }
    return Promise.resolve(this._getQuoteDataWithExtras(quote));
  }

  fetchRandomQuoteData(excludedId?: id) {
    const list = this._quoteDataList.filter(
      (quoteData) => quoteData.id !== excludedId
    );

    return this._getRandomFilteredQuoteData(list);
  }

  fetchRandomNonNerdyQuoteData(excludedId?: id) {
    const list = this._quoteDataList.filter(({ id, isNerdy }) => {
      return id !== excludedId && isNerdy === false;
    });
    const quote = this._getRandomItemFromList(list);

    if (!quote) {
      return Promise.reject(
        new Error(
          "No non-nerdy quotes. They're either all nerdy, or there's no quotes at all"
        )
      );
    }

    return Promise.resolve(quote);
  }
}
