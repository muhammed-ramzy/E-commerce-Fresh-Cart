import { useContext, useState } from "react";
// import Style from "./Product.module.css"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import WishlistHeart from "../WishlistHeart/WishlistHeart";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductRatingsAverage from "./../ProductRatingsAverage/ProductRatingsAverage";
import ProductTitle from "./../ProductTitle/ProductTitle";
import ProductAddToCartButton from "../ProductAddToCartButton/ProductAddToCartButton";

function Product({ product }) {
  return (
    <div
      key={product.id}
      className="w-1/2 mb-3 lg:w-1/5 hover:scale-105 transition-all duration-200 rounded-3xl p-2"
    >
      <div className=" bg-white  border-gray-200 rounded-3xl shadow-green-100 dark:border-green-700 overflow-hidden">
        <Link
          onClick={() =>
            window.scroll({
              top: 0,
              behavior: "smooth",
            })
          }
          to={`/product-details/${product.id}/${product.category.name}`}
        >
          <img className="" src={product.imageCover} alt="product image" />
        </Link>
        <div className="px-5 pb-2">
          <div className="flex items-center justify-between">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
              <ProductTitle product={product} numberOfWords={2} />
            </h5>

            <ProductRatingsAverage product={product} />
          </div>

          <div className="flex items-center justify-between">
          <span className="text-lg lg:text-3xl font-bold text-gray-900 ">
            <ProductPrice product={product} />
            </span>
            <WishlistHeart product={product} />
          </div>
        </div>

        <ProductAddToCartButton product={product} />
      </div>
    </div>
  );
}

export default Product;
