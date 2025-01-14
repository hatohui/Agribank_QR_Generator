import React, { useEffect, useState } from "react";

const HowToUse: React.FC = () => {
  const [imagePath, setImagePath] = useState<string>("");

  useEffect(() => {
    const fetchImagePath = async () => {
      const path = await window.ipcRenderer.invoke(
        "get-image-file-path",
        "example.png"
      );
      setImagePath(path as string);
    };
    fetchImagePath();
  }, []);

  return (
    <div className="w-2/4 mx-auto border border-blue-900 rounded-md overflow-hidden m-5">
      <div className="px-5 m-5 flex flex-col gap-3">
        <div className="text-lg">
          <b>Cách dùng App:</b>
        </div>
        <div>
          1. Chọn chi nhánh, địa chỉ lưu hình rồi click vào nút
          <span className="text-blue-600"> LƯU </span>
          để lưu địa chỉ lưu ảnh (nếu dùng)
        </div>
        <div>
          2. Chọn File Excel để app đọc, nếu đúng với format sẽ hiện ra thông
          tin để mình chỉnh sửa
          <div className="ml-5 text-sm">
            <div>* Lưu ý:</div>
            <div className="ml-3">
              <div>
                - Tệp phải kết thúc bằng <b>.xlsx</b>
              </div>
              <div>
                - Cột đầu tiên (số 1) là tên các cột và app sẽ bỏ qua trong quá
                trình đọc
              </div>
              <div>
                - Phải chính xác theo format sau:
                <div className="flex justify-center">
                  <img
                    src={imagePath}
                    className="border border-black rounded m-3"
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div>
            3. Sau khi đọc, bạn có thể xóa các thông tin bị sai/không cần thiết
            (nếu có) bằng cách ấn nút
            <span className="text-red-600"> DELETE</span>
          </div>
          <div>
            4. Nếu có thể tiếp tục, nút
            <span className="text-green-500"> TIẾP </span>
            sẽ hiện lên ngay cạnh nút
            <span className="text-blue-600"> LƯU </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
