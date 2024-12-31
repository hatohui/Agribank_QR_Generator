import React from "react";
// import readXlsxFile from "read-excel-file";

const ExcelFileReader: React.FC = () => {
  const handleFileInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <form onSubmit={handleFileInput}>
      <input type="file" id="input" />
      <button type="submit" />
    </form>
  );
};

export default ExcelFileReader;
