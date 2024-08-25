import RecentProducts from "../RecentProducts/RecentProducts";
// import Style from "./Home.module.css"
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import MainSlider from "./../MainSlider/MainSlider";

function Home() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}

export default Home;
