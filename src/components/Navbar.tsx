"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "../utils/LocationContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [shadow, setShadow] = useState(false);
  const { location, isLoading } = useLocation();
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
        <div className="flex gap-4 items-center justify-center">
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
                pathname === "/today-choice" ? "" : ""
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
