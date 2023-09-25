function withZero(number) {
    return number >= 10
        ? number
        : "0" + number
}

export default withZero