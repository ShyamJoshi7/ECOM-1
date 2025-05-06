import React, { useEffect, useState } from "react";

const msg = [
  "!! UPTO 20% OFF ON SELECT WALL PLATES, TRAYS & CERAMICS – SHOP NOW !!",
  "✨ FREE SHIPPING ON ORDERS ABOVE ₹999 – LIMITED TIME OFFER!",
  "🎁 BUY 2 GET 1 FREE ON ALL HOME ACCENTS – ADD TO CART NOW!",
];
const TopBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % msg.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="bg-[#f5d6a3] text-green-800 font-semibold text-sm overflow-hidden h-[38px] flex items-center justify-center">
      <div key={index} className="animate-slide-in whitespace-nowrap px-4">
        {msg[index]}
      </div>
    </div>
  );
};

export default TopBanner;
