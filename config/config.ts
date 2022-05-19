interface AppConfig {
    province: string
    district: string
    municipality: string
    data_url: string
}

export const config: AppConfig = {
    province: process.env.PROVINCE || "",
    district: process.env.DISTRICT || "",
    municipality: process.env.MUNICIPALITY || "",

    data_url: process.env.DATA_URL || "",
}
