import { useLayoutEffect, useState } from "react"
import axios from "axios"

function ImgXHR({src}) {
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

    return loading ? <>gsagagagaa</> :
    <img src={url} alt="" />
}

export default ImgXHR