import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/auth-slice";
import {REACT_APP_BASE_URL} from "../constants"

export const useAutoLogin = () => {
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
          try {
            const res = await axios.get(`${REACT_APP_BASE_URL}/api/auth/refresh`, {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
            });
      
            if (res.status === 200 && res.data.success) {
              dispatch(setAuth(res.data.user));
            }
          } catch (err) {
            // console.log("Auto-login error:", err.response?.data || err.message);
          } finally {
            setLoading(false);
          }
        })();
      }, [dispatch]);
      
    return loading;
}