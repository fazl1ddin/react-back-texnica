import { useState } from "react"

function usePagination(dpage = 1, dsize = 10) {
    const [page, setPage] = useState(dpage)
    const [size, setSize] = useState(dsize)

    const handler = (page, size) => {
        setPage(page)
        setSize(size)
    }

    return [page, size, handler]
}

export default usePagination