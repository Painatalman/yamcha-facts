import QuoteDTO from "./interfaces/QuoteDTO";
import QuoteRenderer from "./interfaces/QuoteRenderer";

class YamchaQuoteRenderer implements QuoteRenderer {
  // classnames from animatecss
  private static EFFECTS = {
    ZOOM_IN: "zoomIn",
    ZOOM_OUT: "zoomOut"
  };
  private _el: HTMLElement;
  private _isFirstTime: boolean;

  constructor(el: HTMLElement) {
    this._el = el;
    this._isFirstTime = true;
  }

  /**
   * Useful to handle animation
   */

  _getPromiseForSingleAnimation(func: () => void): Promise<void> {
    const hasReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasReducedMotion) return Promise.resolve(func());

    return new Promise(resolve => {
      this._el.addEventListener("animationend", () => resolve(), {
        once: true
      });

      func();
    });
  }

  _hideQuote() {
    const { ZOOM_IN, ZOOM_OUT } = YamchaQuoteRenderer.EFFECTS;
    const { _el } = this;
    const setClasses = () => {
      _el.classList.remove(ZOOM_IN);
      _el.classList.add(ZOOM_OUT);
    };
    if (this._isFirstTime) {
      return new Promise(resolve => {
        setClasses();
        resolve();
      });
    }

    return this._getPromiseForSingleAnimation(setClasses);
  }
  _showQuote() {
    const { ZOOM_IN, ZOOM_OUT } = YamchaQuoteRenderer.EFFECTS;
    const { _el } = this;

    return this._getPromiseForSingleAnimation(() => {
      _el.classList.remove(ZOOM_OUT);
      _el.classList.add(ZOOM_IN);
    });
  }
  _getTemplate(quote: QuoteDTO): string {
    return `<p>${quote.getContent()}</p>`;
  }

  async render(quote: QuoteDTO) {
    const quoteContent = this._getTemplate(quote);

    await this._hideQuote();
    this._el.innerHTML = quoteContent;
    this._isFirstTime = false;
    return await this._showQuote();
  }
}

export default YamchaQuoteRenderer;
