import Style from "./MainSlider.module.css"
import Slider from "react-slick";
import img1 from '../../assets/main-slider-1.jpeg'
import img2 from '../../assets/main-slider-2.jpeg'
import img3 from '../../assets/main-slider-3.jpeg'
function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
      };
    return (
        <>
          
            <div className="flex flex-wrap mb-11">
                <div className="w-3/4">
                <Slider {...settings}>
                    <img src={img1} className="h-[400px]" alt="" />
                    <img src={img2} className="h-[400px]" alt="" />
                    <img src={img3} className="h-[400px]" alt="" />
                </Slider>
                </div>
                <div className="w-1/4">
                    <img src={img2} className="h-[200px]" alt="" />
                    <img src={img3} className="h-[200px]" alt="" />
                </div>
            </div>
          
        </>
    )
}

export default MainSlider
