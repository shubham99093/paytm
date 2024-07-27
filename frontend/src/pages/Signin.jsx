import axios from "axios";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import ButtonWarning from "../components/ButtonWarning";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  return (
    <div className="bg-[#7b7b7c] h-screen flex justify-center">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white shadow-lg p-2 w-80 h-max text-center px-4">
          <Heading label={"Sign In"} />
          <SubHeading
            label={"Enter your Creadentials to access your account"}
          />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@example.com"}
            onChange={(e) => setUsername(e.targer.value)}
          />
          <InputBox
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              onClick={() => {
                const responce = axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", responce.data.token);
                navigator("/dashboard");
              }}
            >
              Sign In
            </Button>
          </div>
          <ButtonWarning
            label={"Don't have account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
