import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { toggleAmount } from '../features/cart/cartSlice'

const AmountButtons = ({amount,id}) => {
  console.log(id);
 const dispatch = useDispatch();
  return <Wrapper className='amount-btns'>
         <button type='button' className='amount-btn' onClick={()=>dispatch(toggleAmount({id,value:'dec'}))}>
           <FaMinus/>
         </button>
             <h2 className='amount'>{amount}</h2>
         <button type='button' className='amount-btn' onClick={()=>dispatch(toggleAmount({id,value:'inc'}))}>
           <FaPlus/>
         </button>
  </Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`

export default AmountButtons
