import { Link, useNavigate, useParams } from "react-router-dom";
import useGetDatasExper from "../../../Hooks/getDatas copy/useGetDatasExper";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import BaseLoader from "../../../Components/Loaders/BaseLoader";
import moment from "moment";
import instance from "../../../Config/api";
import { useState } from "react";
import { DatePicker, Input, Select } from "antd";
import withZero from "../../../Utils/withZero";
import useGetDatas from "../../../Hooks/getDatas/useGetDatas";

function Getter({ getter, clicked }) {
  return (
    <div>
      <p className="flex">
        <span className="min-w-[100px]">First name :</span>
        <Input disabled={!clicked} value={getter.first_name} className="max-w-[150px]"/>
      </p>
      <p className="flex">
        <span className="min-w-[100px]">Last name:</span>
        <Input disabled={!clicked} value={getter.last_name} className="max-w-[150px]"/>
      </p>
      <p className="flex">
        <span className="min-w-[100px]">Tel:</span>
        <Input disabled={!clicked} value={getter.phone_number} className="max-w-[150px]"/>
      </p>
      <p className="flex">
        <span className="min-w-[100px]">Email:</span> <Input disabled={!clicked} value={getter.email} className="max-w-[150px]"/>
      </p>
    </div>
  );
}

function Order({ title }) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const { id } = useParams();
  const { data, loading } = useGetDatasExper(
    "/orders",
    "POST",
    [id],
    id !== ":id" && id,
    {},
    [id]
  );
  const order = data[id];
  const dateDeliv = useGetDatasExper(
    "/days-to-deliv",
    "POST",
    [order?.dateDeliv],
    Boolean(order?.dateDeliv) && loading === false
  );
  const city = useGetDatas("/cities", "GET", [], loading === false);
  const typePay = useGetDatasExper(
    "/type-pays",
    "POST",
    [order?.typePay],
    Boolean(order?.typePay) && loading === false
  );

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <PageTitle title={title} />
      {loading ? (
        <BaseLoader height="900px" />
      ) : (
        <div>
          <div className="text-lg">
            <Getter getter={order.getter} />
            Date:&nbsp;
            <DatePicker
              disabled={!clicked}
              onChange={onChange}
              value={moment(Number(order.date))}
              format={"MMMM Do YYYY, h:mm:ss a"}
            />
            {dateDeliv.loading ? (
              <BaseLoader height="1rem" />
            ) : (
              <div>
                Days to deliv:&nbsp;
                <DatePicker
                  disabled={!clicked}
                  onChange={onChange}
                  value={moment(dateDeliv.data[order.dateDeliv].date * 1000)}
                  format={"MMMM Do YYYY"}
                />
                <ul className="pl-[5rem]">
                  {dateDeliv.data[order.dateDeliv].times.map(
                    (element, index) => {
                      return (
                        <li
                          key={index}
                          className={`list-inside list-disc ${
                            order.time === element._id ? "bg-lime-500" : ""
                          }`}
                        >
                          {withZero(element.time[0])}
                          &nbsp;-&nbsp;
                          {withZero(element.time[1])}
                          &nbsp;
                          {element.isFree ? "(бесплатно)" : ""}
                          {order.time === element._id && "Selected"}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            )}
            {city.loading ? (
              <BaseLoader height="1rem" />
            ) : (
              <div>
                Address:
                <Select
                  disabled={!clicked}
                  defaultValue={order.city}
                  options={city.data.map((item) => ({
                    ...item,
                    value: item._id,
                    label: item.name,
                  }))}
                />
                , {order.street || "Street not inputed"},&nbsp;
                {order.home || "Home not inputed"}
              </div>
            )}
            Price: {order.price}
            <br />
            Status: {order.status}
            <br />
            <Link to={`/user/${order.userId}`}>User: {order.userId}</Link>
            <br />
            {typePay.loading ? (
              <BaseLoader height="1rem" />
            ) : (
              `Type pay: ${typePay.data[order.typePay].name}`
            )}
            <br />
            <button
              className="bg-red-600 rounded-md p-2 text-white"
              onClick={async () => {
                const res = await instance({
                  url: `/orders/${id}`,
                  method: "DELETE",
                });
                if (res.data.success === 1) {
                  navigate("/");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Order;
