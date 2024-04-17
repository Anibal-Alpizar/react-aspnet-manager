import { forwardRef, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  styles?: string;
  label?: string;
  labelStyles?: string;
  register?: UseFormRegisterReturn;
  name: string;
  // TODO: Fix the type of error
  error?: any;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type,
      placeholder,
      styles,
      label,
      labelStyles,
      register,
      name,
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
        </div>
        {error && typeof error === "string" && (
          <span className="text-sm text-[#f64949fe] mt-0.5">{error}</span>
        )}
        {error && typeof error !== "string" && (
          <span className="text-sm text-[#f64949fe] mt-0.5">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

export default TextInput;
