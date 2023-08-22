import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
const Login = () => {
  const redirect = useNavigate();
  const email = useRef();
  const password = useRef();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = {
      email:email.current.value,
      password:password.current.value
    }
    let result = await fetch("http://localhost:3001/login",  {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (result.status === 200) {
      result = await result.json();
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result));
      redirect("/home");
    }
  }

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
          <Card className="shadow px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase ">
                  Logo
                </h2>
                <div className="mb-3">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" ref={email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" ref={password} />
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit" onClick={handleSignIn}>Sign In</Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an Account?? &nbsp;
                      <a href="/signup" className="text-primary fw-bold">
                         Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
