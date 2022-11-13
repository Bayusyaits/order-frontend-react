export const currencyFormat = (number: number) => {
  const numberString = number.toString().replace(/[^,\d]/g, '')
  const numberSplit = numberString.split(',')
  const numberMod = numberSplit[0].length % 3
  let idr = numberSplit[0].substr(0, numberMod)
  const numberMatch = numberSplit[0].substr(numberMod).match(/\d{3}/gi)

  if (numberMatch) {
    const separator = numberMod ? '.' : ''
    idr += separator + numberMatch.join('.')
  }

  idr = numberSplit[1] !== undefined ? `${idr},${numberSplit[1]}` : idr

  return `Rp ${idr}`
}

export const createUniqueKey = () =>
  `key-${Math.random() * 100}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
