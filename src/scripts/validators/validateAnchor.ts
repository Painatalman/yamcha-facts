function isAnchor(el: any) {
  return el instanceof HTMLAnchorElement
}

/**
 * Throws an error if it's a checkbox
 */
export default function validateCheckbox(el:any):HTMLAnchorElement {
  if (!isAnchor(el)) {
    throw new Error(`NotAnchor: ${el} is not an anchor. Maybe it does not exist!`)
  }

  return el
}
