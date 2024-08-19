import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Transfer } from "./Transfer";
import { Link } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/others",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      setUsers(res.data.users);
      setIsLoading(false);
    }

    getData();
    //
  }, [token]);

  if (isLoading) return <p>....Loading</p>;

  return (
    <>
      <div className="mt-6 text-lg font-bold">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full rounded border border-slate-200 px-2 py-1"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="mr-2 mt-1 flex h-12 w-12 justify-center rounded-full bg-slate-200">
          <div className="flex h-full flex-col justify-center text-xl">
            {user?.firstName[0]}
          </div>
        </div>
        <div className="h-ful flex flex-col justify-center">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="h-ful flex flex-col justify-center">
        <Link to={`/transfer/${user._id}`}>Send Money</Link>
      </div>
    </div>
  );
}
