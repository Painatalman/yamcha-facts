function isElement(el: any) {
  return el instanceof HTMLElement
}

/**
 * Throws an error if it's a checkbox
 */
export default function validateCheckbox(el:any):HTMLElement {
  if (!isElement(el)) {
    throw new Error(`NotElement: ${el} is not an HTML element. Maybe it does not exist!`)
  }

  return el
}
