import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
const AddProduct = () => {

    const redirect = useNavigate();

    const name = useRef()
    const category = useRef()
    const company = useRef()
    const price = useRef()

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const data = {
            name: name.current.value, 
            category: category.current.value, 
            company: company.current.value, 
            price: price.current.value
        }
        let result = await fetch("http://localhost:3001/add-product", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            },
        })
        if(result.status === 200){
            result = await result.json();
            redirect("/products")
        }
        console.log(result);
    }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Add Product
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={onSubmitHandler}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Product Name"
                          ref={name}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="category">
                        <Form.Label className="text-center">
                          Category
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Product Name"
                          ref={category}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="company">
                        <Form.Label className="text-center">Company</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Product Name"
                          ref={company}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="price">
                        <Form.Label className="text-center">Price</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Product Name"
                          ref={price}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Add Product
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AddProduct;
