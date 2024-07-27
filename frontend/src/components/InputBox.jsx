const InputBox = ({ placeholder, label, onChange, type }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2 ">{label}</div>
      <input
        onChange={onChange}
        type={type ? type : "text"}
        placeholder={placeholder}
        className="w-full px-2 py-1 border border-slate-200 rounded"
      />
    </div>
  );
};

export default InputBox;
