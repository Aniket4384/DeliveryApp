import axios from 'axios';
import React from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';

function OwnerItemCard({ data }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleDelete = async () => {
        try {
            const result = await axios.get(`${serverUrl}/item/deleteItem/${data._id}`, { withCredentials: true })
            dispatch(setMyShopData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#DDEEE3] hover:border-[#2ECC71] transition-all duration-200 w-full max-w-2xl'>
            <div className='w-36 flex-shrink-0 bg-[#fff9f6] flex items-center justify-center'>
                {data.image ? (
                    <img src={data.image} alt={data.name} className='w-full h-full object-cover' />
                ) : (
                    <MdFastfood className='w-16 h-16 text-[#2ECC71] opacity-60' />
                )}
            </div>
            <div className='flex flex-col justify-between p-3 flex-1'>
                <div>
                    <h2 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                        {data.name}
                    </h2>
                    <p className='text-sm mt-2'><span className='font-medium text-gray-600'>Category:</span> <span className='text-gray-700 ml-1'>{data.category}</span></p>
                    <p className='text-sm mt-1'>
                        <span className='font-medium text-gray-600'>Food Type:</span> 
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${data.foodType === 'veg' ? 'bg-[#2ECC71]/20 text-[#27AE60] border border-[#2ECC71]/30' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                            {data.foodType}
                        </span>
                    </p>
                </div>
                <div className='flex items-center justify-between mt-3'>
                    <div className='text-[#2ECC71] font-bold text-lg'>₹{data.price}</div>
                    <div className='flex items-center gap-2'>
                        <button 
                            className='flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2ECC71]/10 text-[#2ECC71] hover:bg-[#2ECC71]/20 transition-colors cursor-pointer border border-[#2ECC71]/20'
                            onClick={() => navigate(`/edit-item/${data._id}`)}
                            title="Edit Item"
                        >
                            <MdEdit size={18} />
                            <span className='text-sm font-medium'>Edit</span>
                        </button>
                        <button 
                            className='flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer border border-red-200'
                            onClick={handleDelete}
                            title="Delete Item"
                        >
                            <MdDelete size={18} />
                            <span className='text-sm font-medium'>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerItemCard