import { Pagination, Switch, Table } from "antd";
import PageTitle from "../../Components/PageTitle/PageTitle";
import useGetDatas from "../../Hooks/getDatas/useGetDatas";
import usePagination from "../../Hooks/usePagination/usePagination";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import BaseLoader from "../../Components/Loaders/BaseLoader";
import PrevNext from "../../Components/PrevNext/PrevNext";

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

const itemRender = (disabled, type, originalElement) => {
  if (type === "prev") {
    return <PrevNext type={type} disabled={disabled}/>;
  }
  if (type === "next") {
    return <PrevNext type={type} disabled={disabled}/>;
  }
  return originalElement;
};

function Products() {
  const [page, size, handler] = usePagination(1, 30);
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
      render: (id) => <Link to={`/product/${id}`}>{id}</Link>,
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

  const { data: products, loading, length } = useGetDatas(
    "/products",
    "GET",
    [],
    true,
    {
      p: page,
      pp: size,
    }
  );

  return (
    <>
      <PageTitle title={"Products"} />
      <Table
        expandable={{
          expandedRowRender: (record) => {
            return (
              <>
                <Table
                  bordered
                  columns={specColumns}
                  dataSource={[record.specification]}
                  pagination={false}
                ></Table>
                <p className="text-2xl">{record.description.title}</p>
                <p className="text-lg" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(record.description.content)}}/>
              </>
            );
          },
        }}
        bordered
        sticky
        loading={loading}
        rowKey={"_id"}
        columns={columns}
        dataSource={products}
        pagination={false}
      ></Table>
      {loading ? (
        <BaseLoader height={32} circleHeight={20} circlewidth={20} />
      ) : (
        <Pagination
          pageSize={size}
          current={page}
          onChange={handler}
          total={length}
          itemRender={itemRender}
        />
      )}
    </>
  );
}

export default Products;
