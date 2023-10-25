import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import BaseLoader from "../../../Components/Loaders/BaseLoader";
import moment from "moment";
import instance from "../../../Config/api";
import { useLayoutEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import withZero from "../../../Utils/withZero";
import { useMutation, useQuery } from "@tanstack/react-query";
import { exportedOrdersServise } from "../services/orders";
import { useForm } from "antd/es/form/Form";
import statusCheck from "../../../Utils/statuscheck";

function Getter() {
  return (
    <>
      <Form.Item
        label="First name:"
        name="getter.first_name"
        rules={[
          {
            required: true,
            message: "Please input client first name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last name:"
        name="getter.last_name"
        rules={[
          {
            required: true,
            message: "Please input client last name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tel:"
        name="getter.phone_number"
        rules={[
          {
            required: true,
            message: "Please input client tel!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email:"
        name="getter.email"
        rules={[
          {
            required: true,
            message: "Please input client email!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}

function Order({ title }) {
  const [form] = useForm();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const { id } = useParams();

  const { data: order, isLoading: order_loading } = useQuery(["order"], {
    queryFn: () => exportedOrdersServise.GetOneOrder(id),
    enabled: Boolean(id !== ":id" && id),
    select: (data) => data.data.data[0],
  });
  const { data: dateDeliv, isLoading: dateDeliv_loading } = useQuery(
    ["order_dateDeliv"],
    {
      queryFn: exportedOrdersServise.GetDaysToDeliv,
      enabled: Boolean(order_loading === false && order.dateDeliv),
      select: (data) => data.data.data.items,
    }
  );
  const { data: city, isLoading: city_loading } = useQuery(["order_city"], {
    queryFn: exportedOrdersServise.GetCities,
    enabled: Boolean(order_loading === false && order.city),
    select: (data) => data.data.data.items,
  });
  const { data: typePay, isLoading: typePay_loading } = useQuery(
    ["order_typePay"],
    {
      queryFn: exportedOrdersServise.GetTypePays,
      enabled: Boolean(order_loading === false && order.typePay),
      select: (data) => data.data.data.items,
    }
  );
  // const { data: user, isLoading: user_loading } = useQuery(
  //   ["order_user"],
  //   {
  //     queryFn: () =>
  //     exportedOrdersServise.GetOrderInfoById("/users", order.userId),
  //     enabled: Boolean(order_loading === false && order.userId),
  //     select: (data) => data.data.data[0],
  //   }
  // );

  const { mutate } = useMutation({
    mutationFn: exportedOrdersServise.PutOrder,
  });

  useLayoutEffect(() => {
    if (order) {
      form.setFieldsValue(order);
      form.setFieldValue("date", moment(order.date));
      const names = Object.getOwnPropertyNames(order.getter);
      names.forEach((item) =>
        form.setFieldValue(`getter.${item}`, order.getter[item])
      );
    }
  }, [order]);

  useLayoutEffect(() => {
    const handler = () => {
      setClicked((prevstate) => !prevstate);
    };
    document.addEventListener("dblclick", handler);
    return () => document.removeEventListener("dblclick", handler);
  }, []);

  const onFinish = (values) => {
    if (values.date.$d) {
      values.date = moment(values.date.$d).unix() * 1000;
    } else {
      values.date = order.date;
    }
    mutate({ id, values });
  };

  return (
    <>
      <PageTitle title={title} />
      {order_loading ? (
        <BaseLoader height="900px" />
      ) : (
        <>
          <Form
            onFinish={onFinish}
            form={form}
            disabled={!clicked}
            labelAlign="left"
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 5,
            }}
          >
            <Getter />
            <Form.Item
              label="Date:"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please input order date!",
                },
              ]}
            >
              <DatePicker
                format={"MMMM Do YYYY, h:mm:ss a"}
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Date to deliv:"
              name="dateDeliv"
              rules={[
                {
                  required: true,
                  message: "Please input date deliv!",
                },
              ]}
            >
              {dateDeliv_loading ? (
                <BaseLoader height="2rem" />
              ) : (
                <Select
                  options={dateDeliv.map((item) => ({
                    ...item,
                    value: item._id,
                    label: moment(item.date * 1000).format("MMMM Do YYYY"),
                  }))}
                />
              )}
            </Form.Item>
            <Form.Item
              label="Time"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Please input delivery time!",
                },
              ]}
            >
              {dateDeliv_loading ? (
                <BaseLoader height="2rem" />
              ) : (
                <Select
                  options={dateDeliv
                    .find(
                      (item) => item._id === form.getFieldValue("dateDeliv")
                    )
                    .times.map((item) => ({
                      ...item,
                      value: item._id,
                      label: (
                        <>
                          {withZero(item.time[0])}
                          &nbsp;-&nbsp;
                          {withZero(item.time[1])}
                          &nbsp;
                          {item.isFree ? "(бесплатно)" : ""}
                        </>
                      ),
                    }))}
                />
              )}
            </Form.Item>
            <Form.Item
              label="City:"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input client city!",
                },
              ]}
            >
              {city_loading ? (
                <BaseLoader height="2rem" />
              ) : (
                <Select
                  options={city.map((item) => ({
                    ...item,
                    value: item._id,
                    label: item.name,
                  }))}
                />
              )}
            </Form.Item>
            <Form.Item
              label="Street"
              name="street"
              rules={[
                {
                  required: true,
                  message: "Please input client street!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Home"
              name="home"
              rules={[
                {
                  required: true,
                  message: "Please input client home!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input order price!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Order status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please input order status!",
                },
              ]}
            >
              <Select
                options={new Array(3).fill(null).map((_, index) => {
                  return {
                    value: index,
                    label: statusCheck(index),
                  };
                })}
              />
            </Form.Item>
            <Form.Item
              label="Type pay"
              name="typePay"
              rules={[
                {
                  required: true,
                  message: "Please input client type pay!",
                },
              ]}
            >
              {typePay_loading ? (
                <BaseLoader height="2rem" />
              ) : (
                <Select
                  options={typePay.map((item) => ({
                    ...item,
                    value: item._id,
                    label: item.name,
                  }))}
                />
              )}
            </Form.Item>
            <Form.Item label="User: ">
              <Link to={`/user/${order.userId}`}>{order.userId}</Link>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 4 }}>
              {clicked ? (
                <Button type="primary" htmlType="submit" className="bg-default">
                  Submit
                </Button>
              ) : (
                <Button
                  type="primary"
                  danger={true}
                  disabled={false}
                  className="mr-2"
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
                </Button>
              )}
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
}

export default Order;
