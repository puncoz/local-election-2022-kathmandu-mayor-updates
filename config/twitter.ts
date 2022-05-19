interface TwitterCredential {
    subdomain: string
    consumer_key: string
    consumer_secret: string
    access_token_key: string
    access_token_secret: string
    // bearer_token: string
}

export const credential: TwitterCredential = {
    subdomain: "api", // "api" is the default (change for other subdomains)
    consumer_key: process.env.TWITTER_CONSUMER_KEY || "",
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "",
    access_token_key: process.env.TWITTER_ACCESS_TOKEN || "",
    access_token_secret: process.env.TWITTER_ACCESS_SECRET || "",
    // bearer_token: process.env.TWITTER_API_BEARER_TOKEN || "",
}
