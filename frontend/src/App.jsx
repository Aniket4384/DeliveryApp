import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from'./pages/Signin'
import ForgotPassword from './pages/forgotPassword'
export const serverUrl = "http://localhost:8080"
const App = () => {
  return (


    <Routes>
      <Route path="/signup" element={<Signup/>}/>
       <Route path="/signin" element={<Signin/>}/>
       <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  )
}

export default App
