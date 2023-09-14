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
    const description = useRef()
    const rating = useRef()
    const image = useRef()

    const params = useParams(); // using react-router params to get parameters from URL

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
            description.current.value = result.description
            rating.current.value = result.rating
            image.current.value = result.image
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
            price: price.current.value,
            description: description.current.value,
            rating: rating.current.value,
            image: image.current.value
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

    const cancelHandel = (e) => {
      e.preventDefault();
      redirect("/products")
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
                          type="text"
                          placeholder="Enter Product Name"
                          ref={company}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="price">
                        <Form.Label className="text-center">Price</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Enter Product Name"
                          step={"any"}
                          ref={price}
                        />
                        <Form.Control.Feedback type="invalid">Please enter Price</Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="description">
                        <Form.Label className="text-center">Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Please enter product description"
                          ref={description}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="rating">
                        <Form.Label className="text-center">Rating</Form.Label>
                        <Form.Control
                          type="number"
                          step={"any"}
                          max={5}
                          placeholder="Please enter product rating"
                          ref={rating}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="image">
                        <Form.Label className="text-center">Image URL</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Please upload product image"
                          ref={image}
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-end">
                        <Button variant="default" type="button" onClick={cancelHandel}>
                          Cancel
                        </Button>
                        <Button variant="primary" type="submit" className="ms-2">
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
