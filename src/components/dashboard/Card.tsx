import React from "react";

type CardProps = {
  title: string;
  value: number;
  icon: string;
};

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center">
        <span className={`mr-2 bg-gray-200 p-2 rounded-full text-gray-600`}>
          {icon}
        </span>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
