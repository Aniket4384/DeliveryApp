// UserDashboard.jsx
import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav.JSX'
import { categories } from '../category'
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './categorycard';
import FoodCard from './FoodCard';

function UserDashboard() {
  const {currentCity, shopInMyCity, itemsInMyCity, searchItems} = useSelector(state => state.user)
  const cateScrollRef = useRef()
  const shopScrollRef = useRef()
  const navigate = useNavigate()
  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightCateButton, setShowRightCateButton] = useState(false)
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)
  const [updatedItemsList, setUpdatedItemsList] = useState([])

  const handleFilterByCategory = (category) => {
    if(category == "All") {
      setUpdatedItemsList(itemsInMyCity)
    } else {
      const filteredList = itemsInMyCity?.filter(i => i.category === category)
      setUpdatedItemsList(filteredList)
    }
  }

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity)
  }, [itemsInMyCity])

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    if(element) {
      setLeftButton(element.scrollLeft > 0)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
    }
  }

  const scrollHandler = (ref, direction) => {
    if(ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    if(cateScrollRef.current) {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)
      cateScrollRef.current.addEventListener('scroll', () => {
        updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
      })
      shopScrollRef.current.addEventListener('scroll', () => {
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)
      })
    }

    return () => {
      cateScrollRef?.current?.removeEventListener("scroll", () => {
        updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
      })
      shopScrollRef?.current?.removeEventListener("scroll", () => {
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)
      })
    }
  }, [categories])

  return (
    <div className='w-screen min-h-screen flex flex-col gap-8 items-center bg-[#fff9f6] overflow-y-auto pb-10'>
      <Nav />

      {searchItems && searchItems.length > 0 && (
        <div className='w-full max-w-6xl flex flex-col gap-6 items-start p-6 bg-white rounded-2xl mt-6 shadow-sm border border-[#DDEEE3]'>
          <h1 className='text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-[#DDEEE3] pb-3'>
            Search Results
          </h1>
          <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>
            {searchItems.map((item) => (
              <FoodCard data={item} key={item._id}/>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl flex flex-col gap-6 items-start px-4">
        <h1 className='text-gray-800 text-2xl sm:text-3xl font-bold'>Inspiration for your first order</h1>
        <div className='w-full relative'>
          {showLeftCateButton && (
            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#2ECC71] text-white p-2 rounded-full shadow-lg hover:bg-[#27AE60] z-10 transition-colors'>
              <FaCircleChevronLeft size={24} onClick={() => scrollHandler(cateScrollRef, "left")}/>
            </button>
          )}

          <div className='w-full flex overflow-x-auto gap-5 pb-4 px-1' ref={cateScrollRef}>
            {categories.map((cate, index) => (
              <CategoryCard 
                name={cate.category} 
                image={cate.image} 
                key={index} 
                onClick={() => handleFilterByCategory(cate.category)}
              />
            ))}
          </div>
          
          {showRightCateButton && (
            <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#2ECC71] text-white p-2 rounded-full shadow-lg hover:bg-[#27AE60] z-10 transition-colors'>
              <FaCircleChevronRight size={24} onClick={() => scrollHandler(cateScrollRef, "right")}/>
            </button>
          )}
        </div>
      </div>

      <div className='w-full max-w-6xl flex flex-col gap-6 items-start px-4'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl font-bold'>Best Shop in {currentCity}</h1>
        <div className='w-full relative'>
          {showLeftShopButton && (
            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#2ECC71] text-white p-2 rounded-full shadow-lg hover:bg-[#27AE60] z-10 transition-colors'>
              <FaCircleChevronLeft size={24} onClick={() => scrollHandler(shopScrollRef, "left")}/>
            </button>
          )}

          <div className='w-full flex overflow-x-auto gap-5 pb-4 px-1' ref={shopScrollRef}>
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard 
                name={shop.name} 
                image={shop.image} 
                key={index} 
                onClick={() => navigate(`/shop/${shop._id}`)}
              />
            ))}
          </div>
          
          {showRightShopButton && (
            <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#2ECC71] text-white p-2 rounded-full shadow-lg hover:bg-[#27AE60] z-10 transition-colors'>
              <FaCircleChevronRight size={24} onClick={() => scrollHandler(shopScrollRef, "right")}/>
            </button>
          )}
        </div>
      </div>

      <div className='w-full max-w-6xl flex flex-col gap-6 items-start px-4'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl font-bold'>
          Suggested Food Items
        </h1>
        <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>
          {updatedItemsList?.map((item, index) => (
            <FoodCard key={index} data={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard