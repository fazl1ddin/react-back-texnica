import { Table } from "antd";
import PageTitle from "../../Components/PageTitle/PageTitle";
import moment from "moment/moment";
import { Link } from "react-router-dom"
import ImgXHR from "../../Components/Img/ImgXHR";
import useGetDatas from "../../Hooks/getData/getDatas";
import BaseLoader from "../../Components/Loaders/BaseLoader";

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

const dataSource = [
  {
    _id: "64da73bd883f1f8e7ea1f0cb",
    dateDeliv: "64ae7e59a72503550fb4550d",
    time: "64ae7e59a72503550fb4550e",
    street: "",
    home: "",
    comment: "",
    typePay: "64afdb04e5fdf07414ef29a8",
    getter: {
      first_name: "1124",
      last_name: "412",
      phone_number: "142",
      email: "412",
    },
    status: 0,
    city: "64a9591d49924fabc735110c",
    userId: "6389d5cfaf922f9cf7096940",
    price: 26410,
    products: [
      "64901fd45ebf2bf306c5ee3f",
      "64901fd45ebf2bf306c5ee40",
      "64901fd45ebf2bf306c5ee41",
      "64901fd45ebf2bf306c5ee42",
    ],
    date: "1692038069482",
    __v: 0,
  },
  {
    _id: "64da73be883f1f8e7ea1f0ce",
    dateDeliv: "64ae7e59a72503550fb4550d",
    time: "64ae7e59a72503550fb4550e",
    street: "",
    home: "",
    comment: "",
    typePay: "64afdb04e5fdf07414ef29a8",
    getter: {
      first_name: "1124",
      last_name: "412",
      phone_number: "142",
      email: "412",
    },
    status: 0,
    city: "64a9591d49924fabc735110c",
    userId: "6389d5cfaf922f9cf7096940",
    price: 26410,
    products: [
      "64901fd45ebf2bf306c5ee3f",
      "64901fd45ebf2bf306c5ee40",
      "64901fd45ebf2bf306c5ee41",
      "64901fd45ebf2bf306c5ee42",
    ],
    date: "1692038069482",
    __v: 0,
  },
  {
    _id: "64da73be883f1f8e7ea1f0d1",
    dateDeliv: "64ae7e59a72503550fb4550d",
    time: "64ae7e59a72503550fb4550e",
    street: "",
    home: "",
    comment: "",
    typePay: "64afdb04e5fdf07414ef29a8",
    getter: {
      first_name: "1124",
      last_name: "412",
      phone_number: "142",
      email: "412",
    },
    status: 0,
    city: "64a9591d49924fabc735110c",
    userId: "6389d5cfaf922f9cf7096940",
    price: 26410,
    products: [
      "64901fd45ebf2bf306c5ee3f",
      "64901fd45ebf2bf306c5ee40",
      "64901fd45ebf2bf306c5ee41",
      "64901fd45ebf2bf306c5ee42",
    ],
    date: "1692038069482",
    __v: 0,
  },
  {
    _id: "64da73bf883f1f8e7ea1f0d4",
    dateDeliv: "64ae7e59a72503550fb4550d",
    time: "64ae7e59a72503550fb4550e",
    street: "",
    home: "",
    comment: "",
    typePay: "64afdb04e5fdf07414ef29a8",
    getter: {
      first_name: "1124",
      last_name: "412",
      phone_number: "142",
      email: "412",
    },
    status: 0,
    city: "64a9591d49924fabc735110c",
    userId: "6389d5cfaf922f9cf7096940",
    price: 26410,
    products: [
      "64901fd45ebf2bf306c5ee3f",
      "64901fd45ebf2bf306c5ee40",
      "64901fd45ebf2bf306c5ee41",
      "64901fd45ebf2bf306c5ee42",
    ],
    date: "1692038069482",
    __v: 0,
  },
  {
    _id: "64da73bf883f1f8e7ea1f0d7",
    dateDeliv: "64ae7e59a72503550fb4550d",
    time: "64ae7e59a72503550fb4550e",
    street: "",
    home: "",
    comment: "",
    typePay: "64afdb04e5fdf07414ef29a8",
    getter: {
      first_name: "1124",
      last_name: "412",
      phone_number: "142",
      email: "412",
    },
    status: 0,
    city: "64a9591d49924fabc735110c",
    userId: "6389d5cfaf922f9cf7096940",
    price: 26410,
    products: [
      "64901fd45ebf2bf306c5ee3f",
      "64901fd45ebf2bf306c5ee40",
      "64901fd45ebf2bf306c5ee41",
      "64901fd45ebf2bf306c5ee42",
    ],
    date: "1692038069482",
    __v: 0,
  },
  {
    _id: "64da73c1883f1f8e7ea1f0da",
    dateDeliv: "64ae7e59a72503550fb4550d",
    time: "64ae7e59a72503550fb4550e",
    street: "",
    home: "",
    comment: "",
    typePay: "64afdb04e5fdf07414ef29a8",
    getter: {
      first_name: "1124",
      last_name: "412",
      phone_number: "142",
      email: "412",
    },
    status: 0,
    city: "64a9591d49924fabc735110c",
    userId: "6389d5cfaf922f9cf7096940",
    price: 26410,
    products: [
      "64901fd45ebf2bf306c5ee3f",
      "64901fd45ebf2bf306c5ee40",
      "64901fd45ebf2bf306c5ee41",
      "64901fd45ebf2bf306c5ee42",
    ],
    date: "1692038069482",
    __v: 0,
  },
];

function Orders({ title }) {
  const {data: orders, loading} = useGetDatas('/all-orders')

  return <>
      <PageTitle title={title} />
      <Table
        expandable={{
          expandedRowRender: (record) => (
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
              <div className="flex">
                {record.products.map((item) => (
                  <Link to={`/product/${item}`}>
                    <ImgXHR />
                  </Link>
                ))}
              </div>
            </>
          ),
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
}

export default Orders;
