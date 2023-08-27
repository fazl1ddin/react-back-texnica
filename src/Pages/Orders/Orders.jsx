import { Table } from "antd";
import PageTitle from "../../Components/PageTitle/PageTitle";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import ImgXHR from "../../Components/Img/ImgXHR";
import useGetDatas from "../../Hooks/getData/getDatas";
import useGetProducts from "../../Hooks/getData/getProducts";
import { useState } from "react";

const columns = [
  Table.EXPAND_COLUMN,
  {
    title: "No",
    dataIndex: "key",
    render: (_, _a, index) => index + 1,
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

function Orders({ title }) {
  const [pids, setPids] = useState([]);
  const { data: orders, loading } = useGetDatas("/orders");
  const { data: products, loading: ploading } = useGetProducts(
    "/products",
    pids,
    orders.length && loading === false && pids.length,
    {
      s: "product",
    }
  );

  return (
    <>
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
                  {record.products.map((item) => {
                    return ploading ? (
                      <>aafsaffas</>
                    ) : (
                      <Link
                        key={item}
                        to={`/product/${
                          products.find((product) => product._id === item)._id
                        }`}
                        className="w-1/4"
                      >
                        <ImgXHR
                          src={
                            products.find((product) => product._id === item)
                              .product[0]
                          }
                        />
                      </Link>
                    );
                  })}
                </div>
              </>
            );
          },
          onExpand: (open, record) => {
            const set = new Set();
            record.products.forEach((product) => {
              set.add(product);
            });
            setPids(Array.from(set));
          },
        }}
        bordered
        sticky
        loading={loading}
        rowKey={"_id"}
        columns={columns}
        dataSource={orders}
        pagination={false}
      ></Table>
    </>
  );
}

export default Orders;
