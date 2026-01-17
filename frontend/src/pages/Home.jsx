import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard'
import OwnerDashboard from '../components/OwnerDashboard'
import DeliverBoy from '../components/DeliverBoy'
function Home() {
    const {userData}=useSelector(state=>state.user)
    // console.log(userData.role)
  return (
    <div className='w-full min-h-screen pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
      {userData?.role=="customer" && <UserDashboard/>}
      {userData?.role=="admin" && <OwnerDashboard/> }
      {userData?.role=="deliveryBoy" && <DeliverBoy/>}
    </div>
  )
}

export default Home
