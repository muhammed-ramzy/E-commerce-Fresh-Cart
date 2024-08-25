import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  let [itemsNumber, setItemsNumber] = useState(0);
  let [cartId, setCartId] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  function getCartItems() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setCartId(response.data.data._id)
        return response;
      })
      .catch((error) => error);
  }

  function getItemsNumber() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((response) => {
        setItemsNumber(response.data.numOfCartItems);
      })
      .catch((error) => error);
  }

  function addItem(productId) {
    setIsLoading(true);
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setItemsNumber(response.data.numOfCartItems);
        setIsLoading(false)
        return response;
      })

      .catch((error) => {
        setIsLoading(false)
        return error;
      });
  }

  function removeCartItem(productId) {
    return axios
      .delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      )
      .then((response) => {
        setItemsNumber(response.data.numOfCartItems);
        return response;
      })

      .catch((error) => error);
  }

  function CheckOut(cartId, url, formValues) {
    return axios
      .post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formValues
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function updateItemCounter(productId, count) {
    return axios
      .put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setItemsNumber(response.data.numOfCartItems);
        return response;
      })

      .catch((error) => error);
  }

  useEffect(() => {
    getItemsNumber();
  }, []);

  return (
    <cartContext.Provider
      value={{ getCartItems, itemsNumber, addItem, getItemsNumber, updateItemCounter, removeCartItem, CheckOut, cartId, isLoading }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
