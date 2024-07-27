const Button = ({ children, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full text-white bg-gray-800  hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 rounded-lg"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
