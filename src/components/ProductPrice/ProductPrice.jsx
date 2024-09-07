// import Style from "./ProductPrice.module.css";

function ProductPrice({ product }) {
  return <>EGP {product.price.toLocaleString("en-US")}</>;
}

export default ProductPrice;
