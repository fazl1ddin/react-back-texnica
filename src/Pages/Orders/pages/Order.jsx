import { Link, useNavigate, useParams } from "react-router-dom";
import useGetDatasExper from "../../../Hooks/getDatas copy/useGetDatasExper";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import BaseLoader from "../../../Components/Loaders/BaseLoader";
import moment from "moment";
import { useState } from "react";
import instance from "../../../Config/api";

function Order({ title }) {
  const navigate = useNavigate();
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
  const city = useGetDatasExper(
    "/cities",
    "POST",
    [order?.city],
    Boolean(order?.city) && loading === false
  );
  const typePay = useGetDatasExper(
    "/type-pays",
    "POST",
    [order?.typePay],
    Boolean(order?.typePay) && loading === false
  );

  return (
    <>
      <PageTitle title={title} />
      {loading ? (
        <BaseLoader height="900px" />
      ) : (
        <div>
          <div className="text-lg">
            {`First name : ${order.getter.first_name}. Last name: ${order.getter.last_name}. Tel: ${order.getter.phone_number}. Email: ${order.getter.email}`}
            <br />
            Date: {moment(Number(order.date)).format("MMMM Do YYYY, h:mm:ss a")}
            <br />
            {dateDeliv.loading ? (
              <BaseLoader height="1rem" />
            ) : (
              <div>
                Days to deliv:{" "}
                {moment(dateDeliv.data[order.dateDeliv].date * 1000).format(
                  "MMMM Do YYYY"
                )}
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
                          {element.time[0] >= 10
                            ? element.time[0]
                            : "0" + element.time[0]}
                          &nbsp;-&nbsp;
                          {element.time[1] >= 10
                            ? element.time[1]
                            : "0" + element.time[1]}
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
              `Address: ${city.data[order.city]?.name} ${order.street} ${
                order.home
              }`
            )}
            <br />
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
