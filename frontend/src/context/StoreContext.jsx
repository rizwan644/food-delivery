

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartitem] = useState({});
  const url = "http://localhost:4000";  // Removed trailing space

  const [token, setToken] = useState("");
  const [food_list,setFooList] = useState([])

  const addToCart = async(itemId) => {
    setCartitem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));
    if (token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }

  };

  const removeFromCart = async (itemId) => {
    setCartitem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      
    }
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItem).reduce((total, itemId) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      return itemInfo ? total + itemInfo.price * cartItem[itemId] : total;
    }, 0);
  };

  const fetchFoodList = async () =>{
   const response = await axios.get(url+"/api/food/list");
      setFooList(response.data.data)
  }

  const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartitem(response.data.cartData);
  }

  useEffect(()=>{
   
   async function loadData(){
      await fetchFoodList();
      if (localStorage.getItem("token")) {
         setToken(localStorage.getItem("token"));
         await loadCartData(localStorage.getItem("token"));
      }
   }
   loadData();
  },[])

  const contextValue = {
    food_list,
    cartItem,
    setCartitem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
