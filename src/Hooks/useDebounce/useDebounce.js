import { useEffect, useState } from "react"

function useDebounce(data, delay) {
    const [value, setValue] = useState(undefined)
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setValue(data)
        }, delay)

        return clearTimeout(timeout)
    }, [data, delay])

    return value
}

export default useDebounce