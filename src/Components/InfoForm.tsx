import React, { useState } from "react";

const InfoForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");

  //handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "account":
        setAccountNumber(e.target.value);
        break;
      default:
        console.error("error");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, accountNumber);
  };

  return (
    <div className="container mx-auto border border-gray-800 rounded p-5 mt-2">
      <div className="row mb-3"> Account Details</div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              onChange={handleChange}
              value={name}
            />
          </div>
        </div>
        <div>
          <label htmlFor="account">Account: </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="account"
            value={accountNumber}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="border border-black hover:bg-gray-500/70 rounded w-32"
            type="submit"
          >
            Get QR
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoForm;
