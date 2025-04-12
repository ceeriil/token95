import { Settings } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
}

export function ContextMenu({ x, y }: ContextMenuProps) {
  return (
    <div
      className="fixed bg-[#c0c0c0] text-black border border-[#818181] shadow-md  min-w-40"
      style={{ top: y, left: x }}
    >
      <ContextMenuGroup>
        <ContextMenuItem text="Open" icon={<Settings className="h-4 w-4" />} />
      </ContextMenuGroup>
      <ContextMenuGroup>
        <ContextMenuItem
          text="Delete"
          icon={<Settings className="h-4 w-4" />}
        />
      </ContextMenuGroup>
      <ContextMenuGroup>
        <ContextMenuItem
          text="Credits"
          icon={<Settings className="h-4 w-4" />}
        />
      </ContextMenuGroup>
      <ContextMenuGroup>
        <ContextMenuItem
          text="Themes"
          icon={<Settings className="h-4 w-4" />}
        />
      </ContextMenuGroup>
      <ContextMenuGroup>
        <ContextMenuItem
          text="Refresh"
          icon={<Settings className="h-4 w-4" />}
        />
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

function ContextMenuItem({ text, onClick }: ContextMenuItemProps) {
  return (
    <div className="relative">
      <button
        className="w-full text-left px-4 py-1.5 hover:bg-[#d2d1d1]  flex items-center border-b border-[#444] font-medium  "
        onClick={onClick}
      >
        <span>{text}</span>
      </button>
    </div>
  );
}
