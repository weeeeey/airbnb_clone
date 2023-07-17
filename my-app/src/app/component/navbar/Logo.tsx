"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (
        <Image
            onClick={() => {
                router.push("/");
            }}
            src="/images/logo.svg"
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height="100"
            width="100"
        ></Image>
    );
};

export default Logo;
