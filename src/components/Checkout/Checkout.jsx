import { useFormik } from "formik";
import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { userContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";
// import Style from "./Checkout.module.css";

function Checkout() {
  let [isLoading, setIsLoading] = useState(false);
  //   let {setUserLogin} = useContext(userContext);
  let { CheckOut, cartId } = useContext(cartContext);

  //The is the validation using yup library
  //   let validationSchema = Yup.object().shape({
  //     email: Yup.string()
  //       .email("invalid email")
  //       .required("The email is required"),
  //     password: Yup.string()
  //       .matches(
  //         /^[A-Z][A-Za-z0-9]{8}$/,
  //         "The password must start with a capital letter and followed by 8 letters or numbers"
  //       )
  //       .required("The password is required")
  //   });

  // this is the function that formik uses to handle submit
  async function handleCheckout(cartId, url) {
    let response = await CheckOut(cartId, url, formik.values);
    console.log(response);
    if(response.data.status === 'success')
    {
        window.location.href =response.data.session.url;
    }
  }

  // Start using Formik to handle our form
  let formik = useFormik({
    initialValues: {
        details: "",
        phone: "",
        city: ""
    },
    onSubmit: ()=> handleCheckout(cartId, 'http://localhost:5173')
  });

  return (
    <div className="max-w-lg mx-auto">

      <h3 className="text-3xl font-bold text-green-600 mb-5">Checkout</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="details"
            type="text"
            name="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            value={formik.values.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your details:
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            id="phone"
            type="tel"
            name="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone:
          </label>
        </div>


        <div className="relative z-0 w-full mb-5 group">
          <input
            id="city"
            type="text"
            name="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            value={formik.values.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your city:
          </label>
        </div>


        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
