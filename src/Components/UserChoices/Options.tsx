import { FormEvent, useState } from "react";
import { Sizes } from "../../types";
import { locations } from "../../constant/locationData";

const Options: React.FC = () => {
  const [ratio, setRatio] = useState<Sizes>();
  const [location, setLocation] = useState<number>();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(ratio, location);
  };

  return (
    <form
      className="w-2/4 mx-auto border border-blue-900 rounded-md overflow-hidden m-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="sizes"
          className="block mb-2 m-3 text-sm font-medium text-gray-900"
        >
          Chọn kích cỡ
        </label>
        <select
          id="sizes"
          required
          className="bg-white border m-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          style={{ width: "calc(100% - 2rem)" }}
          defaultValue=""
          onChange={(e) => setRatio(e.target.value as Sizes)}
        >
          <option value="">select size...</option>
          <option value={Sizes._8x11.toString()}>8x11</option>
          <option value={Sizes._8x15.toString()}>8x15</option>
        </select>
      </div>
      <div>
        <label
          className="block mb-2 m-3 text-sm font-medium text-gray-900"
          htmlFor="location"
        >
          Chọn chi nhánh
        </label>
        <select
          id="sizes"
          required
          className="bg-white border m-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          style={{ width: "calc(100% - 2rem)" }}
          onChange={(e) => setLocation(Number(e.target.value))}
          defaultValue=""
        >
          <option value="">select location...</option>
          {locations.map((location, i) => (
            <option key={i} value={location.id}>
              {location.branch}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Options;
