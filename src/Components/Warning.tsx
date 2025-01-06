import React from "react";

const Warning: React.FC = () => {
  return (
    <div className="fixed md:hidden inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900">
      <div className="flex-col justify-center text-center">
        <div className="text-white">
          <b> HÃY MỞ RỘNG MÀN HÌNH BẠN NHÉ </b>
        </div>
        <div className="text-white">Màn hình nhỏ quá không support được</div>
      </div>
    </div>
  );
};

export default Warning;
