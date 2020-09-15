/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor (text) {
    let words = text.split(/[ \r\n]+/)
    this.words = words.filter(c => c !== '')
    this.chain = {}
    this.makeChains()
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains () {
    const words = this.words
    const chain = this.chain

    // Create an object with all words in a string with an array of words after that word
    for (let i = 0; i < words.length; i++) {
      if (!(words[i] in chain)) {
        chain[words[i]] = []
      }
      chain[words[i]].push(words[i + 1])
    }
  }

  /** return random text from chains */

  makeText (numWords = 100) {
    const words = this.words
    const chain = this.chain

    const randStartIndex = Math.floor(Math.random() * words.length)
    const firstWord = words[randStartIndex]

    let generatedText = []
    generatedText.push(firstWord)

    while (generatedText.length < numWords) {
      const lastWord = generatedText[generatedText.length - 1]

      const randIndexForWord = Math.floor(
        Math.random() * chain[lastWord].length
      )

      const nextWord = chain[lastWord][randIndexForWord]
      if (nextWord) {
        generatedText.push(nextWord)
      } else {
        break
      }
    }

    console.log(generatedText.join(' '))
  }
}

module.exports = {
  MarkovMachine
}
