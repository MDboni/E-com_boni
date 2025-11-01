import { useEffect } from "react"
import ProductStore from "../Store/ProductStore"
import { useParams } from "react-router-dom"
import Layoutt from "../components/Layout/Layoutt"
import ListByProducts from "../components/Product/ListByProducts"

const ByKewordPage = () => {

    const { ProductListByKeywordRequest } = ProductStore()
    const { Keyword } = useParams()

    useEffect(()=>{
        (async()=>{
        await ProductListByKeywordRequest(Keyword)
        })()
    },[Keyword])

  return (
    <Layoutt>
        <ListByProducts/>
    </Layoutt>
  )
}

export default ByKewordPage