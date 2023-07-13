"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { useRegisterModal } from "../../hooks";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Modal } from "./";
import { Heading, Input } from "../";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
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
                registerModal.onClose();
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
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
            />
        </div>
    );
};

export default RegisterModal;
