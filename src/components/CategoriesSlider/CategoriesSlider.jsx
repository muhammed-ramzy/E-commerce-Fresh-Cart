// import Style from "./CategoriesSlider.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

function CategoriesSlider() {
  let [categories, setCategories] = useState([]);

  function getCategories() {
    axios(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        console.log(data.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="mb-11">
        <h1 className="text-3xl font-extrabold mb-3 text-center text-slate-800">
          Our Categories
        </h1>
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <img className="category-slider" src={category.image} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default CategoriesSlider;
