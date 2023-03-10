import React from 'react'
import { Col, Row , Tooltip  } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function BrandHeader() {
  return (
    <Row style={{ marginBottom: "20px" }} >
    <Col span={18} push={6}></Col>
    <Col span={6} pull={18}>
    <Tooltip title="Add Brand"  color={'#2b80ec'} >        
      <Link to="/addbrand" >
        <AppstoreAddOutlined
          style={{
            fontSize: "30px",
            color: "#2b80ec",
          }}
        />
      </Link>
    </Tooltip>
    </Col>
  </Row>
  )
}

export default BrandHeader