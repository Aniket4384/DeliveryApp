import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdFastfood, MdAddPhotoAlternate } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import { GiChickenLeg } from "react-icons/gi";
import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';

function Additem() {
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.admin)
    const [loading,setLoading]=useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [category, setCategory] = useState("")
    const [foodType, setFoodType] = useState("veg")
    
    const categories = [
        "Snacks", "Main Course", "Desserts", "Pizza", "Burgers", 
        "Sandwiches", "South Indian", "North Indian", "Chinese", 
        "Fast Food", "Others"
    ]
    
    const dispatch = useDispatch()
    
    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name",name)
            formData.append("category",category)
            formData.append("foodType", foodType)
            formData.append("price", price)
            if (backendImage) {
                formData.append("image", backendImage)
            }
            const result = await axios.post(`${serverUrl}/item/createItem`, formData, { withCredentials: true })
            dispatch(setMyShopData(result.data))
           setLoading(false)
           navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    
    return (
        <div className='flex justify-center flex-col items-center p-4 bg-gradient-to-br from-[#fff9f6] to-white min-h-screen'>
            <div className='absolute top-4 left-4 z-[10]' onClick={() => navigate("/")}>
                <IoIosArrowRoundBack size={30} className='text-[#2ECC71] hover:text-[#27AE60] cursor-pointer transition-colors' />
            </div>

            <div className='max-w-md w-full bg-white shadow-lg rounded-xl p-6 border border-[#DDEEE3]'>
                <div className='flex flex-col items-center mb-4'>
                    <div className='bg-[#DDEEE3] p-3 rounded-full mb-3'>
                        <MdFastfood className='text-[#2ECC71] w-12 h-12' />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                        Add Food Item
                    </div>
                </div>
                
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input 
                            type="text" 
                            placeholder='Enter Food Name' 
                            className='w-full px-3 py-2 border border-[#DDEEE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition-all'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Food Image</label>
                        <div className='flex items-center gap-2'>
                            <MdAddPhotoAlternate className='text-[#2ECC71] text-xl' />
                            <input 
                                type="file" 
                                accept='image/*' 
                                className='w-full px-3 py-2 border border-[#DDEEE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition-all file:mr-2 file:py-1 file:px-3 file:border-0 file:text-sm file:bg-[#2ECC71] file:text-white file:rounded-lg hover:file:bg-[#27AE60]'
                                onChange={handleImage}
                            />
                        </div>
                        {frontendImage && (
                            <div className='mt-3'>
                                <img 
                                    src={frontendImage} 
                                    alt="Preview" 
                                    className='w-full h-40 object-cover rounded-lg border border-[#DDEEE3]'
                                />
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Price (₹)</label>
                        <input 
                            type="number" 
                            placeholder='0' 
                            min="0"
                            step="0.01"
                            className='w-full px-3 py-2 border border-[#DDEEE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition-all'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                        <select 
                            className='w-full px-3 py-2 border border-[#DDEEE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition-all cursor-pointer'
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cate, index) => (
                                <option value={cate} key={index}>{cate}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Food Type</label>
                        <div className='flex gap-4'>
                            <button
                                type="button"
                                onClick={() => setFoodType("veg")}
                                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${foodType === "veg" ? 'bg-[#2ECC71] text-white border-[#2ECC71]' : 'bg-white text-gray-700 border-[#DDEEE3] hover:bg-[#fff9f6]'} transition-all`}
                            >
                                <FaLeaf />
                                <span>Vegetarian</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFoodType("non veg")}
                                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${foodType === "non veg" ? 'bg-[#2ECC71] text-white border-[#2ECC71]' : 'bg-white text-gray-700 border-[#DDEEE3] hover:bg-[#fff9f6]'} transition-all`}
                            >
                                <GiChickenLeg />
                                <span>Non-Veg</span>
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className='w-full bg-[#2ECC71] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#27AE60] hover:shadow-md transition-all duration-200 cursor-pointer mt-2 disabled:opacity-70 disabled:cursor-not-allowed'
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={20} color='white' /> : "Add Food Item"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Additem