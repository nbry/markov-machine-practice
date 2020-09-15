/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require('./markov')
const axios = require('axios')
const fs = require('fs')
const process = require('process')

const parameter = process.argv[2]
const target = process.argv[3]

function generateFileText (file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err)
      process.exit(1)
    } else {
      const mm = new MarkovMachine(data)
      mm.makeText()
    }
  })
}

async function generateUrlText (url) {
  try {
    let response = await axios.get(url)
    const mm = new MarkovMachine(response.data)
    mm.makeText()
  } catch (err) {
    console.log('Error: ', err.message)
    process.exit(1)
  }
}

if (parameter === 'file') {
  generateFileText(target)
} else if (parameter === 'url') {
  generateUrlText(target)
}
