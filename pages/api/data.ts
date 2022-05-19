import {
    NextApiRequest,
    NextApiResponse,
}                from "next"
import firestore from "../../utils/firestore"

const municipality = "kathmandu"

const Data = async (req: NextApiRequest, res: NextApiResponse) => {
    const collections = await firestore.collection(municipality).get()

    res.send("hello world")
}

export default Data
