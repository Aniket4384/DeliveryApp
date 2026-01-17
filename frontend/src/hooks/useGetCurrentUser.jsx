import axios from 'axios';
import { useState, useEffect } from 'react';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const useGetCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user);
  useEffect(() => {
    if (userData) {
      console.log("Already have user data, skipping fetch");
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user/current`, {
          withCredentials: true, // important for cookies
        });

           dispatch(setUserData(response.data))
        setUser(response.data); // save user data
      } catch (err) {
        console.error("Error fetching current user:", err.response?.data || err.message);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useGetCurrentUser;
