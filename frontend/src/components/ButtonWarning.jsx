import { useNavigate } from "react-router-dom";

const ButtonWarning = ({ label, buttonText, to }) => {
  const navigator = useNavigate();
  return (
    <div>
      <p className="font-medium">
        {label}{" "}
        <span
          onClick={() => navigator(to)}
          className="underline cursor-pointer"
        >
          {buttonText}
        </span>
      </p>
    </div>
  );
};

export default ButtonWarning;
