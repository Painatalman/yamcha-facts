import QuoteDTO from './interfaces/QuoteDTO';
import QuoteRenderer from './interfaces/QuoteRenderer';

class YamchaQuoteRenderer implements QuoteRenderer {
  // classnames from animatecss
  private static EFFECTS = {
    ZOOM_IN: 'zoomIn',
    ZOOM_OUT: 'zoomOut'
  };
  private _el: HTMLElement;
  private _isFirstTime: boolean;

  public constructor(el: HTMLElement) {
    this._el = el;
    this._isFirstTime = true;
  }

  /**
   * Useful to handle animation
   */

  private _getPromiseForSingleAnimation(func: () => void): Promise<void> {
    const hasReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (hasReducedMotion) return Promise.resolve(func());

    return new Promise((resolve): void => {
      this._el.addEventListener('animationend', (): void => resolve(), {
        once: true
      });

      func();
    });
  }

  private _hideQuote(): Promise<void> {
    const { ZOOM_IN, ZOOM_OUT } = YamchaQuoteRenderer.EFFECTS;
    const { _el } = this;
    const setClasses = (): void => {
      _el.classList.remove(ZOOM_IN);
      _el.classList.add(ZOOM_OUT);
    };
    if (this._isFirstTime) {
      return new Promise((resolve): void => {
        setClasses();
        resolve();
      });
    }

    return this._getPromiseForSingleAnimation(setClasses);
  }
  private _showQuote(): Promise<void> {
    const { ZOOM_IN, ZOOM_OUT } = YamchaQuoteRenderer.EFFECTS;
    const { _el } = this;

    return this._getPromiseForSingleAnimation((): void => {
      _el.classList.remove(ZOOM_OUT);
      _el.classList.add(ZOOM_IN);
    });
  }
  private _getTemplate(quote: QuoteDTO): string {
    return `<p>${quote.getContent()}</p>`;
  }

  public async render(quote: QuoteDTO): Promise<void> {
    const quoteContent = this._getTemplate(quote);
    await this._hideQuote();
    this._el.innerHTML = quoteContent;
    this._isFirstTime = false;

    return await this._showQuote();
  }
}

export default YamchaQuoteRenderer;
