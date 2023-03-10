import React, { useEffect,useState } from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useSelector,useDispatch } from 'react-redux'
import { closeSidebar } from '../features/product/productSlice'
import { useAuth0 } from '@auth0/auth0-react'
import {  useNavigate } from 'react-router-dom';
import { updateUser } from '../features/user/userSlice'
import { clearCart } from '../features/cart/cartSlice'
 
const CartButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {total_items} = useSelector(store=>store.cart)

  const {isAuthenticated,loginWithRedirect,logout,user} = useAuth0();
  const [myUser,setMyUser] = useState(null);
   useEffect(()=>{
     if(isAuthenticated){
      setMyUser(user);
      localStorage.setItem('user',JSON.stringify(user))
      dispatch(updateUser(user));
     }else{
      setMyUser(false)
     }
    },[isAuthenticated])

  
  const close = () =>{
    dispatch(closeSidebar())
   }

   const logoutUser = () =>{
    clearCart();
    logout({returnTo:window.location.origin})
    localStorage.removeItem('user')
    navigate('/')
   }
  return <Wrapper className='cart-btn-wrapper'>
    <Link to="/cart" className='cart-btn' onClick={close}>
      Cart
      <span className='cart-container'>
        <FaShoppingCart/>
        <span className='cart-value'>
           {total_items}
        </span>
      </span>
    </Link>
    {myUser ? <button type="button" className='auth-btn' onClick={logoutUser}>
      Logout <FaUserMinus/>
    </button> : <button type='button' className='auth-btn'onClick={() => loginWithRedirect()}>
      Login <FaUserPlus/>
    </button>}
    
   
  </Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons
