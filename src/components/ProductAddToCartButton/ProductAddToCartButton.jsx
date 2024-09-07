import toast from "react-hot-toast";
// import Style from "./ProductAddToCartButton.module.css";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";

function ProductAddToCartButton({ product }) {
  let { addItem, isLoading } = useContext(cartContext);
  const [productId, setProductId] = useState(null);

  async function addCartItem(productId) {
    setProductId(productId);
    toast.promise(addItem(productId), {
      loading: "Adding to cart",
      success: (response) => {
        setProductId(null);
        return response.data.message
      }
      ,
      error: (response) => {
        setProductId(null);
        return response.data.message
      },
    });
    
    
  }

  
  return (
    <span
      onClick={() => {             
        addCartItem(product.id);
      }}
      className="text-white block cursor-pointer bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      {product.id === productId && isLoading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        "Add to cart"
      )}
    </span>
  );
}

export default ProductAddToCartButton;
