import React, { Fragment } from "react";
import { UserData } from "../../types";

type DataBoardProps = {
  fileData: UserData[];
  setData: React.Dispatch<React.SetStateAction<UserData[]>>;
};

const DataBoard: React.FC<DataBoardProps> = ({ fileData, setData }) => {
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const accountToFind = event.currentTarget.value;

    if (window.confirm(`Có chắc chắn muốn xóa stk ${accountToFind}`)) {
      const newData = fileData.filter((data) => {
        return data.accountNumber !== accountToFind;
      });
      setData(newData);
    }
  };

  return (
    <>
      <div className="text-center text-lg font-semibold my-4">
        Danh sách thông tin khách hàng:
      </div>
      <div className="grid p-1 grid-cols-[40px_auto_auto_auto] w-2/4 gap-1 m-auto border rounded border-blue-800 overflow-hidden">
        <div className="p-2 text-center">STT</div>
        <div className="p-2 text-center">Họ và tên</div>
        <div className="p-2 text-center">Số tài khoản</div>
        <div className="p-2 text-center">Xóa khỏi danh sách</div>
        {fileData.map(({ name, accountNumber }, index) => (
          <Fragment key={index}>
            <div
              className={`p-2 text-center ${
                index % 2 === 1 ? "" : "bg-gray-200"
              }`}
            >
              {index}
            </div>
            <div
              className={`p-2 text-center truncate ${
                index % 2 === 1 ? "" : "bg-gray-200"
              }`}
            >
              {name}
            </div>
            <div
              className={`p-2 text-center truncate ${
                index % 2 === 1 ? "" : "bg-gray-200"
              }`}
            >
              {accountNumber}
            </div>
            <div
              className={`p-2 text-center truncate ${
                index % 2 === 1 ? "" : "bg-gray-200"
              }`}
            >
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                onClick={handleDelete}
                value={accountNumber}
              >
                Delete
              </button>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default DataBoard;
