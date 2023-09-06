import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
const UpdateProduct = () => {
    const redirect = useNavigate();
    const [validated, SetValidated] = useState(false)
    const name = useRef()
    const category = useRef()
    const company = useRef()
    const price = useRef()
    const params = useParams();

    useEffect(()=>{
        getProductDetails()
    },[])

    

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:3001/product/${params.id}`, {
            method: "get",
            headers: {
                "Content-Type" : "application/json"
            },
        })
        if(result.status === 200){
            result = await result.json();
            result = result[0]
            name.current.value = result.name
            category.current.value = result.category
            company.current.value = result.company
            price.current.value = result.price
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        SetValidated(true)
        const form = e.currentTarget;
        if (form.checkValidity() === false){
          return(false)
        }
        const data = {
            name: name.current.value, 
            category: category.current.value, 
            company: company.current.value, 
            price: price.current.value
        }
        let result = await fetch(`http://localhost:3001/product/${params.id}`, {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            },
        })
        if(result.status === 200){
            result = await result.json();
            redirect("/products")
        }
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
                    Update Product
                  </h2>
                  <div className="mb-3">
                    <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Product Name"
                          ref={name}
                        />
                        <Form.Control.Feedback type="invalid">Please enter Name</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="category">
                        <Form.Label className="text-center">
                          Category
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Product Category"
                          ref={category}
                        />
                        <Form.Control.Feedback type="invalid">Please enter Category</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="company">
                        <Form.Label className="text-center">Company</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Product Name"
                          ref={company}
                        />
                        <Form.Control.Feedback type="invalid">Please enter Company</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="price">
                        <Form.Label className="text-center">Price</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Enter Product Name"
                          ref={price}
                        />
                        <Form.Control.Feedback type="invalid">Please enter Price</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Update Product
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
export default UpdateProduct;
