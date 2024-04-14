"use client"
import React, { useRef } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const topRef = useRef<HTMLDivElement>(null); // Specify the expected type

  const handleScrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' }); // Optional chaining
  };

  return (
    <>
      {/* Create a hidden element at the top of the page */}
      <div ref={topRef} style={{ position: 'absolute', top: 0, width: 1, height: 1 }}>
        {/* Hidden element */}
      </div>

      <a
        href=""
        className="fixed bottom-4 right-4 z-50 rounded-full bg-white p-2 shadow-md"
        onClick={handleScrollToTop}
      >
        <FaArrowCircleUp className="text-blue-500 text-3xl" />
      </a>
    </>
  );
};

export default BackToTopButton;
