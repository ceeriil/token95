import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
import { useEffect, useState } from "react";

interface DicebearAvatarProps {
  seed: string;
  size?: number;
  className?: string;
}

export const DicebearAvatar = ({
  seed,
  size = 80,
  className,
}: DicebearAvatarProps) => {
  const [avatarSvg, setAvatarSvg] = useState<string>("");

  useEffect(() => {
    const avatar = createAvatar(pixelArt, {
      seed,
      size,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
    });

    setAvatarSvg(avatar.toDataUri());
  }, [seed, size]);

  return (
    <div
      className={`overflow-hidden bg-gray-100 border-2 border-black ${className}`}
      style={{ width: size, height: size }}
    >
      {avatarSvg && (
        <img
          src={avatarSvg}
          alt="Avatar"
          width={size}
          height={size}
          className="w-full h-full"
        />
      )}
    </div>
  );
};
