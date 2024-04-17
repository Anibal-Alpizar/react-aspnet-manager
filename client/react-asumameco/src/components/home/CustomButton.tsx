import { CustomButtonProps } from "../../interfaces/ui/buttonProps";

function CustomButton({
  title,
  containerStyles,
  iconRight,
  type,
  onClick,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type as "submit" | "button" | "reset" | undefined}
      className={`inline-flex items-center text-base ${containerStyles}`}
    >
      {title}

      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  );
}

export default CustomButton;
