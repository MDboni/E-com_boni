import Layoutt from '../../components/Layout/Layoutt'
import LegalCompo from '../../components/Product/LegalCompo'
import { useEffect } from 'react'
import FeatureStoreZustin from '../../Store/FetereStore'

const AboutPage = () => {

    const { LegalDetailsRequest } =FeatureStoreZustin()
    

    useEffect(()=>{
        (
            async()=>{
                await LegalDetailsRequest('about')
            }
        )()
    },[])

  return (
    <Layoutt>
        <LegalCompo/>
    </Layoutt>
  )
}

export default AboutPage