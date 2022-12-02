import React from 'react'
import {Button, Container, Navbar, Modal} from 'react-bootstrap'
import {useState, useContext} from 'react';
import {CartContext} from '../CartContext'
import CartProducts from './CartProducts';

function NavBar() {
  const [show, setShow] = useState(false);
  const handleClose =()=> setShow(false);
  const handleShow =()=> setShow(true);
  const cart = useContext(CartContext);
  const productsCount = cart.items.reduce((sum, product)=> sum + product.quantity, 0)
  const checkout = async () =>{
    await fetch('https://localhost:4000/checkout',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({items:cart.items})
    }).then((response)=>{
      return response.json();
    }).then((response)=>{
      if(response.url){
        window.location.assign(response.url);
      }
    });
  }
  return (
    <>
      <Navbar expand="sm">
          <Navbar.Brand href='/'>E-commerce store</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className='justify-content-end'>
              <Button onClick={handleShow}>Cart {(productsCount)} Items</Button>
          </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ?
            <>
              <p>Items in your cart:</p>
              {
                cart.items.map((currentProduct, idx) => (
                  <CartProducts key={idx} 
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}></CartProducts>)
                )
              }
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
              <Button variant='success' onClick={checkout}>
                Purchase items!
              </Button>
            </>
            :
            <h1>This is the modal body!</h1>
          }
          
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavBar