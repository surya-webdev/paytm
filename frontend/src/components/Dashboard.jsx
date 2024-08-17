import { useEffect, useState } from "react";
import { Balance } from "../pages/Balance";
import { Users } from "../pages/Users";
import axios from "axios";

function Dashboard() {
  // user and account

  const [user, setUser] = useState();

  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    async function getData() {
      const res = axios.post("http://localhost:3000/api/v1/user/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.user);
      console.log(res);
    }
    getData();
  }, [token, setUser]);

  return (
    <>
      <div className="flex h-14 justify-between shadow">
        <div className="ml-4 flex h-full flex-col justify-center">
          PayTM App
        </div>
        <div className="flex">
          <div className="mr-4 flex h-full flex-col justify-center">Hello</div>
          <div className="mr-2 mt-1 flex h-12 w-12 justify-center rounded-full bg-slate-200">
            <div className="flex h-full flex-col justify-center text-xl">U</div>
          </div>
        </div>
      </div>
      <Balance />
      <Users />
    </>
  );
}

export default Dashboard;
