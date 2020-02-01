function isCheckbox(el:any) {
  return el instanceof HTMLInputElement && el.type === 'checkbox' 
}

/**
 * Throws an error if it's not a checkbox
 */
export default function validateCheckbox(el:any):HTMLInputElement {
  if (!isCheckbox(el)) {
    throw new Error(`NotCheckbox: ${el} is not a checkbox`)
  }

  return el
}
