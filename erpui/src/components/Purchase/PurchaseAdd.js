import React, { useState, useEffect } from "react";
import { Col, Row, Input, Select, Form } from "antd";
import Button from "react-bootstrap/Button";
import { stockservices } from "../APIs/Services/StockService";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { purchaseservices } from "../APIs/Services/PurchaseServices";
import { useNavigate } from "react-router-dom";
import ErorModal from "../UI/ErorModal";

function PurchaseAdd() {
  const [suppliers, setSuppliers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
  const [modalHandler, setModalHandler] = useState(false);
  const [errorName, setErrorname] = useState("");

  useEffect(() => {
    supplierservices.getAllSuppliers().then(({ data: suppliers }) => {
      setSuppliers(suppliers.data);
    });
    stockservices.getAllStocks().then(({ data: stocks }) => {
      setStocks(stocks.data);
    });
  }, []);

  const optionsSuppliers = suppliers.map((supplier) => {
    return (
      <Select.Option key={supplier.id} value={supplier.id}>
        {supplier.businessName}
      </Select.Option>
    );
  });
  const optionsStocks = stocks.map((stock) => {
    return (
      <Select.Option key={stock.id} value={stock.id}>
        {stock.buisnessLocation}
      </Select.Option>
    );
  });

  const addPurchase = (body) => {
    purchaseservices
      .createPurchase(body)
      .then(({ data: response }) => {
        if (response.statusCode) {
          navigate("/purchases");
        }
      })
      .catch(function (error) {
        if (error.response) {
          setErrorname("Oops, something went wrong");
          setModalHandler(true);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <>
      {modalHandler && (
        <ErorModal usename={errorName} setmodalHandler={setModalHandler} />
      )}
      <Form
        autoComplete="off"
        onFinish={(values) => {
          console.log(values);
          const postObj = {
            supplierId: `${values.supplierId}`,
            stockId: `${values.stockId}`,
            payTerm: `${values.payTerm}`,
            additionalNote: `${values.additionalNote}`,
          };
          addPurchase(postObj);
        }}
      >
        <Row style={{ marginBottom: "20px" }}>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              hasFeedback
              name="supplierId"
              label="Suppliers"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search Supplier"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsSuppliers}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              hasFeedback
              name="stockId"
              label="Stock"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search Stock"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsStocks}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              hasFeedback
              name="payTerm"
              label="PayTerm"
            >
              <Input
                type="number"
                id="payTerm"
                size="large"
                placeholder="PayTerm"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your Description",
                  whitespace: true,
                  min: 3,
                  max: 20,
                },
              ]}
              hasFeedback
              name="additionalNote"
              label="AdditionalNote"
            >
              <Input
                type="text"
                id="additionalNote"
                size="large"
                placeholder="AdditionalNote"
                style={{ width: "90%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
          <Col span={8}></Col>
        </Row>
        <Button type="primary">Add</Button>
      </Form>
    </>
  );
}

export default PurchaseAdd;
