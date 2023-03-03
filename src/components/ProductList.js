import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { useSelector,useDispatch } from 'react-redux'
import { fetch_Filter_Products, filterProducts, sortProduct } from '../features/filter/filterSlice'
import { useEffect } from 'react'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filtered_products:products,grid_view,sort,filters} = useSelector(store=>store.filter)
  const dispatch = useDispatch()
  useEffect(()=>{
     dispatch(fetch_Filter_Products())
  },[products])

  useEffect(()=>{
    dispatch(filterProducts())
    dispatch(sortProduct())
  },[sort,filters])

  if(products.length < 1){
    return(
      <h5 style={{ textTransform:'none' }}>
      Sorry,no products matched your search...
    </h5>
    ) 
  }

  if(grid_view === false){
    return <ListView products={products} />
  }
  return <GridView products={products}>product list</GridView>
}

export default ProductList
