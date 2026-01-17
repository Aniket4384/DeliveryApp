import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  setCurrentAddress, setCurrentCity, setCurrentState } from '../redux/userSlice'
const apiKey = import.meta.env.VITE_GEO_KEY
const useGetCity = () => {
  const userData = useSelector(state=>state.user)
    const dispatch = useDispatch()
  return (
    useEffect(()=>{
        if (!userData) return
        navigator.geolocation.getCurrentPosition(async(position)=>{
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`)
            dispatch(setCurrentCity(result?.data?.features[0]?.properties?.city))
            dispatch(setCurrentState(result?.data?.features[0]?.properties?.state))
            dispatch(setCurrentAddress(result.data.features[0].properties.address_line2))
            // console.log(result.data.features[0].properties.address_line2)
           
        })
    },[userData])
  )
}

export default useGetCity
