import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import ButtonWarning from "../components/ButtonWarning";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  return (
    <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white shadow-lg p-2 w-80 h-max text-center px-4">
          <Heading label="Sign Up" />
          <SubHeading label="Enter your informaton to create an account" />
          <InputBox
            label="First Name"
            placeholder="john"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label="Last Name"
            placeholder="Doe"
            onChange={(e) => setLastname(e.target.value)}
          />
          <InputBox
            label="Email"
            placeholder="johndoe@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label="Password"
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const responce = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    firstname,
                    lastname,
                    password,
                  }
                );
                localStorage.setItem("token", responce.data.token);
                navigator("/dashboard");
              }}
            >
              Sign Up
            </Button>
          </div>
          <ButtonWarning
            label="Already have an account?"
            buttonText="Login"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
