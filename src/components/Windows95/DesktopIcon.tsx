interface DesktopIconProps {
  label: string;
  icon: string;
  onClick: () => void;
}

export function DesktopIcon({ label, icon, onClick }: DesktopIconProps) {
  return (
    <div
      className="flex flex-col items-center select-none cursor-pointer  p-2"
      onClick={onClick}
      onDoubleClick={onClick}
      tabIndex={0}
    >
      <img src={`/img/${icon}`} alt="" width={42} height={42} />
      <div className="text-sm font-bold mt-1">{label}</div>
    </div>
  );
}
