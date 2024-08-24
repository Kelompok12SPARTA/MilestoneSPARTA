import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';

type CardProps = {
  title: string;
  description: string;
  image: StaticImageData;
  altText: string;
  color: string;
  path: string;
}

function Card ({ title, description, image, altText, color, path }: CardProps) {
  return (
    <Link href={path} passHref>
      <div className={`hover:scale-[1.01] transition-all shadow-md flex justify-between rounded-xl w-full p-4 bg-[#${color}]`}>
        <div className='flex flex-col justify-center'>
          <h1 className='font-bold text-2xl'>{title}</h1>
          <p>{description}</p>
        </div>
        <div className='flex items-center object-cover w-[50px] h-[50px]'>
          <Image 
          src={image} 
          alt={altText}
          className='w-[60px]'
          />
        </div>
      </div>
    </Link>
  )
}

export default Card