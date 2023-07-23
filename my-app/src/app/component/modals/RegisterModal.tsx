"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { useRegisterModal, useLoginModal } from "../../hooks";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Modal } from "./";
import { Button, Heading, Input } from "../";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("Success Register");
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((e) => {
                toast.error("Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome Airbnb" subTitle="Create an Account!" />
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
                id="name"
                label="Name"
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
                onClick={() => {
                    signIn("google");
                }}
                icon={FcGoogle}
            />
            <Button
                label="Continue with Github"
                outline
                onClick={() => {
                    signIn("github");
                }}
                icon={AiFillGithub}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2 text-center justify-center">
                    <div>Already have an account?</div>
                    <div
                        onClick={onToggle}
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
                isOpen={registerModal.isOpen}
                title="Register"
                actionLabel="Continue"
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent}
            />
        </div>
    );
};

export default RegisterModal;
