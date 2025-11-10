import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="px-4 md:px-16">
      {/* Hero / About Header */}
      <div className="text-3xl md:text-4xl text-center pt-10 pb-6 border-t font-bold text-gray-800">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* About Section */}
      <div className="my-10 flex flex-col md:flex-row gap-12 items-center bg-gradient-to-r from-purple-50 to-white rounded-lg shadow-lg p-6 md:p-12 transition-all duration-500 hover:scale-101">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-lg"
          src={assets.about_img}
          alt="Kolhapuri Chappal"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700">
          <p className="transition-transform duration-500 hover:translate-y-1">
            Kolhapuri Chappal was started with love for tradition and a goal to
            make shopping for handmade chappals easy and enjoyable. Our journey
            began with a simple thought: to build a website where people can
            find and buy beautiful Kolhapuri chappals from the comfort of their
            homes.
          </p>
          <p className="transition-transform duration-500 hover:translate-y-1">
            Since the beginning, we have worked hard to bring together a wide
            collection of high-quality, stylish, and comfortable chappals. We
            work with skilled makers to offer original designs that suit men,
            women, and kids for every occasion.
          </p>
          <div className="bg-purple-100 text-purple-800 px-4 py-3 rounded-lg shadow-md">
            <b>Our Mission:</b> Our mission at Kolhapuri Chappal is to give our
            customers the best choices, comfort, and a smooth shopping
            experience. From searching for products to placing an order and
            getting it delivered, we ensure everything is easy and satisfying
            for you.
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-2xl md:text-3xl text-center py-6 font-semibold text-gray-800">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-20">
        {[
          {
            title: "Quality Assurance",
            desc: "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
          },
          {
            title: "Convenience",
            desc: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
          },
          {
            title: "Exceptional Customer Service",
            desc: "Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex-1 bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
          >
            <b className="text-purple-600 text-lg md:text-xl">{item.title}</b>
            <p className="mt-3 text-gray-600 text-sm md:text-base">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default About;
