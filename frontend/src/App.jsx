import React from 'react'
import { Routes ,Route, Navigate} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from'./pages/Signin'
import ForgotPassword from './pages/forgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
import Nav from './components/Nav'
import useGetShop from './hooks/useGetShop'
import Createshop from './pages/Createshop'
import Additem from './pages/Additem'
import EditItem from './pages/EditItem'
import useGetShopByCity from './hooks/useGetShopByCity'
import useGetItemsByCity from './hooks/useGetItemByCity'
import CartPage from './pages/CartPage'
export const serverUrl = "http://localhost:8080"
const App = () => {
  useGetCurrentUser()
  useGetCity()
  useGetShop()
  useGetShopByCity()
  useGetItemsByCity()
  const {userData} = useSelector(state=>state.user)
  return (
    <Routes>
      <Route path="/signup" element={!userData?<Signup/>:<Navigate to={"/"} />}/>
       <Route path="/signin" element={!userData?<Signin/>:<Navigate to={"/"} />}/>
       <Route path="/forgot-password" element={!userData?<ForgotPassword/>:<Navigate to ={"/"}/>}/>
       <Route path='/' element={userData?<Home/>:<Navigate to = {"/signin"}/>}></Route>
       <Route path='/create-shop' element={userData?<Createshop/>:<Navigate to = {"/signin"}/>}></Route>
       <Route path='/add-item' element={userData?<Additem/>:<Navigate to = {"/signin"}/>}></Route>
       <Route path='/edit-item/:itemId' element={userData?<EditItem/>:<Navigate to = {"/signin"}/>}></Route>
       <Route path='/cart' element={userData?<CartPage/>:<Navigate to = {"/signin"}/>}></Route>
    </Routes>
  )
}

export default App
