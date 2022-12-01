import React from 'react'
import {Row, Col} from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import {productsArray} from '../productsStore'

function Store() {
  return (
    <>
        <h1 className='p-3' align="center">Welcome to store!</h1>
        <Row className='g-4' xs={1} md={3}>
            {productsArray.map((product, idx)=>(
                <Col align="center" key={idx}>
                    <ProductCard product={product}/>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default Store