import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// import Style from "./ProductDetails.module.css"
import Slider from "react-slick";

function ProductDetails() {
  let [productDetails, setProductDetails] = useState(null);
  let [relatedProducts, setRelatedProducts] = useState([]);
  let { id, category } = useParams();

  // Slider settings
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  function getProductDetails(id) {
    axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getRelatedProducts(category) {
    axios(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id]);
  return (
    <>
      <div className="flex  flex-wrap justify-center items-center rounded-3xl shadow-2xl p-2 mb-11 shadow-slate-800">
        <div className="w-1/4 p-2">
          {productDetails?.images.length > 1 ? (
            <Slider {...settings}>
              {productDetails?.images.map((src) => (
                <img key={productDetails.id} src={src} alt="" />
              ))}
            </Slider>
          ) : (
            <img src={productDetails?.images[0]} alt="" />
          )}
        </div>
        <div className="w-3/4">
          <h1 className="font-bold text-2xl">{productDetails?.title}</h1>
          <p>{productDetails?.description}</p>
          <div className="flex justify-between items-center mb-5">
            <span className="text-lg lg:text-3xl font-bold text-gray-900 ">
              ${productDetails?.price}
            </span>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
                {productDetails?.ratingsAverage}
              </span>
            </div>
          </div>
          <a
            href="#"
            className="text-white block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add to cart
          </a>
        </div>
      </div>
      {/* Related products */}

      <h2 className="font-bold text-3xl my-11">Related Products</h2>
      <div className="flex flex-wrap  items-center">
        {relatedProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="w-1/2 lg:w-1/5 hover:scale-125 transition-all duration-200 p-2"
            >
              <Link
                to={`/product-details/${product.id}/${product.category.name}`}
              >
                <div className=" bg-white border- border-gray-200 rounded-lg shadow-green-100 dark:border-green-700">
                  <a href="#">
                    <img
                      className="p-8 rounded-t-lg"
                      src={product.imageCover}
                      alt="product image"
                    />
                  </a>
                  <div className="px-5 pb-5">
                    <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
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
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
                        {product.ratingsAverage}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg lg:text-3xl font-bold text-gray-900 ">
                        ${product.price}
                      </span>
                      <a
                        href="#"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductDetails;
