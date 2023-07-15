"use client";
import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useLoginModal } from "../../hooks";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Modal } from ".";
import { Button, Heading, Input } from "..";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success("Logged in");
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subTitle="Login to your Account!" />
            <Input
                register={register}
                id="email"
                label="Email"
                errors={errors}
                required
                disabled={isLoading}
            />

            <Input
                register={register}
                id="password"
                label="Password"
                errors={errors}
                required
                disabled={isLoading}
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 border-t-[1px] pt-4">
            <Button
                label="Continue with Google"
                outline
                onClick={() => {}}
                icon={FcGoogle}
            />
            <Button
                label="Continue with Github"
                outline
                onClick={() => {}}
                icon={AiFillGithub}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2 text-center justify-center">
                    <div>Already have an account?</div>
                    <div
                        onClick={loginModal.onClose}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={loginModal.isOpen}
                title="Login"
                actionLabel="Continue"
                onClose={loginModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent}
            />
        </div>
    );
};

export default LoginModal;
