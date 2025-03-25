interface ButtonProps {
  onClick: (event: React.FormEvent) => void;
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export default function Button({ onClick, type, children }: ButtonProps) {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
}
