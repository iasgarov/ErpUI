import React, { useState, useEffect } from "react";
import { Col, Row, Input, Select, Form } from "antd";
import Button from "react-bootstrap/esm/Button";
import { stockservices } from "../APIs/Services/StockService";
import { discountservices } from "../APIs/Services/DiscountsServices";
import { customerservice } from "../APIs/Services/CustomerServices";
import { sellservices } from "../APIs/Services/SellsServices";
import { useNavigate } from "react-router-dom";
import ErorModal from "../UI/ErorModal";

function AddSell() {
  const [customers, setCustomers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const navigate = useNavigate()
  const [modalHandler, setModalHandler] = useState(false);
  const [errorName, setErrorname] = useState("");

  useEffect(() => {
    customerservice.getAllCustomers().then(({ data: customers }) => {
      setCustomers(customers.data);
    });
    stockservices.getAllStocks().then(({ data: stocks }) => {
      setStocks(stocks.data);
    });
    discountservices.getAllDiscounts().then(({ data: discounts }) => {
      setDiscounts(discounts.data);
    });
  }, []);

  const optionsCustomer = customers.map((customer) => {
    return (
      <Select.Option key={customer.id} value={customer.id}>
        {customer.businessName}
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
  const discountOptions = discounts.map((discount) => {
    return (
      <Select.Option key={discount.id} value={discount.id}>
        {discount.name}
      </Select.Option>
    );
  });

  const addSell = (body) => {
    sellservices
      .createSell(body)
      .then(({data:response}) => {
        if (response.statusCode) {
          navigate('/sales');
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
      })
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
            customerId: `${values.customerId}`,
            stockId: `${values.stockId}`,
            shippingAddress: `${values.shippingAddress}`,
            payTerm: `${values.payTerm}`,
            sellNote: `${values.sellNote}`,
            discountId: values.discountId,
          };
          addSell(postObj);
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
              name="customerId"
              label="Customers"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search Customer"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsCustomer}
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
              name="sellNote"
              label="SellNote"
            >
              <Input
                type="text"
                id="sellNote"
                size="large"
                placeholder="SellNote"
                style={{ width: "90%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your SellNote",
                  whitespace: true,
                  min: 3,
                  max: 20,
                },
              ]}
              hasFeedback
              name="shippingAddress"
              label="ShippingAddress"
            >
              <Input
                type="text"
                id="shippingAddress"
                size="large"
                placeholder="ShippingAddress"
                style={{ width: "90%" }}
              />
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
              name="discountId"
              label="Discounts"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search Discount"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {discountOptions}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary">Add</Button>
      </Form>
    </>
  );
}

export default AddSell;
