import Image from "next/image";

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
    return (
        <Image
            width="30"
            height="30"
            src={src || "/images/placeholder.jpg"}
            alt="Avatar"
            className="rounded-full"
        />
    );
};

export default Avatar;
