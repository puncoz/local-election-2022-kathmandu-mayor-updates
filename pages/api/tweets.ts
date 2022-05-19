import { NextApiRequest, NextApiResponse } from "next"
import { config }                          from "../../config/config"
import Twitter                             from "../../utils/twitter"

const Tweets = async (req: NextApiRequest, res: NextApiResponse) => {
    const imgRes = await fetch(`${config.api_url}/.netlify/functions/live`)
    const img = await imgRes.arrayBuffer()

    const voteRes = await fetch(`${config.api_url}/api/balen-vs-sthapit`)
    const voteCount = await voteRes.json()

    const tweets = `
        Time: ${new Date().toLocaleString("ne-NP", {
        timeZone: "Asia/Kathmandu",
    })}\n
        ---
        Balendra Shah: ${voteCount.balen.toLocaleString()}\n
        Keshav Sthapit: ${voteCount.sthapit.toLocaleString()}\n
        ---
        
        #LocalElections2022 #LocalElections2079 #BalenShah #keshavsthapit #KathmanduMayor
        `

    const client = Twitter()

    let media = null
    try {
        media = await client.post("media/upload", { media_data: Buffer.from(img).toString("base64") })
    } catch (e) {
        console.error("Image upload failed.", e)
        throw e
    }

    console.log("Image uploaded successfully!")

    if (media) {
        try {
            await client.post("statuses/update", {
                status: tweets,
                media_ids: media.media_id_string,
            })
        } catch (e) {
            console.error("Tweet failed.", e)
            throw e
        }

        console.log("Tweeted successfully!")
    }

    res.send("Tweeted successfully!")
}

export default Tweets
