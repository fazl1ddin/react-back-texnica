import { useLayoutEffect, useState } from "react"
import axios from "axios"
import BaseLoader from "../Loaders/BaseLoader"

function ImgXHR({src, height = "100%", width = "100%"}) {
    const [url, setUrl] = useState(undefined)
    const [loading, setLoading] = useState(true)
    
    useLayoutEffect(() => {
        (
            async () => {
                setLoading(true)
                const res = await axios.get(`https://back-texnica-production.up.railway.app/images/${src}`, { responseType: "blob" })
                setUrl(URL.createObjectURL(res.data))
                setLoading(false)
            }
        )()
    }, [src])

    return loading ? <BaseLoader circleHeight={100} circlewidth={100} height={height} width={width}/> :
    <img src={url} alt="" />
}

export default ImgXHR