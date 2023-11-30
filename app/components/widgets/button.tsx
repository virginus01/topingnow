export default function CustomButton({
  children,
  color = "indigo",
  disabled = false,
  onClick,
  size = "md",
  type,
  className = "w-2/5 h-8",
}) {
  return (
    <button
      type={type}
      className={`
        text-white rounded-${size}
        bg-${color}-500 
        hover:bg-${color}-600
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
