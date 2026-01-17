// FoodCard.jsx
import React, { useState } from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';

function FoodCard({data}) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const {cartItems} = useSelector(state => state.user)
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        (i <= rating) ? (
          <FaStar className='text-yellow-500 text-base' key={i}/>
        ) : (
          <FaRegStar className='text-yellow-500 text-base' key={i}/>
        )
      )
    }
    return stars
  }

  const handleIncrease = () => {
    const newQty = quantity + 1
    setQuantity(newQty)
  }
  
  const handleDecrease = () => {
    if(quantity > 0) {
      const newQty = quantity - 1
      setQuantity(newQty)
    }
  }

  const isInCart = cartItems.some(i => i.id == data._id)

  return (
    <div className='w-[280px] rounded-xl border border-[#DDEEE3] bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden hover:border-[#2ECC71] group'>
      <div className='relative w-full h-[180px] overflow-hidden'>
        <div className='absolute top-3 right-3 bg-white rounded-full p-2 shadow z-10'>
          {data.foodType == "veg" ? 
            <FaLeaf className='text-[#2ECC71] text-base'/> : 
            <FaDrumstickBite className='text-red-600 text-base'/>
          }
        </div>
        <img 
          src={data.image} 
          alt={data.name} 
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-8'/>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <h1 className='font-bold text-gray-900 text-lg mb-2 line-clamp-1'>{data.name}</h1>
        
        <div className='flex items-center gap-2 mb-4'>
          {renderStars(data.rating?.average || 0)}
          <span className='text-sm text-gray-500'>
            ({data.rating?.count || 0})
          </span>
        </div>
        
        <div className='mt-auto'>
          <div className='flex items-center justify-between'>
            <span className='font-bold text-gray-900 text-xl'>
              ₹{data.price}
            </span>
            
            <div className='flex items-center border border-[#DDEEE3] rounded-full overflow-hidden shadow-sm'>
              <button 
                className='px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-30' 
                onClick={handleDecrease}
                disabled={quantity === 0}
              >
                <FaMinus size={14} className='text-gray-600'/>
              </button>
              <span className='px-3 py-2 min-w-[40px] text-center font-medium text-gray-700'>
                {quantity}
              </span>
              <button 
                className='px-3 py-2 hover:bg-gray-50 transition-colors' 
                onClick={handleIncrease}
              >
                <FaPlus size={14} className='text-gray-600'/>
              </button>
            </div>
          </div>
          
          <button 
            className={`w-full mt-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
              isInCart 
                ? 'bg-gray-800 text-white hover:bg-gray-900' 
                : 'bg-[#2ECC71] text-white hover:bg-[#27AE60]'
            } ${quantity === 0 ? 'opacity-50 cursor-pointer' : ''}`}
            onClick={() => {
              if(quantity > 0) {
                dispatch(addToCart({
                  id: data._id,
                  name: data.name,
                  price: data.price,
                  image: data.image,
                  shop: data.shop,
                  quantity,
                  foodType: data.foodType
                }))
              }
            }}
            disabled={quantity === 0}
          >
            <FaShoppingCart size={16}/>
            {isInCart ? 'Update Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard