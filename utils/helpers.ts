import { config } from "../config/config"

export const dataUrl = (): string => {
    return config.data_url.replace("__province__", config.province)
        .replace("__district__", config.district)
        .replace("__municipality__", config.municipality)
}
