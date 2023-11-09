import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="grid  bg-gray-100 mt-16 mb-4">
      <div className="grid md:grid-cols-2">
        <div className="px-5 md:ml-10 h-3/4 mt-5">
          <img
            src="https://res.cloudinary.com/duuwbsmdu/image/upload/v1699530176/fitbuddy/pic_for_about_page_ueoc2i.jpg"
            alt=""
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        <div className="flex items-center justify-center h-3/4 mt-2  md:mt-5 gap-5 md:ml-5 px-5">
          <p className="font-sans">
            <span className="font-semibold">Fitbuddy </span>with online training by professional trainers allow you
            to work with a certified personal trainer from the comfort of your
            own home. The trainer will create a personalized training plan for
            you, provide video demonstrations of each exercise, and answer your
            questions in real time via live chat. This gives you the convenience
            and support of a personal trainer without having to pay for
            expensive gym membership or travel to and from the gym.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
