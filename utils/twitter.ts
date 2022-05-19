import Twitter        from "twitter"
import { credential } from "../config/twitter"

const twitter = () => {
    return new Twitter({
        ...credential,
    })
}

export default twitter
