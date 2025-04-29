interface MenuBarProps {
  onSelect: (item: string) => void;
  activeItem: string | null;
}

const menuItems = ["File", "Edit", "View", "Help"];

export const MenuBar = ({ onSelect, activeItem }: MenuBarProps) => {
  return (
    <div
      className="w-[99%] bg-[#e9e4e4] border-b-2 border-white shadow-inner px-1 py-0.5 mx-auto mb-1"
      style={{ border: "2px groove #000" }}
    >
      <ul
        className="flex space-x-1 text-sm font-semibold text-gray-500 select-none"
        role="menubar"
      >
        {menuItems.map((item) => (
          <li
            key={item}
            tabIndex={0}
            role="menuitem"
            aria-pressed={activeItem === item}
            onClick={() => onSelect(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(item);
            }}
            className={`cursor-pointer hover:text-black px-2 outline-none ${
              activeItem === item ? "text-black underline" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
