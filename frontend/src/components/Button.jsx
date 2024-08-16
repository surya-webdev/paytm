function Button({ children, onClick, disabled }) {
  return (
    <button
      className="my-10 rounded-lg bg-black px-2 py-2 text-white"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
