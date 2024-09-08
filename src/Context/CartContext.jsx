import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create a context for the cart data to be shared across components
export let cartContext = createContext();

// CartContextProvider is a wrapper component that provides cart data and functions to its children components
export function CartContextProvider(props) {
  // Define headers with the user's token for authentication
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  // Define state to store the number of items in the cart, the cart ID, and the loading state
  let [itemsNumber, setItemsNumber] = useState(0);
  let [cartId, setCartId] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  // Function to retrieve cart items from the server
  function getCartItems() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((response) => {
        // Save the cart ID from the response data
        setCartId(response.data.data._id);
        return response;
      })
      .catch((error) => error);
  }

  // Function to get the number of items in the cart
  function getItemsNumber() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((response) => {
        // Update the number of items in the cart
        setItemsNumber(response.data.numOfCartItems);
      })
      .catch((error) => error);
  }

  // Function to add an item to the cart
  function addItem(productId) {
    setIsLoading(true); // Set loading state to true when adding an item
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId, // Send product ID in the request body
        },
        {
          headers,
        }
      )
      .then((response) => {
        // Update the number of items in the cart after adding
        setItemsNumber(response.data.numOfCartItems);
        setIsLoading(false); // Set loading state to false after adding
        return response;
      })
      .catch((error) => {
        setIsLoading(false); // Ensure loading state is false even if there's an error
        return error;
      });
  }


  // Function to remove an item from the cart
  function removeCartItem(productId) {
    setIsLoading(true)
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`, // Use productId in the URL to delete the item
        {
          headers,
        }
      )
      .then((response) => {
        setIsLoading(false)
        // Update the number of items in the cart after removal
        setItemsNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => 
      {
        setIsLoading(false)
        return error
      }  
      );
  }

  function clearUserCart()
  {
    return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers
    })
    .then((res)=> res)
    .catch((err)=> err)
  }

  // Function to handle the checkout process
  function CheckOut(cartId, url, formValues) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, // Use cartId in the checkout URL
        {
          shippingAddress: formValues, // Send shipping address as form values
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  // Function to update the item count in the cart
  function updateItemCounter(productId, count) {
    setIsLoading(true)
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`, // Use productId in the URL to update item count
        {
          count, // Send the new count in the request body
        },
        {
          headers,
        }
      )
      .then((response) => {
        setIsLoading(false)
        // Update the number of items in the cart after the count update
        setItemsNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        setIsLoading(false)
        return error
      }
    );
  }

  // useEffect to fetch the number of cart items when the component is first mounted
  useEffect(() => {
    getItemsNumber();
  }, []);

  // Return the cart context provider with the values and functions to be shared with child components
  return (
    <cartContext.Provider
      value={{
        getCartItems,
        itemsNumber,
        addItem,
        getItemsNumber,
        updateItemCounter,
        removeCartItem,
        CheckOut,
        cartId,
        isLoading,
        clearUserCart
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
