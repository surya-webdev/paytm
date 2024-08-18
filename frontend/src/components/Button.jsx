function Button({ children, onClick, href, disabled }) {
  return (
    <button
      href={href}
      className="mx-6 rounded-lg bg-black px-2 py-2 text-white"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
