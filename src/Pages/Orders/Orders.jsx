import { Pagination, Table } from "antd";
import PageTitle from "../../Components/PageTitle/PageTitle";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import ImgXHR from "../../Components/Img/ImgXHR";
import { useState } from "react";
import BaseLoader from "../../Components/Loaders/BaseLoader";
import usePagination from "../../Hooks/usePagination/usePagination";
import PrevNext from "../../Components/PrevNext/PrevNext";
import { useQuery } from "@tanstack/react-query";
import { exportedOrdersServise } from "./services/orders";
import img from "./photo_2023-10-09_10-17-01.jpg"

const itemRender = (disabled, type, originalElement) => {
  if (type === "prev") {
    return <PrevNext type={type} disabled={disabled} />;
  }
  if (type === "next") {
    return <PrevNext type={type} disabled={disabled} />;
  }
  return originalElement;
};

function Orders({ title }) {
  const [page, size, handler] = usePagination();
  const columns = [
    Table.EXPAND_COLUMN,
    {
      title: "No",
      dataIndex: "key",
      render: (_, _a, index) => index + 1 + size * (page - 1),
      width: 60,
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <Link to={`/order/${id}`}>{id}</Link>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <>{moment(Number(date)).format("MMMM Do YYYY, h:mm:ss a")}</>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Type pay",
      dataIndex: "typePay",
      key: "typePay",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      render: (user) => <Link to={`/user/${user}`}>{user}</Link>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];
  const { data: orders, isLoading: isOrdersLoading } = useQuery(
    ["orders", page, size],
    {
      queryFn: () => exportedOrdersServise.GetAll(page, size),
      select: (data) => ({
        items: data.data.data.items,
        length: data.data.data.length,
      }),
    }
  );
  const [productIds, setProductsids] = useState([]);
  const { data: products, isLoading: isProductsLoading } = useQuery(
    ["productsFromOrder", productIds],
    {
      queryFn: () => exportedOrdersServise.GetProductsFromOrder(productIds),
      select: (data) => {
        return Object.fromEntries(
          data.data.data.map((item, index) => {
            return [item._id, item];
          })
        );
      },
      enabled: Boolean(productIds.length),
    }
  );

  return (
    <>
      <img src={ img} alt="" />
      <PageTitle title={title} />
      <Table
        expandable={{
          expandedRowRender: (record) => {
            return (
              <>
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {`First name : ${record.getter.first_name}. Last name: ${record.getter.last_name}. Tel: ${record.getter.phone_number}. Email: ${record.getter.email}`}
                </p>
                {record.type === 0
                  ? record.dateDeliv
                  : `${record.address.city} ${record.address.shop}`}
                <div className="flex w-full">
                  {isProductsLoading ? (
                    <BaseLoader
                      circleHeight={100}
                      circlewidth={100}
                      height={284}
                      width={"100%"}
                    />
                  ) : (
                    record.products.map((item) => {
                      const product = products[item];
                      return (
                        <Link
                          key={item}
                          to={`/product/${product._id}`}
                          className="w-1/4"
                        >
                          <ImgXHR
                            src={product.product[0]}
                            height={190}
                            width={242}
                          />
                          <p className="h-14">{product.productName}</p>
                          <p>Price: {product.price}</p>
                        </Link>
                      );
                    })
                  )}
                </div>
              </>
            );
          },
          onExpand: (_, record) => {
            const set = new Set();
            record.products.forEach((product) => {
              set.add(product);
            });
            setProductsids(Array.from(set));
          },
        }}
        bordered
        sticky
        loading={isOrdersLoading}
        rowKey={"_id"}
        columns={columns}
        dataSource={orders?.items}
        pagination={false}
      ></Table>
      {isOrdersLoading ? (
        <BaseLoader height={32} circleHeight={20} circlewidth={20} />
      ) : (
        <Pagination
          pageSize={size}
          current={page}
          onChange={handler}
          total={orders?.length}
          itemRender={itemRender}
        />
      )}
    </>
  );
}

export default Orders;
