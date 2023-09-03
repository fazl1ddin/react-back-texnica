function tpch(type) {
    let res;
    switch (type) {
        case 0:
            res = "Наличные"
            break;
        case 1:
            res = "Банковские карты"
            break;
        case 2:
            res = "Платежные системы"
            break;
        default:
            break;
    }
    return res
}

export default tpch