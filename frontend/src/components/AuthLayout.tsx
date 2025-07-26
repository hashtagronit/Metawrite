import React from "react";

export const AuthLayout: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-[#f9f5f1]  flex items-center justify-center">
      <div className="w-full max-w-md bg-white  shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 ">{title}</h1>
        {children}
      </div>
    </div>
  );
};
