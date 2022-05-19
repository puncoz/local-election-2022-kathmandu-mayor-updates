import cheerio     from "cheerio"
import {
    NextApiRequest,
    NextApiResponse,
}                  from "next"
import { config }  from "../../config/config"
import firestore   from "../../utils/firestore"
import { dataUrl } from "../../utils/helpers"

type PositionTitle = "Mayor" | "Deputy Mayor"

interface VoteCount {
    name: string
    count: number
}

interface Data {
    Mayor: VoteCount[]
    "Deputy Mayor": VoteCount[]
}

const saveData = async (data: Data) => {
    const time = new Date().toISOString()
    await firestore.collection(config.municipality).doc(time).set({
        ...data,
        created: time,
    })
}

const Trigger = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const response = await fetch(dataUrl())
    const htmlText = await response.text()
    const $ = cheerio.load(htmlText)

    const voteCountsGroup = $(".nominee-list-group .card")

    const data: Data = {
        Mayor: [],
        "Deputy Mayor": [],
    }

    voteCountsGroup.each((index, el) => {
        const title = $(el).find(".card-title").text().trim() as PositionTitle
        const items = $(el).find(".list-group .list-group-item")
        console.log(title === "Mayor", title === "Deputy Mayor", title)

        items.each((index, itemEl) => {
            const name = $(itemEl).find(".candidate-name").text().trim()
            const votes = $(itemEl).find(".vote-numbers").text().trim() || "0"

            data[title].push({
                name,
                count: parseInt(votes),
            })
        })
    })

    await saveData(data)

    res.status(200).json(data)
}

export default Trigger
