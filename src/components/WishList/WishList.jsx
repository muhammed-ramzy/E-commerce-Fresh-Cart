// import Style from "./WishList.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductAddToCartButton from "./../ProductAddToCartButton/ProductAddToCartButton";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductTitle from "../ProductTitle/ProductTitle";
import ProductRatingsAverage from "../ProductRatingsAverage/ProductRatingsAverage";

function WishList() {
  const [wishListItems, setWishListItems] = useState([]);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getWishList() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers,
      }
    );
    setWishListItems(data.data);
    console.log(data);
  }

  async function removeFromWishList(productId) {
    let res = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers,
      }
    );
    getWishList();
  }

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <>
      <section className="bg-gray-100 p-10 mt-8">
        {/* Section Title */}
        <h1 className="text-2xl font-bold mb-4">My WishList</h1>

        {wishListItems.map((item) => {
          return (
            <>
              {/* Wishlist Item Container */}
              <div className="flex flex-wrap border-0 border-b border-gray-300 pb-4">
                {/* Product Image */}
                <div className="w-2/12">
                  <img src={item.imageCover} alt="" />
                </div>

                {/* Product Details and Actions */}
                <section className="w-10/12 px-5">
                  <div className="flex flex-wrap justify-between h-full items-center">
                    {/* Product Info */}
                    <div>
                      <h2 className="text-2xl mb-1">
                        <ProductTitle product={item} />
                      </h2>
                      <p className="text-xl text-green-900 mb-1">
                        <ProductPrice product={item} />
                      </p>

                      {/* Remove Item Action */}
                      <div
                        className="text-red-700 cursor-pointer hover:text-red-500 "
                        onClick={() => removeFromWishList(item._id)}
                      >
                        <i className="fa-solid fa-trash-can me-1 "></i>
                        <span>Remove</span>
                      </div>
                    </div>

                    <section>
                      <div className="mb-5">
                        <ProductRatingsAverage product={item} />
                      </div>
                      <ProductAddToCartButton product={item} />
                    </section>
                  </div>
                </section>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
}

export default WishList;
