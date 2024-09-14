import madakaripura from "../assets/madakaripura.webp";
import kawahijen from "../assets/kawahijen.jpg";
import bromo from "../assets/gbromo.jpg";
import tumpaksewu from "../assets/tumpaksewu.jpg";
import bjbr from "../assets/bjbr.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TourDestination() {
  const destinations = [
    {
      name: "Air Terjun Madakaripura",
      image: madakaripura,
      description:
        "Keindahan air terjun yang tersembunyi di kawasan Taman Nasional Bromo Tengger Semeru.",
    },
    {
      name: "Kawah Ijen",
      image: kawahijen,
      description:
        "Gunung api dengan fenomena blue fire yang memukau di Banyuwangi.",
    },
    {
      name: "Gunung Bromo",
      image: bromo,
      description:
        "Ikon wisata Jawa Timur yang terkenal dengan pemandangan matahari terbitnya.",
    },
    {
      name: "Tumpak Sewu",
      image: tumpaksewu,
      description:
        "Air terjun megah yang sering dijuluki sebagai Niagara dari Indonesia.",
    },
    {
      name: "BJBR Probolinggo",
      image: bjbr,
      description:
        "Wisata hutan bakau yang menawarkan keindahan alam dan wisata edukasi di Probolinggo.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="tour-destination mt-4 mb-8 relative">
      <h2 className="text-xl font-semibold mb-4">
        Rekomendasi Wisata Terdekat
      </h2>
      <Slider {...settings}>
        {destinations.map((destination, index) => (
          <div key={index} className="tour-card px-2">
            <img
              src={destination.image}
              alt={destination.name}
              className="rounded-lg object-cover h-48 w-full"
            />
            <h3 className="mt-2 text-lg font-medium">{destination.name}</h3>
            <p className="text-sm text-gray-500">{destination.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TourDestination;
