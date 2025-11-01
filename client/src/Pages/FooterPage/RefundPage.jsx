import React from 'react'
import Layoutt from '../../components/Layout/Layoutt'
import  { useEffect } from 'react'
import FeatureStoreZustin from '../../Store/FetereStore'
import LegalCompo from '../../components/Product/LegalCompo'

const RefundPage = () => {
       const { LegalDetailsRequest } =FeatureStoreZustin()
        
    
        useEffect(()=>{
            (
                async()=>{
                    await LegalDetailsRequest('refund')
                }
            )()
        },[])
  return (
    <Layoutt>
        <LegalCompo/>
    </Layoutt>
  )
}

export default RefundPage