import Image from "next/image";

const Avatar = () => {
    return (
        <Image
            width="30"
            height="30"
            src="/images/placeholder.jpg"
            alt="Avatar"
            className="rounded-full"
        />
    );
};

export default Avatar;
