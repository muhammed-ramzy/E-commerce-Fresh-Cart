import useRecentProducts from "../../Hooks/useRecentProducts";
import Product from "../Product/Product";

function RecentProducts() {
  let { data } = useRecentProducts();

  return (
    <>
      <div className="flex flex-wrap  items-center">
        {data?.data.data.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default RecentProducts;
