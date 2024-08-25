// import Style from "./RecentProducts.module.css"
import { useEffect } from "react";
import useProducts from "../useProducts";
import useRecentProductDisplay from './../../Hooks/useRecentProductDisplay';

function RecentProducts() {
  let { data } = useProducts();
  let products = useRecentProductDisplay(data);

  useEffect(()=>{console.log(data);
  },[data])
  return (
    <>
      {products}
    </>
  );
}

export default RecentProducts;
