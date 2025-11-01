import Layoutt from '../../components/Layout/Layoutt'
import  { useEffect } from 'react'
import FeatureStoreZustin from '../../Store/FetereStore'
import LegalCompo from '../../components/Product/LegalCompo'

const ComplainePage = () => {

    const { LegalDetailsRequest } =FeatureStoreZustin()
        
    
        useEffect(()=>{
            (
                async()=>{
                    await LegalDetailsRequest('complain')
                }
            )()
        },[])

  return (
    <Layoutt>
        <LegalCompo/>
    </Layoutt>
  )
}

export default ComplainePage