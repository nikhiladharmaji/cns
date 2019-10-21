import React, { Component } from "react";
import {
  Upload,
  Layout,
  Menu,
  Dropdown,
  Breadcrumb,
  Avatar,
  Icon,
  message,
  Card,
  Col,
  Row
} from "antd";
import { Typography } from "antd";

const { Dragger } = Upload;
const { Meta } = Card;
const { Title } = Typography;
const { Header, Content, Footer } = Layout;

class Main extends Component {
  state = {};
  render() {
    const props = {
      name: "file",
      multiple: true,
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    const menu = (
      <Menu>
        <Menu.Item key="0" disabled>
          Khush Chandawat
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">Logout</Menu.Item>
      </Menu>
    );
    return (
      <Layout className="layout">
        <Header style={{ padding: 15 }}>
          <Dropdown overlay={menu}>
            <Avatar icon="user" style={{ float: "right" }}>
              Khush
            </Avatar>
          </Dropdown>

          <Title style={{ color: "white" }} className="Nav-logo" level={3}>
            Crypto Bucket
          </Title>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>

            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 10 }}>
            Content
          </div>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
          <div style={{ background: "#fff", padding: 24, minHeight: 10 }}>
            Browse Files
          </div>
          <div style={{ background: "#ECECEC", padding: "30px" }}>
            <Row gutter={16}>
              <Col span={5}>
                <Card
                  style={{ width: 300, padding: 15 }}
                  cover={
                    <img
                      alt="example"
                      src="http://icons.iconarchive.com/icons/iconsmind/outline/512/File-JPG-icon.png"
                    />
                  }
                  actions={[
                    <Icon type="delete" key="setting" />,
                    <Icon type="edit" key="edit" />
                  ]}
                >
                  <Meta title="File Name" description="File type .jpeg" />
                </Card>
              </Col>

              <Col span={5}>
                <Card
                  style={{ width: 300, padding: 15 }}
                  cover={
                    <img
                      alt="example"
                      src="https://cdn0.iconfinder.com/data/icons/flat-file-format/100/png-512.png"
                    />
                  }
                  actions={[
                    <Icon type="delete" key="setting" />,
                    <Icon type="edit" key="edit" />
                  ]}
                >
                  <Meta title="File Name" description="File type .png" />
                </Card>
              </Col>

              <Col span={5}>
                <Card
                  style={{ width: 300, padding: 15 }}
                  cover={
                    <img
                      alt="example"
                      src="http://icons.iconarchive.com/icons/iconsmind/outline/512/File-JPG-icon.png"
                    />
                  }
                  actions={[
                    <Icon type="delete" key="setting" />,
                    <Icon type="edit" key="edit" />
                  ]}
                >
                  <Meta title="File Name" description="File type .jpeg" />
                </Card>
              </Col>

              <Col span={5}>
                <Card
                  style={{ width: 300, padding: 15 }}
                  cover={
                    <img
                      alt="example"
                      src="https://www.shareicon.net/data/512x512/2015/08/16/86085_adobe_512x512.png"
                    />
                  }
                  actions={[
                    <Icon type="delete" key="setting" />,
                    <Icon type="edit" key="edit" />
                  ]}
                >
                  <Meta title="File Name" description="File type .psd" />
                </Card>
              </Col>

              <Col span={4}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src="https://cdn4.iconfinder.com/data/icons/files-47/64/xls-512.png"
                    />
                  }
                  actions={[
                    <Icon type="delete" key="setting" />,
                    <Icon type="edit" key="edit" />
                  ]}
                >
                  <Meta title="File Name" description="File type .xls" />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Crypto Bucket developers Khush and Nikhila.
        </Footer>
      </Layout>
    );
  }
}

export default Main;
