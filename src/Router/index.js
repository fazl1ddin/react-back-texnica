import Login from "../Pages/Login/Login";
import React from "react";
import CRUD from "../Components/CRUD/CRUD";
import { Switch, Table } from "antd";
import { Link } from "react-router-dom";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import tpch from "../Utils/typepaycheck";
import moment from "moment";
import ImgXHR from "../Components/Img/ImgXHR";
import DOMPurify from "dompurify";
import Orders from "../Pages/Orders/Orders";
import News from "../Pages/News/news";
import AddressShops from "../Pages/Address-Shops/addressShops";
import Order from "../Pages/Orders/pages/Order";

export const public_routes = [
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: <Login />,
  },
];

// function orders(datas) {
//   return [
//     datas.expandable ? Table.EXPAND_COLUMN : undefined,
//     {
//       title: "No",
//       dataIndex: "key",
//       render: (_, _a, index) => index + 1 + datas.size * (datas.page - 1),
//       width: 60,
//     },
//     {
//       title: "Id",
//       dataIndex: "_id",
//       key: "_id",
//       render: (id) => <Link to={`/order/${id}`}>{id}</Link>,
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       render: (date) => moment(Number(date)).format("MMMM Do YYYY, h:mm:ss a"),
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//       key: "type",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//     },
//     {
//       title: "Type pay",
//       dataIndex: "typePay",
//       key: "typePay",
//     },
//     {
//       title: "User Id",
//       dataIndex: "userId",
//       key: "userId",
//       render: (user) => <Link to={`/user/${user}`}>{user}</Link>,
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//     },
//   ];
// }

function typePays(datas) {
  return [
    datas.expandable ? Table.EXPAND_COLUMN : undefined,
    {
      title: "No",
      dataIndex: "key",
      render: (_, _a, index) => {
        return index + 1 + datas.size * (datas.page - 1);
      },
      width: 60,
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <Link to={`/type-pay/${id}`}>{id}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "typ",
      key: "typ",
      render: (type) => tpch(type),
    },
  ];
}

function dtd(datas) {
  return [
    datas.expandable ? Table.EXPAND_COLUMN : undefined,
    {
      title: "No",
      dataIndex: "key",
      render: (_, _a, index) => {
        return index + 1 + datas.size * (datas.page - 1);
      },
      width: 60,
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <Link to={`/${datas.pathOne}/${id}`}>{id}</Link>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date * 1000).format("MMMM Do YYYY"),
    },
    {
      title: "Times",
      dataIndex: "times",
      key: "times",
      render: (times) => {
        let res = [];
        times?.forEach((element) => {
          res.push(
            <p>
              {element.time[0] >= 10 ? element.time[0] : "0" + element.time[0]}
              &nbsp;-&nbsp;
              {element.time[1] >= 10 ? element.time[1] : "0" + element.time[1]}
              &nbsp;
              {element.isFree ? "(бесплатно)" : ""}
            </p>
          );
        });
        return res;
      },
    },
  ];
}

function citiesColumns(datas) {
  return [
    datas.expandable ? Table.EXPAND_COLUMN : undefined,
    {
      title: "No",
      dataIndex: "key",
      render: (_, _a, index) => {
        return index + 1 + datas.size * (datas.page - 1);
      },
      width: 60,
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <Link to={`/${datas.pathOne}/${id}`}>{id}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];
}

function productsColumns(datas) {
  return [
    datas.expandable ? Table.EXPAND_COLUMN : undefined,
    {
      title: "No",
      dataIndex: "key",
      render: (_, _a, index) => index + 1 + datas.size * (datas.page - 1),
      width: 60,
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <Link to={`/${datas.pathOne}/${id}`}>{id}</Link>,
    },
    {
      title: "Protection",
      dataIndex: "protection",
      key: "protection",
      render: (bool) => <Switch checked={bool} />,
    },
    {
      title: "Hit",
      dataIndex: "hit",
      key: "hit",
      render: (bool) => <Switch checked={bool} />,
    },
    {
      title: "News",
      dataIndex: "news",
      key: "news",
      render: (bool) => <Switch checked={bool} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => new Intl.NumberFormat("ru").format(price),
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
      render: (sale) => sale + "%",
    },
    {
      title: "End price",
      dataIndex: undefined,
      key: "end_sale",
      render: (_, product) =>
        new Intl.NumberFormat("ru").format(
          product.price - (product.price * product.sale) / 100
        ),
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Rates",
      dataIndex: "rates",
      key: "rates",
      width: 68,
    },
  ];
}

const specColumns = [
  {
    title: "Speed",
    dataIndex: "speed",
  },
  {
    title: "ProductName",
    dataIndex: "productName",
  },
  {
    title: "TypeP",
    dataIndex: "typeP",
  },
  {
    title: "Power",
    dataIndex: "power",
  },
  {
    title: "Charge",
    dataIndex: "charge",
  },
  {
    title: "FrontBrake",
    dataIndex: "frontBrake",
  },
  {
    title: "Cruise",
    dataIndex: "cruise",
  },
  {
    title: "Power1",
    dataIndex: "power1",
  },
  {
    title: "Power2",
    dataIndex: "power2",
  },
  {
    title: "Charge1",
    dataIndex: "charge1",
  },
  {
    title: "FrontBrake1",
    dataIndex: "frontBrake1",
  },
  {
    title: "Cruise1",
    dataIndex: "cruise1",
  },
  {
    title: "Power3",
    dataIndex: "power3",
  },
  {
    title: "Charge2",
    dataIndex: "charge2",
  },
  {
    title: "FrontBrake2",
    dataIndex: "frontBrake2",
  },
  {
    title: "Cruise2",
    dataIndex: "cruise2",
  },
  {
    title: "FrontBrake3",
    dataIndex: "frontBrake3",
  },
];

function promosColumns(datas) {
  return [
    datas.expandable ? Table.EXPAND_COLUMN : undefined,
    {
      title: "No",
      dataIndex: "key",
      render: (_, _a, index) => {
        return index + 1 + datas.size * (datas.page - 1);
      },
      width: 60,
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <Link to={`/${datas.pathOne}/${id}`}>{id}</Link>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
  ];
}

// function newsColumns(datas) {
//   return [
//     datas.expandable ? Table.EXPAND_COLUMN : undefined,
//     {
//       title: "No",
//       dataIndex: "key",
//       render: (_, _a, index) => {
//         return index + 1 + datas.size * (datas.page - 1);
//       },
//       width: 60,
//     },
//     {
//       title: "Id",
//       dataIndex: "_id",
//       key: "_id",
//       render: (id) => <Link to={`/promo/${id}`}>{id}</Link>,
//     },
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
//   ];
// }

/*function ashColumns(datas) {
  return [
    datas.expandable ? Table.EXPAND_COLUMN : undefined,
    {
      title: "No",
      dataIndex: "key",
      render: (_, _a, index) => {
        return index + 1 + datas.size * (datas.page - 1);
      },
      width: 60,
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <Link to={`/promo/${id}`}>{id}</Link>,
    },
    {
      title: "Street",
      dataIndex: "street",
      key: "street",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: function (id) {
        if (datas.dataHook.loading === false) {
          return <p>{datas.dataHook.data[id].name}</p>;
        } else {
          return <BaseLoader />;
        }
      },
    },
  ];
}*/

export const private_routes = [
  /*{
    path: "/",
    element: React.cloneElement(<CRUD/>, {
        path: "/orders",
        hook: function (datas) {
          const [pids, setPids] = useState([]);
          const { data: products, loading: ploading } = useGetDatasExper(
            "/products",
            "POST",
            pids,
            datas.data.length && datas.loading === false && pids.length,
            {
              s: "product,productName,price",
            }
          );
          return { pids, setPids, products, ploading };
        },
        columns: orders,
        expanR: function (dataHook) {
          return ordersERender(dataHook?.ploading, dataHook?.products);
        },
        onE: onExp,
      }),
    title: "Orders"
  },
  {
    path: "/",
    element: (
      <CRUD
        path="/orders"
        hook={function (datas) {
          const [pids, setPids] = useState([]);
          const { data: products, loading: ploading } = useGetDatasExper(
            "/products",
            "POST",
            pids,
            datas.data.length && datas.loading === false && pids.length,
            {
              s: "product,productName,price",
            }
          );
          return { pids, setPids, products, ploading };
        }}
        columns={orders}
        expanR={function (dataHook) {
          return ordersERender(dataHook?.ploading, dataHook?.products);
        }}
        onE={onExp}
      />
    ),
    title: "Orders",
  },*/
  {
    path: "/",
    element: <Orders />,
    title: "Orders",
  },
  {
    path: "/order/:id",
    element: <Order />,
    title: "Order",
    noneMenu: true
  },
  {
    path: "/products",
    element: (
      <CRUD
        pathOne="product"
        size={30}
        path="/products"
        columns={productsColumns}
        expanR={() => (record) => {
          return (
            <>
              <Table
                bordered
                columns={specColumns}
                dataSource={[record.specification]}
                pagination={false}
              ></Table>
              <p className="text-2xl">{record.description.title}</p>
              <p
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(record.description.content),
                }}
              />
            </>
          );
        }}
      />
    ),
    title: "Products",
  },
  {
    path: "/type-pays",
    element: <CRUD path="/type-pays" columns={typePays} pathOne="type-pay"/>,
    title: "Type pays",
  },
  {
    path: "/days-to-deliv",
    element: <CRUD path="/days-to-deliv" columns={dtd}  pathOne="day-to-deliv"/>,
    title: "Days to deliv",
  },
  {
    path: "/cities",
    element: <CRUD path="/cities" pathOne="city" columns={citiesColumns} />,
    title: "Cities",
  },
  {
    path: "/promos",
    element: (
      <CRUD
        path="/promos"
        columns={promosColumns}
        expanR={() => (record) => {
          return (
            <>
              <ImgXHR src={record.src} />
              <p className="text-lg">{record.title}</p>
              <p
                className="text-base"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(record.content),
                }}
              />
              <ul>
                {record.terms.map((item, index) => (
                  <li className="list-decimal list-inside" key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          );
        }}
        pathOne="promo"
      />
    ),
    title: "Promos",
  },
  /*{
    path: "/news",
    element: (
      <CRUD
        path="/news"
        s="-bigContent,-photo"
        columns={newsColumns}
        hook={function () {
          const [id, setid] = useState(undefined);
          const { data, loading } = useGetDatasExper(
            "/news",
            "POST",
            [id],
            Boolean(id),
            {
              s: "bigContent,photo",
            }
          );
          return { data, loading, setid };
        }}
        expanR={function (datas) {
          return (record) => {
            const element = datas.loading || datas.data[record._id];
            return (
              <>
                {datas.loading ? (
                  <>afagaasga</>
                ) : (
                  <>
                    <ImgXHR src={element.photo} />
                    <p className="text-lg">{element.bigContent.ftitle}</p>
                    <p
                      className="text-base"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(element.bigContent.fcontent),
                      }}
                    />
                    <p className="text-lg">{element.bigContent.stitle}</p>
                    <p
                      className="text-base"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(element.bigContent.scontent),
                      }}
                    />
                  </>
                )}
              </>
            );
          };
        }}
        onE={(datas) => (_, record) => {
          datas.setid(record._id);
        }}
      />
    ),
    title: "News",
  },*/
  {
    path: "/news",
    element: <News />,
    title: "News"
  },
  {
    path: "/address-shops",
    element: <AddressShops />,
    title: "Address Shops"
  }
  /*{
    path: "/address-shops",
    element: (
      <CRUD
        path="/address-shops"
        columns={ashColumns}
        hook={function (datas) {
          const { data, loading } = useGetDatasExper(
            "/cities",
            "POST",
            datas.data.map((item) => item.city),
            datas.data.length && datas.loading === false
          );
          return { data, loading };
        }}
      />
    ),
    title: "Address Shops",
  },*/
];
