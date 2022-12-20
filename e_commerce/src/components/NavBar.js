import React from 'react'
import {Navbar, Modal} from 'react-bootstrap'
import {useState, useContext} from 'react';
import {CartContext} from '../CartContext'
import CartProducts from './CartProducts';
import {RiShoppingBasket2Line} from 'react-icons/ri';
import {BiUser} from 'react-icons/bi';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
          <Navbar.Brand href='/'>KAÇIRILDIN STORE</Navbar.Brand>
          <Navbar.Toggle/>
          <Stack spacing={2} 
          direction="row"
          sx={
            {justifyContent:'end'}
          }>
            <Button variant="outlined"
              sx={
                {
                  borderColor:'secondary.main', 
                  color:'secondary.main',
                  justifyContent:'end'
                }}>
                <BiUser/> &nbsp;Login 
              </Button>
              <Button variant="contained"
                sx={
                  {
                    backgroundColor:'secondary.main',
                    justifyContent:'end'
                  }}
                onClick={handleShow}>
                <RiShoppingBasket2Line/> &nbsp; {(productsCount)} Items
              </Button>
          </Stack>
          {/* <Navbar.Collapse className='justify-content-end'>
              <Button variant="contained" onClick={handleShow}>
                <RiShoppingBasket2Line/> 
              </Button>
          </Navbar.Collapse> */}
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
            <h2>You have nothing in the cart!</h2>
          }
          
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavBar