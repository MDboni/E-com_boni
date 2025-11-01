import React from 'react'
import AppNavbar from './AppNavbar'
import AppFooter from './AppFooter'
import { Toaster } from 'react-hot-toast'

const Layoutt = (pros) => {
  return (
    <>
        <AppNavbar></AppNavbar> 

          {pros.children}
          <Toaster position="bottom-center" reverseOrder={false} />
        <AppFooter></AppFooter>
    </>
  )
}

export default Layoutt