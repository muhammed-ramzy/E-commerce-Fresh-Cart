import { useEffect, useState } from "react";
import Style from "./Brands.module.css"
import axios from "axios";

function Brands() {
    const [allCategories, setAllCategories] = useState([]);

  async function getAllCategories() {
    const res = await axios(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setAllCategories(res.data.data);
    console.log(res.data.data);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <section className="flex flex-wrap justify-center">
        {allCategories.map((category) => {
          return (
            <div
              key={category._id}
              className={`w-1/2 mb-3 lg:w-1/4 rounded-3xl p-2`}
            >
              <div className={`${Style.brandsShadow}  transition-all duration-200  max-w-sm bg-white border  rounded-lg `}>
                <div className={` h-[20rem] w-full`}>
                  <img
                    className="w-full h-full object-contain rounded-t-lg"
                    src={category.image}
                    alt=""
                  />
                </div>
                <div className="p-5 text-center">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-900 dark:text-green">
                      {category.name}
                    </h5>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Brands
