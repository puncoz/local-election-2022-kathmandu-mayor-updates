const chromium = require("chrome-aws-lambda")
const puppeteer = require("puppeteer-core")

exports.handler = async (event, context, callback) => {
    // 1. Launch a new browser
    const browser = await puppeteer.launch({
        // Required
        executablePath: await chromium.executablePath,

        // Optional
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
    })

    // 2. Open a new page
    const page = await browser.newPage()
    await page.setViewport({ width: 390, height: 600 })

    // 3. Navigate to the given URL
    await page.goto("https://balen-vs-sthapit.netlify.app/", { waitUntil: "networkidle2" })

    // 4. Take screenshot
    const screenshot = await page.screenshot({
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

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "image/jpeg",
        },
        body: screenshot.toString("base64"),
        isBase64Encoded: true,
}
}
