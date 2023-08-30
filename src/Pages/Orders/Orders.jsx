import { Pagination, Table } from "antd";
import PageTitle from "../../Components/PageTitle/PageTitle";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import ImgXHR from "../../Components/Img/ImgXHR";
import useGetDatas from "../../Hooks/getDatas/useGetDatas";
import { useState } from "react";
import BaseLoader from "../../Components/Loaders/BaseLoader";
import usePagination from "../../Hooks/usePagination/usePagination";
import useGetDatasExper from "../../Hooks/getDatas copy/useGetDatasExper";

const itemRender = (_, type, originalElement) => {
  if (type === "prev") {
    return <a>Previous</a>;
  }
  if (type === "next") {
    return <a>Next</a>;
  }
  return originalElement;
};

function Orders({ title, statistics, stLoading }) {
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
  const [pids, setPids] = useState([]);
  const { data: orders, loading } = useGetDatas(
    "/orders",
    "GET",
    [],
    Boolean(size && page),
    {
      p: page,
      pp: size,
    },
    [page, size]
  );
  const { data: products, loading: ploading } = useGetDatasExper(
    "/products",
    "POST",
    pids,
    orders.length && loading === false && pids.length,
    {
      s: "product,productName,price",
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
                  {ploading ? (
                      <BaseLoader
                        circleHeight={100}
                        circlewidth={100}
                        height={284}
                        width={"100%"}
                      />
                    ) : record.products.map((item) => {
                    const product = products[item]
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
                  })}
                </div>
              </>
            );
          },
          onExpand: (_, record) => {
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
      {stLoading ? (
        <BaseLoader height={32} circleHeight={20} circlewidth={20} />
      ) : (
        <Pagination
          pageSize={size}
          current={page}
          onChange={handler}
          total={statistics?.Orders}
          itemRender={itemRender}
        />
      )}
    </>
  );
}

export default Orders;
