import React from 'react'
import Layoutt from '../components/Layout/Layoutt'
import WishList from '../components/Wish/WishList'
import Brands from '../components/Product/Brands'

const WishPage = () => {
  return (
    <Layoutt>
        <WishList/>
        <Brands/>
    </Layoutt>
  )
}

export default WishPage