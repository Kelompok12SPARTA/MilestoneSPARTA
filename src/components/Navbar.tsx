"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "../utils/LocationContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [shadow, setShadow] = useState(false);
  const { location, isLoading } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed bg-[#F1F0F0] text-black px-12 flex w-full h-[80px] z-20 items-center justify-end ${
        shadow ? "shadow-lg" : " "
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <div
          className={`flex items-center justify-center gap-2 text-base text-white h-[50px] px-6 rounded-lg bg-[#624F66] `}
        >
          <div className={location ? "block" : "hidden"}>
            <Image src="/point.svg" width={20} height={20} alt="Location" />
          </div>
          {!isLoading
            ? location.address || "Address not found"
            : "Getting your location..."}
        </div>
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
        <div className={`flex-col sm:flex-row shadow-lg sm:shadow-none sm:flex absolute sm:static pb-6 sm:pb-0 top-[80px] left-0 right-0 sm:top-0 gap-4 items-center justify-center bg-[#F1F0F0] ${isMenuOpen ? "flex" : "hidden"} `}>
          <a href="/">
            <button
              className={`px-8 py-2 border-black rounded-3xl hover:underline ${
                pathname === "/" ? "bg-[#BCC4EE] border-black border-2" : ""
              }`}
            >
              Home
            </button>
          </a>
          <a href="/nearme">
            <button
              className={`px-8 py-2 border-black rounded-3xl hover:underline ${
                pathname === "/nearme"
                  ? "bg-[#BCC4EE] border-black border-2"
                  : ""
              }`}
            >
              Near Me
            </button>
          </a>
          <a href="/under50k">
            <button
              className={`px-8 py-2 border-black rounded-3xl hover:underline ${
                pathname === "/under50k"
                  ? "bg-[#BCC4EE] border-black border-2"
                  : ""
              }`}
            >
              Under 50k
            </button>
          </a>
          <a href="/leaderboard">
            <button
              className={`px-8 py-2 border-black rounded-3xl hover:underline ${
                pathname === "/leaderboard"
                  ? "bg-[#BCC4EE] border-black border-2"
                  : ""
              }`}
            >
              Leaderboard
            </button>
          </a>
          <a href="/today-choice">
            <button
              className={`px-8 py-2 border-black rounded-3xl hover:underline ${
                pathname === "/today-choice"
                ? "bg-[#BCC4EE] border-black border-2" 
                : ""
              }`}
            >
              Today&apos;s Choices
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
