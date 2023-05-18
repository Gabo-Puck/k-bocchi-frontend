import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
export const Input = ({ label, type, id, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
        <div className="error">
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </div>
      </div>
      <input
        id={id}
        type={type}
        className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
        placeholder={placeholder}
        {...register(label, {
          required: {
            value: true,
            message: "required",
          },
        })}
      />
    </div>
  );
};

const InputError = ({ message }) => {
  return <div>{message}</div>;
};
