import { useAddressBook } from "@/store";
import { useState } from "react";

export const AddressBook = () => {
  const { addresses, addAddress, removeAddress } = useAddressBook();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleAdd = () => {
    if (name && address) {
      addAddress({ name, address });
      setName("");
      setAddress("");
    }
  };

  return (
    <div className=" bg-gray-100 p-4 w-full  text-sm ">
      <div className="flex flex-col gap-2 mb-4">
        <div>
          <label className="block text-sm mb-1 text-left font-semibold">
            Name:
          </label>
          <input
            placeholder="Name"
            value={name}
            className="w-full p-1.5 border border-black bg-white text-sm font-mono"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-left font-semibold">
            Address:
          </label>
          <input
            placeholder="Wallet Address"
            value={address}
            className="w-full p-1.5 border border-black bg-white text-sm font-mono"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button
          onClick={handleAdd}
          className="mt-4 w-full border border-black bg-blue-500 hover:bg-blue-600 text-white text-sm shadow-[2px_2px_0_#000] py-2"
        >
          Add Address
        </button>
      </div>

      <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-200 pr-2">
        {addresses.length === 0 && <p>No addresses yet 🥲</p>}
        {addresses.map((entry) => (
          <div
            key={entry.address}
            className="flex justify-between items-center border-b border-black py-1"
          >
            <div>
              <p className="font-bold">{entry.name}</p>
              <p className="text-[0.7rem] text-gray-600">{entry.address}</p>
            </div>
            <button
              onClick={() => removeAddress(entry.address)}
              className="ml-2 px-2 py-1 text-red-600 border border-black bg-white"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
