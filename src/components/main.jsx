import React, { Component } from "react";
import axios from "axios";
import firebase from "./firebase";
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
  Row,
  Spin
} from "antd";
import { Typography } from "antd";

const { Dragger } = Upload;
const { Meta } = Card;
const { Title } = Typography;
const { Header, Content, Footer } = Layout;

class Main extends Component {
  componentDidMount() {
    this.interval = setInterval(() =>  this.renderFile() , 1500);

    this.renderFile();
  }
  constructor(props) {
    super(props);
    this.renderFile = this.renderFile.bind(this);
  }

  state = { Posts: <Spin /> };
  extention = str => {
    switch (str) {
      case "png":
        return "https://cdn0.iconfinder.com/data/icons/flat-file-format/100/png-512.png";
      case "jpg":
        return "http://icons.iconarchive.com/icons/iconsmind/outline/512/File-JPG-icon.png";
      case "jpeg":
        return "http://icons.iconarchive.com/icons/iconsmind/outline/512/File-JPG-icon.png";
      case "xls":
        return "https://cdn4.iconfinder.com/data/icons/files-47/64/xls-512.png";
      case "psd":
        return "https://www.shareicon.net/data/512x512/2015/08/16/86085_adobe_512x512.png";
      default:
        return "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_docs_google-512.png";
    }
  };

  deleteFile = key => {
  axios.get("http://localhost:5001/delete?fileKey=" + key).then(() => {
      message.success("File Deleted!", 5);
    });};
  downloadFile = key => {
    axios.get("http://localhost:5001/download?fileKey=" + key).then(() => {
      message.success("File Downloaded check your downloads", 5);
    });
  };

  renderFile = async () => {
    try {
      let res = await axios.post("http://localhost:5001/list-files");
      let { files } = res.data.message;
      // this will re render the view with new data
      this.setState({
        Posts: files.map((file, i) => (
          <Col span={6} key={i + " file"}>
            <Card
              style={{ width: 300, padding: 15, marginBottom: 20 }}
              cover={
                <img
                  alt="example"
                  src={this.extention(file.fileExt.toLowerCase())}
                />
              }
              actions={[
                <Icon type="delete" key="setting" onClick={() => this.deleteFile(file.fileName)}/>,
                <Icon
                  type="download"
                  key="edit"
                  onClick={() => this.downloadFile(file.fileName)}
                />
              ]}
            >
              <Meta
                title={file.fileName}
                description={"File type " + file.fileExt}
              />
            </Card>
          </Col>
        ))
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
  console.log(this.state.Posts);
    const props = {
      name: "file",

      multiple: true,
      customRequest: options => {
        const data = new FormData();
        data.append("imageToBeEncrypted", options.file);
        const config = {
          headers: {
            "content-type":
              "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s"
          }
        };
        axios
          .post(options.action, data, config)
          .then(res => {
            options.onSuccess(res.data, options.file);
          })
          .catch(err => {
            console.log(err);
          });
      },

      action: "http://localhost:5000/upload", //aws_link
      onChange(info) {
        const { status } = info.file;
        console.log(status);
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
          {firebase.auth().currentUser.email}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1" onClick={() => firebase.auth().signOut()}>
          Logout
        </Menu.Item>
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
            Upload Your File Here
          </div>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibit from uploading
              company data or other confidential files
            </p>
          </Dragger>
          <div style={{ background: "#fff", padding: 24, minHeight: 10 }}>
            Browse Files
          </div>
          <div style={{ background: "#ECECEC", padding: "30px" }}>
            <Row gutter={16}>{this.state.Posts}</Row>
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
