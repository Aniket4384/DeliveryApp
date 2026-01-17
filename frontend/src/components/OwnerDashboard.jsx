import React from 'react'
import Nav from './NaV.JSX'
import { useSelector } from 'react-redux'
import { IoStorefront } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import OwnerItemCard from './ownerItemCard';

function OwnerDashboard() {
  const { myShopData } = useSelector(state => state.admin)
  const navigate = useNavigate()

  return (
    <div className='w-full min-h-screen flex flex-col items-center' style={{ background: "#fff9f6" }}>
      <Nav />

      {!myShopData &&
        <div className='flex justify-center items-center p-4 sm:p-6'>
          <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition-shadow duration-300'
            style={{ borderColor: "#DDEEE3" }}>
            <div className='flex flex-col items-center text-center'>
              <IoStorefront className='w-16 h-16 sm:w-20 sm:h-20 mb-4' style={{ color: "#2ECC71" }} />
              <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Add Your Restaurant</h2>
              <p className='text-gray-600 mb-4 text-sm sm:text-base'>
                Join our food delivery platform and reach thousands of hungry customers every day.
              </p>
              <button
                className='text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md transition-colors duration-200 cursor-pointer'
                style={{ backgroundColor: "#2ECC71" }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#27AE60"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#2ECC71"}
                onClick={() => navigate("/create-shop")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      }

      {myShopData &&
        <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6'>
          <h1 className='text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center'>
            <IoStorefront className='w-14 h-14' style={{ color: "#2ECC71" }} />
            Welcome to {myShopData.name}
          </h1>

          <div className='bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative'
            style={{ borderColor: "#DDEEE3" }}>
            
            <div
              className='absolute top-4 right-4 text-white p-2 rounded-full shadow-md transition-colors cursor-pointer'
              style={{ backgroundColor: "#2ECC71" }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#27AE60"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#2ECC71"}
              onClick={() => navigate("/create-shop")}
            >
              <FiEdit size={20} />
            </div>

            <img src={myShopData.image} alt={myShopData.name} className='w-full h-48 sm:h-64 object-cover' />

            <div className='p-4 sm:p-6'>
              <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>{myShopData.name}</h1>
              <p className='text-gray-500'>{myShopData.city}, {myShopData.state}</p>
              <p className='text-gray-500 mb-4'>{myShopData.address}</p>
            </div>
          </div>

          {myShopData?.items?.length === 0 &&
            <div className='flex justify-center items-center p-4 sm:p-6'>
              <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition-shadow duration-300'
                style={{ borderColor: "#DDEEE3" }}>
                <div className='flex flex-col items-center text-center'>
                  <IoStorefront className='w-16 h-16 sm:w-20 sm:h-20 mb-4' style={{ color: "#2ECC71" }} />
                  <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Add Your Food Item</h2>
                  <p className='text-gray-600 mb-4 text-sm sm:text-base'>
                    Turn your kitchen masterpieces into customer favorites—add them now
                  </p>
                  <button
                    className='text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md transition-colors duration-200 cursor-pointer'
                    style={{ backgroundColor: "#2ECC71" }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#27AE60"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#2ECC71"}
                    onClick={() => navigate("/add-item")}
                  >
                    Add Food
                  </button>
                </div>
              </div>
            </div>
          }

          {myShopData?.items?.length > 0 &&
            <div className='flex flex-col items-center gap-4 w-full max-w-3xl'>
              {myShopData.items.map((item, index) => (
                <OwnerItemCard data={item} key={index} />
              ))}
            </div>
          }
        </div>
      }
    </div>
  )
}

export default OwnerDashboard
