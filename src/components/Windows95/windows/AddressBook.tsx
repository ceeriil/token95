import { useAddressBook } from "@/store";
import { useState } from "react";
import { Copy, Eye, Trash2 } from "lucide-react";

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

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
  };

  //View Address on Explorer. Future update should allow users 
  //  choose their preferred explorer or we have our mini inapp 
  //  explorer 😤
  const handleView = (address: string) => {
    window.open(`https://explorer.solana.com/address/${address}`, "_blank"); 
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

      <div className="max-h-52 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300">
        {addresses.length === 0 ? (
          <p className="italic text-gray-600">No addresses yet 🥲</p>
        ) : (
          addresses.map((entry) => (
            <div
              key={entry.address}
              className="flex justify-between items-center border border-black py-2 px-3 bg-white mb-2"
            >
              <div className="flex flex-col">
                <p className="font-bold text-sm">{entry.name}</p>
                <div className="flex items-center gap-2 text-gray-700 text-[0.8rem]">
                  <span className="truncate max-w-[120px] font-mono font-medium">
                    {entry.address}
                  </span>
                  <button
                    onClick={() => handleCopy(entry.address)}
                    title="Copy Address"
                    className="hover:opacity-80"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleView(entry.address)}
                    title="View in Explorer"
                    className="hover:opacity-80"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeAddress(entry.address)}
                title="Remove"
                className="ml-2 p-1 border-2 border-black bg-red-500 hover:bg-red-600 text-white shadow-[2px_2px_0_#000]"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
