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
    <div className="border-2 border-black bg-gray-100 p-4 w-full max-w-md font-mono text-sm shadow-[4px_4px_0_black]">
      <h2 className="text-lg font-bold mb-2">📇 Address Book 98</h2>

      <div className="flex flex-col gap-2 mb-4">
        <input
          placeholder="Name"
          value={name}
          className="border border-black px-2 py-1"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Wallet Address"
          value={address}
          className="border border-black px-2 py-1"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-white border border-black px-2 py-1 active:translate-x-[1px] active:translate-y-[1px]"
        >
          ➕ Add Address
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
