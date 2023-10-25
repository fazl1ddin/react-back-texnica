import instance from "../../../Config/api";

class ProductsServise {
    async GetAll(page, size) {
        return await instance({
            url: "/products",
            method: "get",
            params: {
                p: page,
                pp: size,
                s: "protection,hit,news,price,sale,productName,rates"
            },
        });
    }

    async UpdateKey({ product_id, key, value }) {
        console.log({ [key]: value });
        return await instance({
            url: `/products/${product_id}`,
            method: 'put',
            data: { [key]: value }
        })
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

    async PutOrder(id, values) {
        return await instance({
            url: `/orders/${id}`,
            method: 'put',
            data: values
        })
    }
}

export const exportedProductsServise = new ProductsServise()