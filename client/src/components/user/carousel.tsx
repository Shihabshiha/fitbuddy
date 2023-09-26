import { Carousel, Typography, Button } from "@material-tailwind/react";
 
export default function CarouselComponent() {
  return (
    <Carousel
     className="rounded-none lg:h-[30rem] sm:h-[10rem]"
     autoplay={true}
     autoplayDelay={6000}
     loop={true}
     >
      <div className="relative h-full w-full">
        <img
          src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1695628386/carousal-3_hh1zek.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-2xl md:text-4xl lg:text-5xl"
            >
              Meet Our Expert Trainers
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 text-1xl"
            >
              Our experienced trainers are here to help you achieve your fitness goals. Whether you're looking to gain or lose weight or sculpt your physique, we have the perfect program for you.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
              Explore Programs
              </Button>
              <Button size="lg" color="white" variant="text">
              Meet the Trainers
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1695631679/fitbuddy/carousal_-4_jb1hpp.jpg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-2xl md:text-4xl lg:text-5xl"
            >
             Weight Gain Programs
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 text-1xl"
            >
               Our specialized weight gain programs are designed to help you build muscle and achieve a healthy weight. Work with our trainers to reach your weight gain goals.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Explore Programs
              </Button>
              <Button size="lg" color="white" variant="text">
                About us
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1695631679/fitbuddy/carousal_-_5_rtuz3k.webp"
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-2xl md:text-4xl lg:text-5xl"
            >
             Sculpt Your Physique
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 text-1xl"
            >
              Define your body and sculpt the physique you desire with our tailored programs. Our trainers will guide you every step of the way.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Explore Programs
              </Button>
              <Button size="lg" color="white" variant="text">
                About us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

