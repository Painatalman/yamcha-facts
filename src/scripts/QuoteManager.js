class QuoteManager {
  constructor(data) {
    this.quotesAndDialogs = [...data.quotes, ...data.dialogs]
    this.extras = data.extras
    // the last index used
    this.lastIndex = null
  }

  /**
   * Returns a list containing one or more quotes.
   * In case its length is more than 1, then it refers to a dialog
   * @return {[string]} list of quotes
   */
  getRandomQuoteOrDialog() {
    let currentIndex = 0
    let quoteAndDialogLength = this.quotesAndDialogs.length

    if (quoteAndDialogLength > 1) {
      do {
        currentIndex = Math.floor(Math.random() * quoteAndDialogLength);
      } while (currentIndex === this.lastIndex);
    }

    this.lastIndex = currentIndex;

    let selectedQuoteOrDialogArray = this.quotesAndDialogs[currentIndex];

    // create a list of quotes to be converted
    if (!(selectedQuoteOrDialogArray instanceof Array)) {
      selectedQuoteOrDialogArray = [selectedQuoteOrDialogArray];
    }

    return selectedQuoteOrDialogArray.map(quote => 
      quote.replace(
        /\$(\w+)/g, 
        (match, capture) => this.getRandomExtra(capture)
      )
    )
  }

  getRandomExtra(type) {
    if (!this.extras[type]) {
      throw new Error('there are no extras of type' + type);
    }

    return this.extras[type][
      Math.floor(Math.random() * this.extras[type].length)
    ]
  }
}

QuoteManager.extraTypeWildcard = '$'

export default QuoteManager
