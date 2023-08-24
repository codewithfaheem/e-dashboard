import React, {useState, useEffect} from "react";
import { Container, Table } from "react-bootstrap";

const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
     getProducts();
  })

  const getProducts = async () => {
    let result = await fetch("ttp://localhost:3001/products");
    console.log(result);
    result = await result.json()
    setProducts(result)
    console.log(result)
  }

  return (
    <div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Products;
