import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export function UserContextProvider(props) {
  let [userLogin, setUserLogin] = useState(null);
  let [wishListItems, setWishListItems] = useState([]);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getWishList() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        headers,
      }
    );

    let arr = res.data.data.map((item) => item._id);
    setWishListItems(arr);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserLogin(localStorage.getItem("userToken"));
    }

    getWishList();
  }, []);

  return (
    <userContext.Provider
      value={{ setUserLogin, userLogin, setWishListItems, wishListItems }}
    >
      {props.children}
    </userContext.Provider>
  );
}
