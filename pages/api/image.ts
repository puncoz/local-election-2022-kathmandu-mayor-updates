import { NextApiRequest, NextApiResponse } from "next"
import puppeteer                           from "puppeteer"
import { config }                          from "../../config/config"

const Image = async (req: NextApiRequest, res: NextApiResponse) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 390, height: 600 })
    await page.goto(config.api_url, { waitUntil: "networkidle2" })
    const image = await page.screenshot({
        type: "jpeg",
        quality: 100,
        clip: {
            x: 0,
            y: 0,
            width: 390,
            height: 600,
        },
        omitBackground: true,
    })
    await browser.close()
    console.log("See screen shot: screenshot")


    res.setHeader("Content-Type", `image/jpeg`)
    res.end(image)
}

export default Image
