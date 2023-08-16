import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { storeUser } from "../../Store";
import { UserLogin } from "../../Store/user";

function Login() {
  const [form] = useForm();

  const [disable, setDisable] = useState(false);

  const onFinish = async (values) => {
    await storeUser.dispatch(UserLogin(values));
    setDisable(
      Boolean(
        form.getFieldsError().filter((item) => item.errors.length !== 0).length
      )
    );
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-1/6">
          <p className="text-center text-2xl m-8">Welcome Back</p>
          <Form
            onFieldsChange={() => setDisable(false)}
            form={form}
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                className="h-10 shadow-lg"
                placeholder="Input your password!"
              />
            </Form.Item>

            <Form.Item className="mb-2" wrapperCol={{ offset: 4, span: 16 }}>
              <Button
                type="primary"
                className="bg-default w-full h-10"
                disabled={disable}
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
