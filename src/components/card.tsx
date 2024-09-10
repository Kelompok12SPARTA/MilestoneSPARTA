import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type CardProps = {
  id: number
  title: string;
  description: string;
  image: StaticImageData;
  altText: string;
  path: string;
};

function Card({ id, title, description, image, altText, path }: CardProps) {
  return (
    <Link href={path} passHref>
      <div
        className={`hover:scale-[1.01] transition-all shadow-md flex justify-between rounded-xl w-full p-4 bg-gradient-to-r  ${id === 1 ? "from-[#FFD8D8]" : id === 2 ? "from-[#F6E3BE]" : id === 3 ? "from-[#F0EAAC]" : "from-[#CCE0AC]"} to-white to-90%`}
      >
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-2xl text-black">{title}</h1>
          <p className="text-black">{description}</p>
        </div>
        <div className="flex items-center object-cover w-[50px] h-[50px]">
          <Image src={image} alt={altText} className="w-[60px]" />
        </div>
      </div>
    </Link>
  );
}

export default Card;
