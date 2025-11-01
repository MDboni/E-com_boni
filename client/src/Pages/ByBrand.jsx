import React, { useEffect } from 'react'
import Layoutt from '../components/Layout/Layoutt'
import ProductStore from '../Store/ProductStore'
import { useParams } from 'react-router-dom'
import ListByProducts from '../components/Product/ListByProducts'

const ByBrand = () => {

  const { ProductListByBrandRequest } = ProductStore()
  const { id } = useParams()

  useEffect(()=>{
    (async()=>{
     await ProductListByBrandRequest(id)
    })()
  },[id])

  return (
    <Layoutt>
        <ListByProducts/>
    </Layoutt>
  )
}

export default ByBrand