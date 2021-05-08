const fs = require('fs')
const padStart = require('lodash/padStart')
const numberToLetter = require('number-to-letter') 
const letterToNumber = require('letter-to-number') 
const WIDTH = 10
const HEIGHT = 10

const X_START = letterToNumber('A')
const Y_START = 25

let coordinates = []

for (let y = 0; y < HEIGHT; y++) {

    for (let x = 0; x < WIDTH; x++) {

        const column = (x + 1)
        const row = (y + 1)

        const index = (y * WIDTH) + x 
        const key = `${index + 1}` 
        const imageId = `image_part_${padStart(key, 3, 0)}.png`

        const abs_y = Y_START + y
        const abs_x = X_START + x

        const cs_y = abs_y
        const cs_x = numberToLetter(abs_x)
        const cs_id = [cs_x, cs_y].join('-')
        const cs_key = `CardanoSpace${cs_x}${cs_y}`
        const cs_url = `https://www.cardanospace.com/coordinate/${cs_id}`

        coordinates.push({ index, key, imageId, x, y, row, column, abs_y, abs_x, cs_y, cs_x, cs_key, cs_url, cs_id })

        console.log({ index, key, imageId, x, y, row, column, abs_y, abs_x, cs_y, cs_x, cs_key, cs_url, cs_id})
    }
}

coordinates = coordinates.sort((a, b) => a.index - b.index)

fs.writeFileSync(__dirname + '/coordinates.json', JSON.stringify(coordinates, null, 2))