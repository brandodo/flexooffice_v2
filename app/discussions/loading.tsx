import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center p-4">
      <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-blue-500" />
    </div>
  );
};

export default Loading;
