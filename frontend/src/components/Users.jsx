import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => setUsers(response.data.user));
    console.log(users);
  }, [filter]);
  return (
    <div>
      <div className="font-bold text-2xl mt-6">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users
          ? users.map((user, index) => <User key={index} user={user} />)
          : "No users"}
      </div>
    </div>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between my-2 ">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center ">
          <div className="flex flex-col justify-center h-full text-lg">
            <div>
              {user.firstname[0].toUpperCase()}
              {user.lastname[0].toUpperCase()}
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold text-lg ml-2">
            {user.firstname} {user.lastname}
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            navigate("/sendMoney?id=" + user?._id + "&name=" + user?.firstname);
          }}
        >
          Send Money
        </Button>
      </div>
    </div>
  );
};

export default Users;
