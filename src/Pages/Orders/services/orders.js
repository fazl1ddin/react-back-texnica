import instance from "../../../Config/api";

class OrdersServise {
    async GetAll(page, size) {
        return await instance({
            url: "/orders",
            method: "get",
            params: {
                p: page,
                pp: size,
            },
        });
    }

    async GetProductsFromOrder(product_ids) {
        return await instance({
            url: "/products",
            method: 'post',
            data: product_ids,
            params: {
                s: "product,productName,price"
            }
        })
    }

    async GetOneOrder(id) {
        return await instance({
            url: "/orders",
            method: "post",
            data: [id]
        })
    }

    async GetOrderInfoById(url, id) {
        return await instance({
            url: url,
            method: "post",
            data: [id]
        })
    }

    async GetCities() {
        return await instance({
            url: "/cities",
            method: "get"
        })
    }

    async GetTypePays() {
        return await instance({
            url: "/type-pays",
            method: 'get'
        })
    }

    async GetDaysToDeliv() {
        return await instance({
            url: "/days-to-deliv",
            method: 'get'
        })
    }

    async PutOrder({id, values}) {
        return await instance({
            url: `/orders/${id}`,
            method: 'put',
            data: values
        })
    }
}

export const exportedOrdersServise = new OrdersServise()