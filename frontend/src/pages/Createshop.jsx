import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaStore } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';
import { IoStorefront } from "react-icons/io5";

const primaryColor = "#2ECC71";
const hoverColor = "#27AE60";
const bgColor = "#fff9f6";
const borderColor = "#DDEEE3";

function Createshop() {
  const navigate = useNavigate()
  const { myShopData } = useSelector(state => state.admin)
  const { currentCity, currentState, currentAddress } = useSelector(state => state.user)

  const [name, setName] = useState(myShopData?.name || "")
  const [address, setAddress] = useState(myShopData?.address || currentAddress)
  const [city, setCity] = useState(myShopData?.city || currentCity)
  const [state, setState] = useState(myShopData?.state || currentState)
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null)
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)

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
      formData.append("name", name)
      formData.append("city", city)
      formData.append("state", state)
      formData.append("address", address)
      if (backendImage) formData.append("image", backendImage)

      const result = await axios.post(
        `${serverUrl}/shop/createShop`,
        formData,
        { withCredentials: true }
      )
      console.log(result.data)
      dispatch(setMyShopData(result.data))
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div
      className="flex justify-center flex-col items-center p-6  relative min-h-screen overflow-hidden "
      style={{ background: bgColor }}
    >
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack size={35} style={{ color: primaryColor }} />
      </div>

      <div
        className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-4 border"
        style={{ borderColor }}
      >
        <div className="flex flex-col items-center mb-6">
          <div
            className="p-4 rounded-full mb-4"
            style={{ backgroundColor: borderColor }}
          >
           <IoStorefront
  className="w-14 h-14"
  style={{ color: primaryColor }}
/>
          </div>

          <div className="text-3xl font-extrabold text-gray-900">
            {myShopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>

        <form className="space-y-3 " onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              style={{ borderColor }}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="cursor-pointer">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:outline-none"
              style={{ borderColor }}
              onChange={handleImage}
            />

            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg border"
                  style={{ borderColor }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                style={{ borderColor }}
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                style={{ borderColor }}
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Shop Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              style={{ borderColor }}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>

          <button
            className="w-full text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 mb-8"
            style={{
              backgroundColor: primaryColor
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = hoverColor}
            onMouseOut={(e) => e.target.style.backgroundColor = primaryColor}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Createshop
