import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/motor rend (1024 x 1024 px) (29 x 22 cm) (1096 x 448 px).zip - 1.png";
import image2 from "../assets/motor rend (1024 x 1024 px) (29 x 22 cm) (1096 x 448 px).zip - 2.png";
import image3 from "../assets/motor rend (1024 x 1024 px) (29 x 22 cm) (1096 x 448 px).zip - 30.png";
import image24 from "../assets/motor rend (1024 x 1024 px) (29 x 22 cm) (1096 x 448 px).zip - 9.png";
import tabletImage1 from "../assets/1.png";
import tabletImage2 from "../assets/2.png";
import tabletImage3 from "../assets/9.png";
import tabletImage4 from "../assets/24.png";
import { useState, useEffect } from "react";

function SliderItems() {
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDestkop, setIsDestkop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 640);
      setIsDestkop(window.innerWidth > 1024);
      setIsMobile(window.innerWidth <= 640);
      console.log("isTablet:", isTablet, "isMobile:", isMobile);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isTablet, isMobile]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if (isDestkop) {
    return (
      <Slider {...settings} className="mt-[44px]">
        <div className="w-full h-[500px]">
          <img
            src={image1}
            alt="Image 1"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="w-full h-[500px]">
          <img
            src={image2}
            alt="Image 2"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="w-full h-[500px]">
          <img
            src={image3}
            alt="Image 3"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="w-full h-[500px]">
          <img
            src={image24}
            alt="Image 24"
            className="w-full h-full rounded-lg"
          />
        </div>
      </Slider>
    );
  } else if (isTablet) {
    return (
      <Slider {...settings} className="mt-[44px]">
        <div className="w-full h-[500px]">
          <img
            src={tabletImage1}
            alt="Image 1"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="w-full h-[500px]">
          <img
            src={tabletImage2}
            alt="Image 2"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="w-full h-[500px]">
          <img
            src={tabletImage3}
            alt="Image 3"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="w-full h-[500px]">
          <img
            src={tabletImage4}
            alt="Image 24"
            className="w-full h-full rounded-lg"
          />
        </div>
      </Slider>
    );
  } else {
    return (
      <>
        <Slider {...settings} className="mt-[44px]">
          <div className="w-full h-[500px]">
            <img
              src={tabletImage1}
              alt="Image 1"
              className="w-full h-full object-fill rounded-lg"
            />
          </div>
          <div className="w-full h-[500px]">
            <img
              src={tabletImage2}
              alt="Image 2"
              className="w-full h-full object-fill rounded-lg"
            />
          </div>
          <div className="w-full h-[500px]">
            <img
              src={tabletImage3}
              alt="Image 3"
              className="w-full h-full object-fill rounded-lg"
            />
          </div>
          <div className="w-full h-[500px]">
            <img
              src={tabletImage4}
              alt="Image 24"
              className="w-full h-full object-fill rounded-lg"
            />
          </div>
        </Slider>
      </>
    );
  }
}

export default SliderItems;
