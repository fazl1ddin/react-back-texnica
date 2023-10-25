function tpch(type) {
    const map = new Map([
        [0, "Наличные"],
        [1, "Банковские карты"],
        [2, "Платежные системы"],
    ])
    return map.get(type)
}

export default tpch