function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * Get a Random FSA for Vancouver, BC
 *
 * FSAs for Vancouver from Wikipedia
 * https://en.wikipedia.org/wiki/List_of_postal_codes_of_Canada:_V
 * V - [British Columbia]
 * 6 - A,B,C,E,G,H,J,K,L,M,N,P,R,S,T,Z
 * 5 - K,L,M,N,P,R,S,T,V,W,X,Y,Z
 * 7 - X,Y
 *
 * return {string}
 */
const getRandomFSA_Vancouver = first => second => {
  const firstNumber = [5, 6, 7]
  const five = ['K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
  const six = [
    'A',
    'B',
    'C',
    'E',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'R',
    'S',
    'T',
    'Z',
  ]
  const seven = ['X', 'Y']

  // const secondChar = firstNumber[getRandomInt(0, firstNumber.length - 1)];
  const secondChar =
    firstNumber[typeof first != 'undefined' ? first : getRandomInt(0, firstNumber.length - 1)]

  // find the correct letter array
  let letterArray
  if (secondChar === 5) {
    letterArray = five
  } else if (secondChar === 6) {
    letterArray = six
  } else if (secondChar === 7) {
    letterArray = seven
  }
  // const thirdChar = letterArray[getRandomInt(0, letterArray.length - 1)];
  const thirdChar =
    letterArray[typeof second != 'undefined' ? second : getRandomInt(0, letterArray.length - 1)]

  const fsa = `V${secondChar}${thirdChar}`
  return fsa
}

module.exports = { getRandomFSA_Vancouver, getRandomInt }
