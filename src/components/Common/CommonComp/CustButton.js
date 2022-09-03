import React from "react";

const CustButton = ({ content, onClick }) => {
  return (
    <div className="w-full py-1 flex items-center justify-center mt-2">
      <button
        onClick={onClick}
        className={`${
          content === "Remove All" ? "bg-red-500" : "bg-blue-500"
        } text-white px-20 py-3 font-bold tracking-wide rounded-md ${
          content === "Remove All" ? "hover:bg-red-400" : "hover:bg-blue-400"
        } hover:text-slate-200 transition`}
      >
        {content}
      </button>
    </div>
  );
};

export default CustButton;
