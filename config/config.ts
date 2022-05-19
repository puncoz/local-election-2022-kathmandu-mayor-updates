interface AppConfig {
    province: string
    district: string
    municipality: string
    data_url: string
    seed_data_url: {
        mayor: string
        deputy_mayor: string
    }
}

export const config: AppConfig = {
    province: process.env.PROVINCE || "",
    district: process.env.DISTRICT || "",
    municipality: process.env.MUNICIPALITY || "",

    data_url: process.env.DATA_URL || "",
    seed_data_url: {
        mayor: process.env.SEED_DATA_URL_MAYOR || "",
        deputy_mayor: process.env.SEED_DATA_URL_D_MAYOR || "",
    }
}
