import { useDesktop } from "../context/DesktopContext";

interface ContextMenuProps {
  x: number;
  y: number;
}

export function ContextMenu({ x, y }: ContextMenuProps) {
  const { openWindow, openAlert } = useDesktop();

  return (
    <div
      className="fixed bg-[#c0c0c0] text-black border border-[#818181] shadow-md  min-w-40"
      style={{ top: y, left: x }}
    >
      <ContextMenuGroup>
        <ContextMenuItem
          text="New"
          onClick={() => {
            openAlert({
              message: `You clicked 'New'. We weren’t ready for that kinda commitment."`,
              linkUrl: "https://x.com/ceeriil",
              linkText: "Suggest a feature",
            });
          }}
        />
      </ContextMenuGroup>
      <ContextMenuGroup>
        <ContextMenuItem
          text="Delete"
          onClick={() => {
            openAlert({
              message: `Yo bruh, why you tryna delete that 😭 This ain't the way. We can fix it, fr"`,
              linkUrl: "https://x.com/ceeriil",
              linkText: "Talk to someone about it",
            });
          }}
        />
      </ContextMenuGroup>
      <ContextMenuGroup>
        <ContextMenuItem text="About" onClick={() => openWindow("about")} />
      </ContextMenuGroup>
      <ContextMenuGroup>
        <ContextMenuItem text="Themes" onClick={() => openWindow("themes")} />
      </ContextMenuGroup>
      <ContextMenuGroup>
        <ContextMenuItem text="Refresh" onClick={() => location.reload()} />
      </ContextMenuGroup>
    </div>
  );
}

function ContextMenuGroup({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

interface ContextMenuItemProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function ContextMenuItem({ text, icon, onClick }: ContextMenuItemProps) {
  return (
    <div className="relative">
      <button
        className="w-full text-left px-4 py-1.5 hover:bg-[#d2d1d1] flex items-center border-b border-[#444] font-medium"
        onClick={onClick}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{text}</span>
      </button>
    </div>
  );
}
