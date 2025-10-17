import { Image } from "@heroui/react";
import { observer } from "mobx-react-lite";

interface AvatarImageProps {
  avatar?: string;
  name: string;
  width: number;
  height: number;
}

export const AvatarImage = observer<AvatarImageProps>(
  ({ avatar, width, height, name }) => {
    const letter = name.charAt(0).toUpperCase();

    console.log(letter);

    if (avatar) {
      return (
        <Image
          className="rounded-full object-cover"
          width={width}
          height={height}
          src={avatar}
        />
      );
    }

    return (
      <div
        style={{
          width,
          height,
        }}
        className="rounded-full bg-default text-primary flex items-center justify-center text-xl font-semibold"
      >
        {letter}
      </div>
    );
  }
);
