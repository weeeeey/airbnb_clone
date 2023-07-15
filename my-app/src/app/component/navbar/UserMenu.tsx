'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '../';
import { useState, useCallback, useRef, useEffect } from 'react';
import MenuItem from './MenuItem';
import { useLoginModal, useRegisterModal } from '@/app/hooks';

const UserMenu = () => {
    const modalRef = useRef<HTMLDivElement>(null);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((p) => !p);
    }, []);
    useEffect(() => {
        const clickOutside = (e: any) => {
            if (isOpen && !modalRef.current?.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', clickOutside);
        return () => {
            document.removeEventListener('mousedown', clickOutside);
        };
    }, [isOpen]);
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => {}}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 text-sm md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    ref={modalRef}
                    className="absolute top-12 right-0 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm"
                >
                    <div className="flex flex-col cursor-pointer">
                        <>
                            <MenuItem
                                label="Login"
                                onClick={loginModal.onOpen}
                            />
                            <MenuItem
                                label="Sign up"
                                onClick={registerModal.onOpen}
                            />
                        </>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
