import React from 'react';
import { Button } from 'react-bootstrap';
import {CartContext} from '../CartContext';
import {useContext} from 'react';
import {getProductData} from '../productsStore';

function CartProducts(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return(
    <>
        <h3>{productData.title}</h3>
        <p>{quantity} TOTAL:</p>
        <p>€ {(quantity * productData.price).toFixed(2)}</p>
        <Button size='sm'
        onClick={()=> cart.deleteFromCart(id)}>
            Remove
        </Button>
        <hr></hr>
    </>
  )
}

export default CartProducts;