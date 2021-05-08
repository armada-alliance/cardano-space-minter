const fs = require("fs").promises
const Throttle = require("promise-parallel-throttle")
const upperFirst = require('lodash/upperFirst')
const coordinates = require("./coordinates.json")

const quotes = [
    "The problem is not the problem. The problem is your attitude about the problem. Do you understand?",
    "Why is the rum gone?",
    "You need to find yourself a girl, mate.",
    "Avast ye!",
    "Shiver me timbers!",
    "Ello poppet.",
    "Savvy?",
    "I'm a pirate!",
    "Arrrgggh!",
    "Ahoy",
    "Shiver me timbers!",
    "Give no quarter",
    "Scallywag",
    "Scurvy dog",
    "ka-bloom!",
    "Shark bait",
    "Son of a biscuit eater",
    "Walk the plank",
    "Mutiny!",
    "briney deep",
    "cackle fruit",
    "no prey, no pay loot",
    "clap of thunder",
    "dance the hempen jig",
    "binance is lame",
    "peg leg",
    "Davy Jones' locker",
    "feed the fish",
    "fire in the hole",
    "hang the jib",
    "hearties",
    "hempen halter",
    "ka-bloom!",
    "hornswaggle",
    "three sheets to the wind",
    "ka-bloom!",
    "run a rig",
    "ka-bloom!",
    "sea legs",
    "ka-bloom!",
    "scuttle",
    "scuttlebutt",
    "swashbuckler",
    "ka-bloom!",
]

async function main() {

    const updated_coordinates = await Throttle.sync(
        coordinates.map((coordinate, index) => async () => {

            return {
                ...coordinate,
                url: "https://armada-alliance.com",
                msg: upperFirst(quotes[index % quotes.length])
            }
        })
    )

    // write updated coordinates to coordinates.json
    await fs.writeFile(__dirname + '/coordinates.json', JSON.stringify(updated_coordinates, null, 2))

    console.log('written updates to coordinates.json')
}

main()