import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AddressEntry {
  name: string;
  address: string;
}

interface AddressBookStore {
  addresses: AddressEntry[];
  addAddress: (entry: AddressEntry) => void;
  removeAddress: (address: string) => void;
}

export const useAddressBook = create<AddressBookStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      addAddress: (entry) => {
        const exists = get().addresses.some((a) => a.address === entry.address);
        if (!exists) {
          set((state) => ({
            addresses: [...state.addresses, entry],
          }));
        }
      },
      removeAddress: (address) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.address !== address),
        }));
      },
    }),
    {
      name: "address-book-98",
    }
  )
);
