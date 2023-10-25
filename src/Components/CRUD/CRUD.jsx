import { Pagination, Table } from "antd";
import PageTitle from "../PageTitle/PageTitle";
import useGetDatas from "../../Hooks/getDatas/useGetDatas";
import usePagination from "../../Hooks/usePagination/usePagination";
import BaseLoader from "../Loaders/BaseLoader";
import PrevNext from "../PrevNext/PrevNext";

const itemRender = (disabled, type, originalElement) => {
  if (type === "prev") {
    return <PrevNext type={type} disabled={disabled} />;
  }
  if (type === "next") {
    return <PrevNext type={type} disabled={disabled} />;
  }
  return originalElement;
};

/*let ok;*/

function CRUD(props) {
  /*console.log(props);
  ok = ok || props.hook*/
  const [page, size, handler] = usePagination(1, props.size || 10);

  const datas = useGetDatas(
    props.path,
    "GET",
    [],
    true,
    {
      p: page,
      pp: size,
      s: props.s
    },
    [size, page]
  );

  /*const dataHook = ok?.(datas);*/

  return (
    <>
      <PageTitle title={props.title} />
      <Table
        rowClassName="text-sm"
        expandable={{
            expandedRowRender: props.expanR && props.expanR(/*dataHook*/),
            onExpand: props.onE && props.onE(/*dataHook*/),
        }}
        bordered
        sticky
        loading={datas.loading}
        rowKey={"_id"}
        columns={props.columns({ ...props, size, page, /*dataHook*/ }).filter(item => item)}
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

export default CRUD;
