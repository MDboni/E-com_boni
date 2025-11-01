import React from 'react'
import  { useEffect } from 'react'
import FeatureStoreZustin from '../../Store/FetereStore'
import LegalCompo from '../../components/Product/LegalCompo'
import Layoutt from '../../components/Layout/Layoutt'


const HowToBuy = () => {

       const { LegalDetailsRequest } =FeatureStoreZustin()
        
    
        useEffect(()=>{
            (
                async()=>{
                    await LegalDetailsRequest('howtobuy')
                }
            )()
        },[])

  return (
    <Layoutt>
        <LegalCompo/>
    </Layoutt>
  )
}

export default HowToBuy