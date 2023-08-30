import React, { useState, useEffect } from "react"
import { Container, Table } from "react-bootstrap"

const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    let result = await fetch("http://localhost:3001/products")
    if(result.status === 200)
    {
      result = await result.json()
      setProducts(result)
    }
    return
  }

  const deleteProductHandle = async (e) => {

    let result = await fetch(`http://localhost:3001/product/${e}`,{
      method:"Delete"
    })
    result = await result.json()
    if (result) getProducts()
  }

  return (
    <div>
      <Container className="mt-5">
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
            {products.length > 0 ? 
              <>
                {products.map((Item, key) => {
                  return (
                    <tr key={Item._id}>
                      <td>{key + 1}</td>
                      <td>{Item.name}</td>
                      <td>{Item.category}</td>
                      <td>{Item.company}</td>
                      <td>{Item.price}</td>
                      <td width={100} align="center">
                        <i className="font-icon bi bi-trash3 mx-2 text-danger" onClick={() => deleteProductHandle(Item._id)}></i>
                        <a href={`/update-product/${Item._id}`}><i className="font-icon bi bi-pencil-square mx-2"></i></a>
                      </td>
                    </tr>
                  )
                })}
              </>
            :
              <tr>
                <td colSpan={6} align="center">No product found</td>
              </tr>
            }
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default Products
