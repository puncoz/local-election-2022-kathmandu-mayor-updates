import {
    NextApiRequest,
    NextApiResponse,
}                 from "next"
import { config } from "../../config/config"
import firestore  from "../../utils/firestore"

type PositionTitle = "Mayor" | "Deputy Mayor"

interface VoteCount {
    name: string
    count: number
}

interface SeedData {
    [key: string]: {
        Mayor: VoteCount[]
        "Deputy Mayor": VoteCount[]
        created: string
    }
}

interface FetchedData {
    _id: string
    data: Array<{
        name: string
        votes: string
    }>
    createdAt: string
    updatedAt: string
}

const getData = async (url: string, key: PositionTitle, seededData: SeedData = {}) => {
    const response = await fetch(url)
    const data = await response.json() as FetchedData[]

    data.forEach(d => {
        const created = d.createdAt
        const voteCounts = d.data.map(v => {
            return {
                name: v.name.trim(),
                count: parseInt(v.votes.trim() || "0"),
            }
        })

        seededData[created] = {
            ...(seededData[created] || {}),
            [key]: voteCounts,
            created,
        }
    })

    return seededData
}

const Data = async (req: NextApiRequest, res: NextApiResponse) => {
    const mayor = await getData(config.seed_data_url.mayor, "Mayor", {})
    const dMayor = await getData(config.seed_data_url.deputy_mayor, "Deputy Mayor", mayor)

    const batch = firestore.batch()

    const collection = firestore.collection(config.municipality)

    Object.keys(dMayor).forEach((key) => {
        const doc = collection.doc(key)
        batch.set(doc, dMayor[key])
    })

    await batch.commit()

    res.send("Data Seeded")
}

export default Data
