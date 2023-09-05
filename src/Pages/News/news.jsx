import { Pagination, Table } from "antd";
import PageTitle from "../../Components/PageTitle/PageTitle";
import useGetDatas from "../../Hooks/getDatas/useGetDatas";
import usePagination from "../../Hooks/usePagination/usePagination";
import BaseLoader from "../../Components/Loaders/BaseLoader";
import PrevNext from "../../Components/PrevNext/PrevNext";
import { useState } from "react";
import useGetDatasExper from "../../Hooks/getDatas copy/useGetDatasExper";
import DOMPurify from "dompurify";
import ImgXHR from "../../Components/Img/ImgXHR";
import { Link } from "react-router-dom";

const itemRender = (disabled, type, originalElement) => {
  if (type === "prev") {
    return <PrevNext type={type} disabled={disabled} />;
  }
  if (type === "next") {
    return <PrevNext type={type} disabled={disabled} />;
  }
  return originalElement;
};

function News({ title }) {
  const [page, size, handler] = usePagination();
  const [id, setid] = useState(undefined);

  const datas = useGetDatas(
    "/news",
    "GET",
    [],
    true,
    {
      p: page,
      pp: size,
      s: "-bigContent,-photo",
    },
    [size, page]
  );

  const { data, loading } = useGetDatasExper(
    "/news",
    "POST",
    [id],
    Boolean(id),
    {
      s: "bigContent,photo",
    }
  );

  return (
    <>
      <PageTitle title={title} />
      <Table
        rowClassName="text-lg"
        expandable={{
          expandedRowRender: (record) => {
            const element = loading || data[record._id];
            return (
              <>
                {loading ? (
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
          },
          onExpand: (_, record) => {
            setid(record._id);
          },
        }}
        bordered
        sticky
        loading={datas.loading}
        rowKey={"_id"}
        columns={[
          {
            title: "No",
            dataIndex: "key",
            render: (_, _a, index) => {
              return index + 1 + size * (page - 1);
            },
            width: 60,
          },
          {
            title: "Id",
            dataIndex: "_id",
            key: "_id",
            render: (id) => <Link to={`/new/${id}`}>{id}</Link>,
          },
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
          },
        ]}
        dataSource={datas.data}
        pagination={false}
      ></Table>
      {datas.loading ? (
        <BaseLoader height={32} circleHeight={20} circlewidth={20} />
      ) : (
        <Pagination
          pageSize={size}
          current={page}
          onChange={handler}
          total={datas.length}
          itemRender={itemRender}
        />
      )}
    </>
  );
}

export default News;
