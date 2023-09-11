'use client';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
    id:
        | 'password'
        | 'email'
        | 'name'
        | 'title'
        | 'description'
        | 'price'
        | 'passwordConfirm';
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}
interface RegisterProp {
    pattern: string;
    maxLength: number;
}
const reg = {
    password: {
        minLength: 8,
        maxLength: 15,
        pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=_])(?=.*[0-9]).{8,25}$/,
    },
    passwordConfirm: {
        minLength: 8,
        maxLength: 15,
        pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=_])(?=.*[0-9]).{8,25}$/,
    },
    name: {
        minLength: 2,
        maxLength: 15,
        pattern: /^[A-Za-z]+$/,
    },
    email: {
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    title: {
        minLength: 2,
        maxLength: 20,
        pattern: /^[가-힣a-zA-Z]*$/,
    },
    description: {
        minLength: 2,
        maxLength: 50,
        pattern: /.*$/,
    },
    price: {
        minLength: 1,
        maxLength: 50,
        pattern: /^[0-9]+$/,
    },
};
const Input = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors,
}: InputProps) => {
    const { maxLength, minLength, pattern } = reg[id];

    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="text-neutral-700 absolute top-5 left-2"
                />
            )}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required, pattern, maxLength, minLength })}
                placeholder=" "
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
                    formatPrice ? 'pl-8' : 'pl-4'
                } ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} ${
                    errors[id] ? 'focus:border-rose-500' : 'focus:border-black'
                }`}
            />
            <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
                    formatPrice ? 'left-9' : 'left-4'
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                    errors[id] ? 'text-rose-500' : 'text-zinc-400'
                }`}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
