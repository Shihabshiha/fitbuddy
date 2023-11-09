import { Carousel } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function CarouselComponent() {
  const navigate = useNavigate();
  const handleProgramClick = () => {
    navigate("/programs");
  };
  const handleAboutClick = () => {
    navigate('/about')
  }
  return (
    <Carousel
      className="rounded-none lg:h-[30rem] sm:h-[14rem] md:h-[20rem] mt-16 overflow-hidden"
      autoplay={true}
      autoplayDelay={6000}
      loop={true}
    >
      <div className="relative h-full w-full">
        <img
          src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1695628386/carousal-3_hh1zek.jpg"
          alt="image 1"
          className="h-[14rem] md:h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full md:items-center bg-black/75">
          <div className="w-11/12 mt-2 pl-8 md:w-3/4 lg:w-3/4 md:pl-20 lg:pl-32 mb-24">
            <p className="text-xl md:text-3xl lg:text-5xl text-white  text-center  md:text-start md:font-semibold lg:mb-4">
              Meet Our Expert Trainers
            </p>
            <p className="opacity-80 text-sm md:text-base text-white text-center md:text-start h-[5rem] md:w-3/4">
              Our experienced trainers are here to help you achieve your fitness
              goals. Whether you're looking to gain or lose weight or sculpt
              your physique.
            </p>
            <div
              className="flex justify-center md:justify-start gap-4 text-sm md:text-base  mt-6"
            >
              <button
                className="align-middle select-none font-sans font-semibold md:font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm  lg:uppercase py-1 px-1 md:py-3.5 md:px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={handleProgramClick}
              >
                Programs
              </button>
              <button
                className="align-middle select-none font-sans font-semibold md:font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm  lg:uppercase  md:py-3.5 md:px-7 rounded-lg text-white hover:bg-white/10 active:bg-white/30"
                type="button"
                onClick={handleAboutClick}
              >
                About us
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1695631679/fitbuddy/carousal_-4_jb1hpp.jpg"
          alt="image 2"
          className="h-[14rem] md:h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-11/12 mt-2 pl-8 md:w-3/4 lg:w-3/4 md:pl-20 lg:pl-32 mb-24">
            <p className="text-xl md:text-3xl lg:text-5xl text-white  text-center  md:text-start md:font-semibold lg:mb-4">
              Weight gain Programs
            </p>
            <p className="opacity-80 text-sm md:text-base text-white text-center md:text-start h-[5rem] md:w-3/4">
              Our specialized weight gain programs are designed to help you
              build muscle and achieve a healthy weight.
            </p>
            <div
              className="flex justify-center md:justify-start gap-4 text-sm md:text-base  mt-6"
              
            >
              <button
                className="align-middle select-none font-sans font-semibold md:font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm  lg:uppercase py-1 px-1 md:py-3.5 md:px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={handleProgramClick}
              >
                Programs
              </button>
              <button
                className="align-middle select-none font-sans font-semibold md:font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm  lg:uppercase  md:py-3.5 md:px-7 rounded-lg text-white hover:bg-white/10 active:bg-white/30"
                type="button"
                onClick={handleAboutClick}
              >
                About us
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1695631679/fitbuddy/carousal_-_5_rtuz3k.webp"
          alt="image 3"
          className="h-[14rem] md:h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-11/12 mt-2 pl-8 md:w-3/4 lg:w-3/4 md:pl-20 lg:pl-32 mb-24">
            <p className="text-xl md:text-3xl lg:text-5xl text-white  text-center  md:text-start md:font-semibold lg:mb-4">
              Sculpt Your Physique
            </p>
            <p className="opacity-80 text-sm md:text-base text-white text-center md:text-start h-[5rem] md:w-3/4">
              Define your body and sculpt the physique you desire with our
              tailored programs. Our trainers will guide you every step of the
              way.
            </p>
            <div
              className="flex justify-center md:justify-start gap-4 text-sm md:text-base  mt-6"
              
            >
              <button
                className="align-middle select-none font-sans font-semibold md:font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm  lg:uppercase py-1 px-1 md:py-3.5 md:px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                onClick={handleProgramClick}
              >
                Programs
              </button>
              <button
                className="align-middle select-none font-sans font-semibold md:font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm  lg:uppercase  md:py-3.5 md:px-7 rounded-lg text-white hover:bg-white/10 active:bg-white/30"
                type="button"
                onClick={handleAboutClick}
              >
                About us
              </button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
