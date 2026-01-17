import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setSearchItems, setUserData } from "../redux/userSlice.js";
import { FaPlus } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";

function Nav() {
  const { userData, currentCity, cartItems } = useSelector(
    (state) => state.user
  );
  const { myShopData } = useSelector((state) => state.admin);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchItems = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/item/search-items?query=${query}&city=${currentCity}`,
        { withCredentials: true }
      );
      dispatch(setSearchItems(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearchItems();
    } else {
      dispatch(setSearchItems(null));
    }
  }, [query]);

  return (
    <>
      <div className="w-full h-[80px] bg-white shadow-sm border-b border-[#DDEEE3] fixed top-0 z-[9999]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] flex items-center justify-center">
                <IoFastFoodOutline className="text-white text-xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-[#2ECC71] transition-colors">
                Feastify
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Delicious Delivered</p>
            </div>
          </div>

          {/* Search Bar - Desktop - Updated Layout */}
          {userData.role === "customer" && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <div className="flex items-center w-full bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden hover:border-[#2ECC71] transition-colors">
                  {/* Location Section */}
                  <div className="flex items-center pl-4 pr-3 border-r border-gray-300 py-3 min-w-[140px]">
                    <FaLocationDot className="text-[#2ECC71] text-lg mr-2" />
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {currentCity}
                    </span>
                    <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* Search Input */}
                  <div className="flex-1 flex items-center pl-4 pr-2">
                    <IoIosSearch className="text-gray-500 text-xl" />
                    <input
                      type="text"
                      placeholder="Search for restaurants, dishes, or cuisines..."
                      className="w-full px-3 py-3 outline-none text-gray-700 placeholder-gray-500 text-sm"
                      onChange={(e) => setQuery(e.target.value)}
                      value={query}
                    />
                    {query && (
                      <button 
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setQuery("")}
                      >
                        <RxCross2 className="text-lg" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon - Mobile */}
            {userData.role === "customer" && (
              <button 
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setShowSearch(true)}
              >
                <IoIosSearch className="text-[#2ECC71] text-2xl" />
              </button>
            )}

            {/* Cart for Customer */}
            {userData.role === "customer" && (
              <div className="relative group">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                  onClick={() => navigate("/cart")}
                >
                  <FiShoppingCart className="text-[#2ECC71] text-2xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2ECC71] text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <p className="text-sm text-gray-600">Cart Items: {cartItems.length}</p>
                </div>
              </div>
            )}

            {/* Admin Actions */}
            {userData.role === "admin" && (
              <>
                {myShopData && (
                  <button
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => navigate("/add-item")}
                  >
                    <FaPlus className="text-lg" />
                    <span className="font-medium">Add Item</span>
                  </button>
                )}
                <button
                  className="sm:hidden p-2.5 bg-[#2ECC71] text-white rounded-lg hover:bg-[#27AE60] transition-colors"
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus className="text-xl" />
                </button>
                <button
                  className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#2ECC71] text-[#2ECC71] rounded-lg hover:bg-[#2ECC71] hover:text-white transition-colors"
                  onClick={() => navigate("/my-orders")}
                >
                  <TbReceipt2 className="text-xl" />
                  <span className="font-medium">Orders</span>
                </button>
              </>
            )}

            {/* My Orders Button for Customer - Desktop */}
            {userData.role === "customer" && (
              <button
                className="hidden md:flex items-center gap-2 px-4 py-2.5 border border-[#2ECC71] text-[#2ECC71] rounded-lg hover:bg-[#2ECC71] hover:text-white transition-colors"
                onClick={() => navigate("/my-orders")}
              >
                <TbReceipt2 className="text-xl" />
                <span className="font-medium">My Orders</span>
              </button>
            )}

            {/* User Profile */}
            <div className="relative">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => setShowInfo(!showInfo)}
              >
                {userData?.name?.charAt(0).toUpperCase()}
              </button>

              {/* Profile Dropdown */}
              {showInfo && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowInfo(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#DDEEE3] z-50 overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-[#2ECC71]/10 to-[#27AE60]/10 border-b border-[#DDEEE3]">
                      <h3 className="font-bold text-gray-900 text-lg">{userData.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{userData.role}</p>
                    </div>
                    
                    <div className="p-2">
                      {userData.role === "customer" && (
                        <button
                          className="md:hidden w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => {
                            navigate("/my-orders");
                            setShowInfo(false);
                          }}
                        >
                          <TbReceipt2 className="text-[#2ECC71] text-xl" />
                          <span>My Orders</span>
                        </button>
                      )}
                      
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-[#2ECC71] hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors mt-1"
                        onClick={() => {
                          handleLogOut();
                          setShowInfo(false);
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {showSearch && userData.role === "customer" && (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#DDEEE3]">
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <FaLocationDot className="text-[#2ECC71] text-lg" />
                <div>
                  <p className="text-xs text-gray-500">Delivering to</p>
                  <p className="text-sm font-medium text-gray-800">{currentCity}</p>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for restaurants, dishes, or cuisines..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71]"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  autoFocus
                />
                <IoIosSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              </div>
            </div>
            
            <div className="p-4 flex justify-end border-t border-[#DDEEE3]">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => setShowSearch(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;