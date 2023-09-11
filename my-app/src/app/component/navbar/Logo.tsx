'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                router.push('/');
            }}
            className="hidden md:block cursor-pointer text-rose-500 font-bold text-xl"
        >
            skywnw
        </button>
    );
};

export default Logo;
