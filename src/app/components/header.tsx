import { FC } from "react";
import { FiHelpCircle } from "react-icons/fi";
import Image from "next/image";
import Image1 from "./../../../public/images/img1.svg"
import Image2 from "./../../../public/images/img2.svg"

import Image3 from "./../../../public/images/img3.svg"


const cardData = [
    {
      title: 'Introducing tags',
      description: 'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.',
      imageSrc: Image1,
      altText: 'Illustration',
    },
    {
      title: 'Share Notes Instantly ',
      description: 'Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.',
      imageSrc: Image2,
      altText: 'Illustration',
    },
    {
      title: 'Access Anywhere',
      description: 'Sync your notes across all devices. Stay productive whether youre on your phone, tablet, or computer.',
      imageSrc: Image3,
      altText: 'Illustration',
    },
  ];
  
  
const Header: FC = () => {
  return (
    <header className="bg-white p-2  text-black">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold">Good morning, Joe!</h1>
      <div className="flex items-center space-x-4">
        <span>Help & feedback</span>
        <FiHelpCircle className="text-xl" />
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-4 flex space-x-8">
      {cardData.map((card, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow-lg flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Image src={card.imageSrc} alt={card.altText} width={50} height={50} />
          </div>
          <div>
            <h2 className="text-md font-bold">{card.title}</h2>
            <p className="text-gray-500">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  </header>
  );
};

export default Header;
