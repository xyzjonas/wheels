export const mustBeNonEmpty = (val: string | null) => {
  if (!val) {
    return 'Can not be empty.'
  }

  return true
}

export const mustBeNonZero = (val: string | number | null) => {
  if (isNaN(parseFloat(`${val}`))) {
    return 'Must be a number.'
  }

  const num = parseFloat(`${val}`)
  if (num <= 0) {
    return 'Must be greater than zero.'
  }

  return true
}

