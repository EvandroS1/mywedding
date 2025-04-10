import React from "react";

interface CustomDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  picture: string;
}

const Container: React.FC<CustomDivProps> = ({
  picture,
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex flex-col h-screen text-black bg-black w-full justify-end items-center ${className}`}
      {...props}
    >
      <div className="w-full h-2/5 bg-green-800">
      <img
      src={picture}
      alt="Foto de melissa e Evandro"
      className="h-[130%] w-full"
      />
      </div>
      <div className="relative w-full h-3/4 rounded-t-3xl flex px-6  bg-white flex-col justify-center items-center z-4">
      {children}
      </div>
    </div>
  );
};

export default Container;
