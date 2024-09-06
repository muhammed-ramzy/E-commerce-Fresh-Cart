import { useContext, useEffect, useState } from "react";
// import Style from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  let { getCartItems, updateItemCounter, removeCartItem } =
    useContext(cartContext);
  let [cartDetails, setCartDetails] = useState(null);

  async function getItems() {
    let response = await getCartItems();
    setCartDetails(response);
  }

  async function updateItemsCounter(productId, count) {
    let response = await updateItemCounter(productId, count);
    setCartDetails(response);
  }

  async function removeItem(productId) {
    let response = await removeCartItem(productId);
    setCartDetails(response);
  }

  //   async function Checkout(cartId, url, formValues) {
  //     let response = await CheckOut(cartId, url, formValues);
  //     console.log(response);

  //   }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="flex justify-between">
      {/* Order Details */}
      <div className="w-4/6">
        <div className="px-2">
          <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full  text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.data.data.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        {product.count > 1 ? (
                          <button
                            onClick={() => {
                              updateItemsCounter(
                                product.product.id,
                                product.count - 1
                              );
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                        ) : null}
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() => {
                            updateItemsCounter(
                              product.product.id,
                              product.count + 1
                            );
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      EGP {product.price.toLocaleString("en-US")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => removeItem(product.product.id)}
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:text-red-200 text-xl"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-2/6">
        <div className="px-2">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl border-b-slate-300 pb-4 border-0 border-b-2 font-bold tracking-tight text-gray-900 dark:text-white">
              Order Summary
            </h5>
            <div className="border-b-slate-300 mb-3 border-0 border-b-2">
              <div className="flex justify-between">
                <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Subtotal
                </span>
                <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  EGP{" "}
                  {cartDetails?.data.data.totalCartPrice ? (
                    cartDetails.data.data.totalCartPrice.toLocaleString("en-US")
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Taxes 14%
                </span>
                <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  EGP{" "}
                  {cartDetails?.data.data.totalCartPrice ? (
                    (
                      cartDetails.data.data.totalCartPrice * 0.14
                    ).toLocaleString("en-US")
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Total
              </span>
              <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                EGP{" "}
                {cartDetails?.data.data.totalCartPrice ? (
                  (cartDetails.data.data.totalCartPrice * 1.14).toLocaleString(
                    "en-US"
                  )
                ) : (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                )}
              </span>
            </div>
            <Link to={"/checkout"}>
              <span className="block cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Check Out <i className="ms-1 fa-solid fa-credit-card"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
