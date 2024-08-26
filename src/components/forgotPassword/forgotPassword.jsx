// import Style from "./forgotPassword.module.css"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";
import axios from "axios";
import { useFormik } from "formik";

function ForgotPassword() {
  let navigate = useNavigate();
  let [apiError, setApiError] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let { setUserLogin } = useContext(userContext);

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email")
      .required("The email is required"),
  });

  // this is the function that formik uses to handle submit
  function handleForgotPassword(formValues) {
    console.log(formValues);
    
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", formValues)
      .then((response) => {
        setIsLoading(false);
        setApiError(null);
        console.log(response);
        
        // navigate("/");
      })
      .catch((response) => {
        setIsLoading(false);
        setApiError(response.response.data.message);
      });
  }

  // Start using Formik to handle our form
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgotPassword,
  });

  return (
    <div className="max-w-lg mx-auto">
      {/* Api Error message */}
      {apiError ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          {apiError}
        </div>
      ) : null}

      <h3 className="text-3xl font-bold text-green-600 mb-5">please enter your email</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="email"
            type="email"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your email:
          </label>
        </div>

        {/* Email validation */}
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {formik.errors.email}
          </div>
        ) : null}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
