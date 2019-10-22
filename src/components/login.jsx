import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./style.css";
import "antd/dist/antd.css";
import firebase from "./firebase";
import { message } from "antd";

class Loginn extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        firebase
          .auth()
          .signInWithEmailAndPassword(values.username, values.password)
          .catch(error => {
            message.warn("Invalid username or password", 4);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <a
            className="login-form-forgot"
            onClick={() => message.success("Chandawat@123", 4)}
          >
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or{" "}
          <a
            onClick={() =>
              message.info("This feature is still in developmental stage", 4)
            }
          >
            register now!
          </a>
        </Form.Item>
      </Form>
    );
  }
}
const Login = Form.create({ name: "normal_login" })(Loginn);
export default Login;
