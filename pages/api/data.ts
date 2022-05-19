import {
    NextApiRequest,
    NextApiResponse,
}                 from "next"
import { config } from "../../config/config"
import firestore  from "../../utils/firestore"

const Data = async (req: NextApiRequest, res: NextApiResponse) => {
    const collections = await firestore.collection(config.municipality).get()

    res.json(collections.docs.map(doc => doc.data()))
}

export default Data
