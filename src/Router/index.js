import Login from "../Pages/Login/Login";
import React from "react";
import CRUD from "../Components/CRUD/CRUD";
import { Table } from "antd";
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
import withZero from "../Utils/withZero";
import Products from "../Pages/Products/products";

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
              {withZero(element.time[0])}
              &nbsp;-&nbsp;
              {withZero(element.time[1])}
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
    element: <Products/>,
    title: "Products",
  },
  {
    path: "/products/create",
    element: <></>,
    title: "Product",
    noneMenu: true
  },
  {
    path: "/type-pays",
    element: <CRUD path="/type-pays" columns={typePays} pathOne="type-pay" />,
    title: "Type pays",
  },
  {
    path: "/days-to-deliv",
    element: <CRUD path="/days-to-deliv" columns={dtd} pathOne="day-to-deliv" />,
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
