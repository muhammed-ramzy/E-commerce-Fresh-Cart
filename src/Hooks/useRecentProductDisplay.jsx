import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

function useRecentProductDisplay(data) {
let {addItem, isLoading} = useContext(cartContext);
let [productId, setProductId] = useState(null);

    async function addCartItem(productId)
    {
        setProductId(productId)
        toast.promise(addItem(productId), {
            loading: 'Adding to cart',
            success: (response) => response.data.message,
            error: (response) => response.data.message,
          });
        
    }
    return (
        <div className="flex flex-wrap justify-center items-center">
        {data?.data.data.map((product) => {
          return (
            <div
              key={product.id}
              className="w-1/2 mb-3 lg:w-1/5 hover:scale-125 transition-all duration-200 rounded-3xl p-2"
            >
              <div className=" bg-white  border-gray-200 rounded-3xl shadow-green-100 dark:border-green-700 overflow-hidden">
                <Link
                  to={`/product-details/${product.id}/${product.category.name}`}
                >
                  <img
                    className=""
                    src={product.imageCover}
                    alt="product image"
                  />

                  <div className="px-5 pb-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h5>

                      <div className="flex items-center ">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <svg
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </div>
                        <span className=" text-green-800 text-xs font-semibold px-2.5  rounded">
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg lg:text-3xl font-bold text-gray-900 ">
                        EGP {product.price.toLocaleString('en-US')}
                      </span>
                    </div>
                  </div>
                </Link>
                <span
                  onClick={()=> {
                    addCartItem(product.id)
                }}
                  className="text-white block cursor-pointer bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  {product.id === productId && isLoading? <i className="fa-solid fa-spinner fa-spin"></i>: 'Add to cart'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    )
}

export default useRecentProductDisplay
