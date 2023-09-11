import React, { useState, useEffect, useRef } from "react"
import { Container, Table, Form, Button, Row, Col  } from "react-bootstrap"
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
        <Form noValidate >
          <Row className="mb-3">
            <Col className="col col-4 align-self-end">
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Company</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!hasError ? 
              <>
                {products.map((Item, key) => {
                  return (
                    <tr key={Item._id}>
                      <td>{key + 1}</td>
                      <td>{Item.name}</td>
                      <td>{Item.category}</td>
                      <td>{Item.company}</td>
                      <td>{Item.price}</td>
                      <td width={110} align="center">
                        <a href={`/update-product/${Item._id}`}><i className="font-icon bi bi-pencil-square mx-2"></i></a>
                        <i className="font-icon bi bi-trash3 mx-2 text-danger" role='button' onClick={() => deleteModalHandler(Item)}></i>
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
