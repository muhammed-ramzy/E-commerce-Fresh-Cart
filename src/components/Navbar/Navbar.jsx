import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";
// import Style from "./Navbar.module.css"

function Navbar() {
  let { setUserLogin, userLogin } = useContext(userContext);
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/Login");
  }

  let { itemsNumber } = useContext(cartContext);
  return (
    <>
      <nav className="bg-gray-100 lg:fixed top-0 right-0 left-0 py-2 z-20">
        <div className="container mx-auto justify-between items-center text-center flex flex-col lg:flex-row">
          <div className="flex flex-col lg:flex-row">
            <ul className="flex flex-col lg:flex-row">
              <li className="mx-2 py-1">
                <NavLink to="">
                  <img width={150} src={logo} alt="fresh-cart-logo" />
                </NavLink>
              </li>
              {userLogin !== null ? (
                <>
                  <li className="mx-2 py-1 px-2 text-lg text-slate-900 hover:text-green-100 hover:bg-green-900 active:bg-green-500 transition-all duration-300  rounded-lg  font-semibold capitalize">
                    <NavLink to="">Home</NavLink>
                  </li>
                  <li className="mx-2 py-1 px-2 text-lg text-slate-900 hover:text-green-100 hover:bg-green-900 active:bg-green-500 transition-all duration-300  rounded-lg  font-semibold capitalize">
                    <NavLink to="cart">cart</NavLink>
                  </li>
                  <li className="mx-2 py-1 px-2 text-lg text-slate-900 hover:text-green-100 hover:bg-green-900 active:bg-green-500 transition-all duration-300  rounded-lg  font-semibold capitalize">
                    <NavLink to="products">products</NavLink>
                  </li>
                  <li className="mx-2 py-1 px-2 text-lg text-slate-900 hover:text-green-100 hover:bg-green-900 active:bg-green-500 transition-all duration-300  rounded-lg  font-semibold capitalize">
                    <NavLink to="brands">brands</NavLink>
                  </li>
                  <li className="mx-2 py-1 px-2 text-lg text-slate-900 hover:text-green-100 hover:bg-green-900 active:bg-green-500 transition-all duration-300  rounded-lg  font-semibold capitalize">
                    <NavLink to="categories">categories</NavLink>
                  </li>
                  <li className="mx-2 py-1 px-2 text-lg text-slate-900 hover:text-green-100 hover:bg-green-900 active:bg-green-500 transition-all duration-300  rounded-lg  font-semibold capitalize">
                    <NavLink to="wishlist">WishList</NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <div>
            <ul className="flex flex-col lg:flex-row">
              {/* Here we check if the user is logged in or not to show and hide the follwing (login, logout and register) */}
              {userLogin !== null ? (
                <li
                  onClick={logout}
                  className="mx-2 py-1 px-2 text-lg text-slate-900 hover:text-green-100 hover:bg-red-800 active:bg-green-500 transition-all duration-300  rounded-lg  font-semibold capitalize cursor-pointer"
                >
                  <span>Logout</span>
                </li>
              ) : (
                <>
                  <li className="mx-2 py-1 px-2 text-lg text-slate-900 hover:text-green-100 hover:bg-green-900 active:bg-green-500 transition-all duration-300  rounded-lg  font-semibold capitalize">
                    <NavLink to="login">Login</NavLink>
                  </li>
                  <li className="mx-2 py-1 px-2 text-lg text-slate-900 hover:text-green-100 hover:bg-green-900 active:bg-green-500 transition-all duration-300  rounded-lg  font-semibold capitalize">
                    <NavLink to="register">Register</NavLink>
                  </li>
                </>
              )}

              <li className="flex items-center text-center">
                <i className="fab text-blue-700 mx-2 fa-facebook"></i>
                <i className="fab text-blue-500 mx-2 fa-twitter"></i>
                <i className="fab text-red-600 mx-2 fa-instagram"></i>
                <i className="fab text-red-500 mx-2 fa-youtube"></i>
                <i className="fab mx-2 fa-tiktok"></i>
              </li>
              <Link to="cart">
                <div className="flex items-center pl-5 text-slate-900 hover:text-green-700">
                  <i className="fa-solid fa-cart-shopping "></i>
                  <li className="mx-2 py-1 text-lg   rounded-lg  font-semibold capitalize">
                    {itemsNumber}
                  </li>
                </div>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
