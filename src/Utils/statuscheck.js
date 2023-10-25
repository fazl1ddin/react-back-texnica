function statusCheck(status) {
    const map = new Map([
        [0, "Ordered"],
        [1, "Pending"],
        [2, "Delivered"],
    ])
    return map.get(status)
}

export default statusCheck