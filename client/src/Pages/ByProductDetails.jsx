import { useEffect } from 'react'
import Layoutt from '../components/Layout/Layoutt'
import ProductStore from '../Store/ProductStore'
import { useParams } from 'react-router-dom'
import ListByProducts from '../components/Product/ListByProducts'
import Details from '../components/Product/Details'

const ByProductDetails = () => {
  const { ProductDetailsStoreRequest} = ProductStore()
  const { ProductID } = useParams()

  useEffect(()=>{
    (async()=>{
      await ProductDetailsStoreRequest(ProductID)
    })()
  },[ProductID])

  return (
    <Layoutt>
       <Details/>
    </Layoutt>
  )
}

export default ByProductDetails