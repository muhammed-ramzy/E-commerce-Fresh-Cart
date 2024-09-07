import { useContext } from "react";
// import Style from "./WishlistHeart.module.css";
import { userContext } from "../../Context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

function WishlistHeart({product}) {
  let { setWishListItems, wishListItems } = useContext(userContext);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);

        setWishListItems(res.data.data);
        return res;
      })
      .catch((err) => err);
  }

  function removeFromWishList(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => {
        setWishListItems(res.data.data);
        return res;
      })
      .catch((err) => err);
  }

  async function removeFromWishListHandler(productId) {
    toast.promise(removeFromWishList(productId), {
      loading: "Removing from Your WishList",
      success: (response) => response.data.message,
      error: (response) => response.data.message,
    });
  }

  async function addProductToWishListHandler(productId) {
    toast.promise(addProductToWishList(productId), {
      loading: "Adding to Your WishList",
      success: (response) => response.data.message,
      error: (response) => response.data.message,
    });
  }

  return (
    <span className="text-lg lg:text-3xl font-bold text-gray-900 ">
      {wishListItems.find((item) => item === product.id) ? (
        <i
          onClick={() => removeFromWishListHandler(product.id)}
          className="fa-solid fa-heart cursor-pointer text-red-700"
        ></i>
      ) : (
        <i
          onClick={() => addProductToWishListHandler(product.id)}
          className="fa-regular fa-heart cursor-pointer"
        ></i>
      )}
    </span>
  );
}

export default WishlistHeart;
