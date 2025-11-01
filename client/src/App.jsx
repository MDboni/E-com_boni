import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ByBrand from './Pages/ByBrand'
import ByCategory from './Pages/ByCategory'
import Byproduct from './Pages/Byproduct'
import ByProductDetails from './Pages/ByProductDetails'
import ByKewordPage from './Pages/ByKewordPage'
import AboutPage from './Pages/FooterPage/AboutPage'
import RefundPage from './Pages/FooterPage/RefundPage'
import TermsPage from './Pages/FooterPage/TermsPage'
import HowToBuy from './Pages/FooterPage/HowToBuy'
import ContactPahe from './Pages/FooterPage/ContactPahe'
import ComplainePage from './Pages/FooterPage/ComplainePage'
import LoginPage from './Pages/LoginPage'
import OtpPage from './Pages/OtpPage'
import ProfileFormPage from './Pages/ProfileFormPage'
import CartPage from './Pages/CartPage'
import WishPage from './Pages/WishPage'
import InvoicePage from './Pages/InvoicePage'
import OrderPage from './Pages/OrderPage'

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<HomePage/>}/>
         <Route path='/by-brand/:id' element={<ByBrand/>}/>
         <Route path='/by-categori/:id' element={<ByCategory/>}/>
         <Route path='/by-Keyword/:Keyword' element={<ByKewordPage/>}/>
         <Route path='/By-product/:ProductID' element={<ByProductDetails/>}/>
         <Route path='/By-product/:Remark' element={<Byproduct/>}/>
         <Route path='/about' element={<AboutPage/>}/>
         <Route path='/refund' element={<RefundPage/>}/>
         <Route path='/terms' element={<TermsPage/>}/>
         <Route path='/howtoBuy' element={<HowToBuy/>}/>
         <Route path='/contact' element={<ContactPahe/>}/>
         <Route path='/complain' element={<ComplainePage/>}/>
         <Route path='/login' element={<LoginPage/>}/>
         <Route path='/otp' element={<OtpPage/>}/>
         <Route path='/profile' element={<ProfileFormPage/>}/>
         <Route path='/cart' element={<CartPage/>}/>
         <Route path='/wish' element={<WishPage/>}/>
         <Route path='/invoice' element={<InvoicePage/>}/>
         <Route path='/Order' element={<OrderPage/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App