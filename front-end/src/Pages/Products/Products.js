import React, { useState, useEffect, useRef } from "react"
import { Container, Table, Form, Button, Row, Col, Image  } from "react-bootstrap"
import TbModal from "../../Components/Modal/Modal";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false); 
  const [error, setError] = useState([]); 
  const [modalShow, setModalShow] = useState(false)
  const [itemToDelete, setItemToDelete] = useState()
  const search = useRef(); // using ref hook to get/set input values.

  useEffect(() => { // getting products on first load
    getProducts()
  }, [])

  const getProducts = async () => { // get products API
    try{
      let result = await fetch("http://localhost:3001/products")
      if(result.status === 200)
      {
        result = await result.json()
        setHasError(false)
        setProducts(result)
      }
      return
    }catch(err){
      setHasError(true)
      setError("An error occurred while fetching data.")
    }
  }

  const deleteModalHandler = (item) => {
    setModalShow(true)
    setItemToDelete(item)
  }

  const deleteProductHandle = async () => { // delete product API call
    let key = itemToDelete._id;
    let result = await fetch(`http://localhost:3001/product/${key}`,{
      method:"Delete"
    })
    result = await result.json()
    setModalShow(false)
    getProducts()
  }

  const handleSearch = async (e) => { // search product API call
    e.preventDefault();
    var key = search.current.value;
    var key = encodeURIComponent(key);
    if(key){
      try{
        let result = await fetch(`http://localhost:3001/product/search/${key}`)
        if(result.status === 200){
          result = await result.json();
          setHasError(false)
          setProducts(result);
        } else if (result.status === 404){
          setHasError(true)
          setError("No products found matching the search query.")
        } else if (result.status === 400){
          setHasError(true)
          setError("Please provide a search query.")
        } else if (result.status === 500){
          setHasError(true)
          setError("An internal server error occurred. Please try again later.")
        }
      } catch(err){
        setHasError(true)
        setError("An error occurred while fetching data.")
      }
    }else{
      getProducts();
    }
    return;
  }

  

  return (
    <div>
      <Container className="mt-5">
        <Col className="col">
          <h3>Products</h3>
        </Col>
        <Row>
          <Col className="col">
            <Form noValidate >
              <Row className="mb-3">
                <Col className="col col-8 align-self-end">
                  <Form.Group controlId="Name">
                    <Form.Control
                      type="search"
                      placeholder="Type to search"
                      ref={search}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="primary" type="submit" onClick={handleSearch}>Search</Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col className="col">
            <Button href="/add-product" className="float-end">Add product</Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Company</th>
              <th>Price</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!hasError ? 
              <>
                {products.map((Item, key) => {
                  return (
                    <tr key={Item._id}>
                      <td valign="middle">{key + 1}</td>
                      <td valign="middle">
                        <div className="row align-items-center m-0">
                          <div className="col col-1 ps-0">
                            <Image src={Item.image} thumbnail />
                          </div>
                          <div className="col ps-0">
                            <p className="m-0">{Item.name}</p>
                            <p className="small text-body-secondary m-0">{Item.description}</p>
                          </div>

                        </div>
                      </td>
                      <td valign="middle">{Item.category}</td>
                      <td valign="middle">{Item.company}</td>
                      <td valign="middle">{Item.price}</td>
                      <td valign="middle" align="center">{Item.rating}</td>
                      <td valign="middle" align="center" width={110}>
                        <div className="align-items-center">
                          <a href={`/update-product/${Item._id}`} className="btn text-primary mx-1 p-0"><i className="font-icon bi bi-pencil-square"></i></a>
                          <Button className="mx-1 p-0" variant="link text-danger" onClick={() => deleteModalHandler(Item)}><i className="font-icon bi bi-trash3"></i></Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </>
            :
              <tr>
                <td colSpan={6} align="center">{error}</td>
              </tr>
            }
          </tbody>
        </Table>
      </Container>
      <TbModal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show = {modalShow}
        onHide={(e)=>setModalShow(e)}
        modal_header="Confirmation"
        modal_body={<p>Are you sure to delete this product</p>}
        modal_footer = {[<Button onClick={(e)=>setModalShow(false)} variant="default">Cancel</Button>,<Button onClick={deleteProductHandle} variant="danger">Delete</Button>]}
      >        
      </TbModal>
    </div>
  )
}

export default Products
