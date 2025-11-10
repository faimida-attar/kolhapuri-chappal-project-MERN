import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    alert("Thank you for subscribing! 🎉"); // optional: feedback on subscribe
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl shadow-lg p-8 md:p-12 text-center my-12">
      <p className="text-2xl md:text-3xl font-bold text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-600 mt-3 md:text-base">
        Join our newsletter and get exclusive updates on authentic, handmade
        Kolhapuri chappals. Discover new designs, special offers, and tips for
        styling your footwear!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex flex-col sm:flex-row items-center gap-3 mx-auto my-6 border rounded-full overflow-hidden"
      >
        <input
          className="w-full sm:flex-1 px-4 py-3 sm:py-2 outline-none text-gray-700 text-sm sm:text-base"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white text-sm sm:text-base px-6 py-3 sm:px-10 sm:py-2 rounded-full font-medium hover:bg-purple-700 hover:scale-105 transition-all duration-300"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
