const fs = require("fs").promises
const pinToIpfs = require("./pin-to-ipfs")
const Throttle = require("promise-parallel-throttle")

const coordinates = require("./coordinates.json")

async function main() {

    const updated_coordinates = await Throttle.sync(
        coordinates.map(coordinate => async () => {

            const { ipfsLink: image, httpLink: imageLink } = await pinToIpfs(coordinate.imageId, __dirname + "/images/" + coordinate.imageId)
            console.log(`[${coordinate.cs_key}] pinned image to ipfs (${imageLink})`)
            
            return {
                ...coordinate,
                ipfs: image,
                ipfsLink: imageLink
            }
        })
    )

    // write updated coordinates to coordinates.json
    await fs.writeFile(__dirname + '/coordinates.json', JSON.stringify(updated_coordinates, null, 2))

    console.log('written updates to coordinates.json')
}

main()