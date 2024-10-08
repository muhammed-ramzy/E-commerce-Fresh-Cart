import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";
// import Style from "./Register.module.css";

function Register() {
  let navigate = useNavigate();
  let [apiError, setApiError] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let {setUserLogin} = useContext(userContext);

  // //This is my validation function that formik uses to validate the input
  // function myValidation(formValues) {
  //   let errors = {};

  //   if (!formValues.name) {
  //     errors.name = "Name required";
  //   } else if (!/^[A-Z][a-z]{3,5}$/.test(formValues.name)) {
  //     errors.name =
  //       "Name must start with an uppercase letter and to be 4-6 letters in length";
  //   }

  //   if (!formValues.email) {
  //     errors.email = "Email required";
  //   } else if (
  //     !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  //       formValues.email
  //     )
  //   ) {
  //     errors.email = "Email invalid";
  //   }

  //   return errors;
  // }

  //The is the validation using yup library
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "The name should be at least 3 chars")
      .max(10, "The name shouldn't exceed 10 chars")
      .required("The user name is required"),
    email: Yup.string()
      .email("invalid email")
      .required("The email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "The phone must be Egyptian")
      .required("The phone is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][A-Za-z0-9]{8}$/,
        "The password must start with a capital letter and followed by 8 letters or numbers"
      )
      .required("The password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "not matched")
      .required("The password is required"),
  });

  // this is the function that formik uses to handle submit
  function handleRegister(formValues) {
    setIsLoading(true)
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValues)
      .then((response) => {        
        setIsLoading(false);
        setApiError(null);
        localStorage.setItem("userToken", response.data.token);
        setUserLogin(response.data.token);
        navigate("/Login")
      })
      .catch((response) => {
        setIsLoading(false);
        setApiError(response.response.data.message);
      });
  }

  // Start using Formik to handle our form
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
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

      <h3 className="text-3xl font-bold text-green-600 mb-5">Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="name"
            type="text"
            name="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your name:
          </label>
        </div>

        {/* Name validation */}
        {formik.errors.name && formik.touched.name ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {formik.errors.name}
          </div>
        ) : null}

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

        {/* Phone validation */}
        {formik.errors.phone && formik.touched.phone ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {formik.errors.phone}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            id="password"
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your password:
          </label>
        </div>

        {/* password validation */}
        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {formik.errors.password}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            id="rePassword"
            type="password"
            name="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your rePassword:
          </label>
        </div>

        {/* rePassword validation */}
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {formik.errors.rePassword}
          </div>
        ) : null}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading? <i className="fas fa-spinner fa-spin"></i>
         : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Register;
