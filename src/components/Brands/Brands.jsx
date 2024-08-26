import { useEffect, useState } from "react";
import Style from "./Brands.module.css";
import axios from "axios";

function Brands() {
  const [allbrands, setAllbrands] = useState([]);

  async function getAllbrands() {
    const res = await axios(`https://ecommerce.routemisr.com/api/v1/brands`);
    setAllbrands(res.data.data);
    console.log(res.data.data);
  }

  useEffect(() => {
    getAllbrands();
  }, []);

  return (
    <>
      <section className="flex flex-wrap justify-center">
        {allbrands.map((brand) => {
          return (
            <div
              key={brand._id}
              className={`w-1/2 mb-3 lg:w-1/4 rounded-3xl p-2 cursor-pointer`}
            >
              <div
                className={`${Style.brandsShadow}  transition-all duration-200  max-w-sm bg-white border  rounded-lg `}
              >
                <div className={` h-[20rem] w-full`}>
                  <img
                    className="w-full h-full object-contain rounded-t-lg"
                    src={brand.image}
                    alt=""
                  />
                </div>
                <div className="p-5 text-center">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-900 dark:text-green">
                      {brand.name}
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

export default Brands;
