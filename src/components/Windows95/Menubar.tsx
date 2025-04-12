const menuItems = ["File", "Edit", "View", "Help"];

export const MenuBar = () => {
  return (
    <div
      className="w-[99%] bg-[#e9e4e4] border-b-2 border-white shadow-inner px-1 py-0.5 mx-auto mb-1 "
      style={{ border: "2px groove #000" }}
    >
      <ul className="flex space-x-1 text-sm font-semibold text-gray-500 select-none">
        {menuItems.map((item) => (
          <li key={item} className="cursor-pointer hover:text-black px-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
