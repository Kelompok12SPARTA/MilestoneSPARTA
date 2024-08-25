"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [shadow, setShadow] = useState(false);
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
      <div className="flex gap-4">
        <a href="/">
          <button
            className={`px-8 py-2 border-black rounded-3xl hover:border-2 ${
              pathname === "/" ? "bg-[#BCC4EE] border-black border-2" : ""
            }`}
          >
            Home
          </button>
        </a>
        <a href="/nearme">
          <button
            className={`px-8 py-2 border-black rounded-3xl hover:underline ${
              pathname === "/nearme" ? "bg-[#BCC4EE] border-black border-2" : ""
            }`}
          >
            Near Me
          </button>
        </a>
        <a href="/under50k">
          <button
            className={`px-8 py-2 border-black rounded-3xl hover:underline ${
              pathname === "/under50k" ? "" : ""
            }`}
          >
            Under 50k
          </button>
        </a>
        <a href="/leaderboard">
          <button
            className={`px-8 py-2 border-black rounded-3xl hover:underline ${
              pathname === "/leaderboard" ? "" : ""
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
    </nav>
  );
};

export default Navbar;
