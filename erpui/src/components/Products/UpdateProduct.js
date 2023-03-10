import React, { useEffect, useState } from "react";
import { Col, Row, Input, Button, Form, Checkbox } from "antd";
import { Select } from "antd";
import { productservices } from "../APIs/Services/ProductServices";
import { unitservices } from "../APIs/Services/UnitsServices";
import { categoriesservices } from "../APIs/Services/CategoryServices";
import { brandservices } from "../APIs/Services/BrandsService";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import ErorModal from "../UI/ErorModal";

function UpdateProduct() {
  const [units, setUnit] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSupliers] = useState([]);
  const [modalHandler, setModalHandler] = useState(false);
  const [errorName, setErrorname] = useState("");
  const [form] = useForm();
  const navigate = useNavigate();
  const { productid } = useParams();

  useEffect(() => {
    unitservices.getAllUnits().then(({ data: units }) => {
      setUnit(units.data);
    });
    categoriesservices.getAllCategories().then(({ data: categories }) => {
      setCategories(categories.data);
    });
    brandservices.getAllBrands().then(({ data: brands }) => {
      setBrands(brands.data);
    });
    supplierservices.getAllSuppliers().then(({ data: suppliers }) => {
      setSupliers(suppliers.data);
    });
    productservices.getProduct(productid).then(({ data: product }) => {
      form.setFieldsValue({
        name: product.data.name,
        sellingState: product.data.sellingState,
        skuCode: product.data.skuCode,
        barCode: product.data.barCode,
        description: product.data.description,
        purchasePrice: product.data.purchasePrice,
        sellingPrice: product.data.sellingPrice,
        alertQuantityOrAmount: product.data.alertQuantityOrAmount,
        weight: product.data.weight,
        caregoryId: product.data.caregoryId,
        brandId: product.data.brandId,
        suplierId: product.data.suplierId,
        unitId: product.data.unitId
      });
    });
  }, [productid, form]);

  const updateProduct = (body) => {
    productservices
      .updateProduct(body)
      .then(({ data: response }) => {
        if (response.statusCode) {
          navigate("/productlist");
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

  const optionsUnits = units.map((unit) => {
    return { label: unit.unitName, value: unit.id };
  });
  const optionsBrands = brands.map((brand) => {
    return { label: brand.brandName, value: brand.id };
  });
  const optionsCategories = categories.map((category) => {
    return { label: category.name, value: category.id };
  });
  const optionsSuppliers = suppliers.map((supplier) => {
    return { label: supplier.businessName, value: supplier.id };
  });

  return (
    <>
    {modalHandler && (
        <ErorModal usename={errorName} setmodalHandler={setModalHandler} />
      )}
        <Form
      form={form}
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const Obj = {
          Id: productid,
          name: `${values.name}`,
          sellingState: values.sellingState,
          skuCode: `${values.skuCode}`,
          barCode: `${values.barCode}`,
          imageUrl: `${values.imageUrl}`,
          description: `${values.description}`,
          purchasePrice: `${values.purchasePrice}`,
          sellingPrice: `${values.sellingPrice}`,
          alertQuantityOrAmount: `${values.alertQuantityOrAmount}`,
          weight: `${values.weight}`,
          unitId: `${values.unitId}`,
          caregoryId: `${values.caregoryId}`,
          brandId: `${values.brandId}`,
          suppliersID: `${values.suppliersID}`,
        };
        updateProduct(Obj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your ProductName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="name"
            label="ProductName"
          >
            <Input
              name="name"
              type="text"
              id="name"
              size="large"
              placeholder="ProductName"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your SkuCode",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="skuCode"
            label="SkuCode"
          >
            <Input
              type="text"
              id="skuCode"
              size="large"
              placeholder="SkuCode"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your BarCode",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="barCode"
            label="BarCode"
          >
            <Input
              type="text"
              id="barCode"
              size="large"
              placeholder="BarCode"
              style={{ width: "90%" }}
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
              },
            ]}
            hasFeedback
            name="imageUrl"
            label="Image"
          >
            <input type={"file"} />
          </Form.Item>
        </Col>
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
            name="description"
            label="Description"
          >
            <Input
              type="text"
              id="description"
              size="large"
              placeholder="Description"
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
            name="purchasePrice"
            label="PurchasePrice"
          >
            <Input
              type="number"
              id="purchasePrice"
              size="large"
              placeholder="PurchasePrice"
              style={{ width: "90%" }}
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
              },
            ]}
            hasFeedback
            name="sellingPrice"
            label="SellingPrice"
          >
            <Input
              type="number"
              id="sellingPrice"
              size="large"
              placeholder="SellingPrice"
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
            name="alertQuantityOrAmount"
            label="AlertQuantity"
          >
            <Input
              type="number"
              id="alertQuantityOrAmount"
              size="large"
              placeholder="AlertQuantity"
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
            name="weight"
            label="Weight"
          >
            <Input
              type="number"
              id="weight"
              size="large"
              placeholder="Weight"
              style={{ width: "90%" }}
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
              },
            ]}
            hasFeedback
            name="unitId"
            label="Unit"
          >
            <Select
              defaultValue="Kg"
              style={{
                width: "100%",
              }}
              allowClear
              options={optionsUnits}
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
            name="caregoryId"
            label="Category"
          >
            <Select
              defaultValue="Electronic"
              style={{
                width: "100%",
              }}
              allowClear
              options={optionsCategories}
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
            name="brandId"
            label="Brand"
          >
            <Select
              style={{
                width: "100%",
              }}
              allowClear
              options={optionsBrands}
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
              },
            ]}
            hasFeedback
            name="suppliersID"
            label="Supplier"
          >
            <Select
              style={{
                width: "100%",
              }}
              options={optionsSuppliers}
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
            name="sellingState"
            label="SellingState"
            valuePropName="checked"
          >
            <Checkbox style={{ marginLeft: "20px" }} />
          </Form.Item>
        </Col>
      </Row>
      <Button htmlType={"submit"} type="primary">
        Update
      </Button>
    </Form>
    </>  
  );
}

export default UpdateProduct;
