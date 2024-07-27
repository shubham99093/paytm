import { useSearchParams } from "react-router-dom";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";

const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  return (
    <div className="h-screen bg-gray-300 flex justify-center ">
      <div className=" h-full flex flex-col justify-center ">
        <div className="rounded-lg bg-white shadow-lg p-2 w-80 h-max text-center px-4 ">
          <Heading label={"Send Money"} />
          <SubHeading label={"Send money to your friends"} />
          <div className="flex items-center my-3">
            <div className="rounded-full h-12 w-12 bg-green-500 text-white flex justify-center items-center mr-4">
              {name[0].toUpperCase()}
            </div>
            <div className="font-bold text-xl">{name}</div>
          </div>
          <InputBox
            label={"Enter Amount (in Rs)"}
            type={"number"}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={"Enter Amount"}
          />
          <div className="py-3">
            <button
              onClick={() => {
                axios.post(
                  "http://localhost:3000/api/v1/account/transfer",
                  {
                    to: id,
                    amount: amount,
                  },
                  {
                    headers: {
                      authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
              }}
              className="w-full text-white bg-green-500  hover:bg-green-600 focus:outline-none focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 rounded-lg"
            >
              Initate transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
