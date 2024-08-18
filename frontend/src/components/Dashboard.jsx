import { useCallback, useEffect, useState } from "react";
import { Balance } from "../pages/Balance";
import { Users } from "../pages/Users";
import axios from "axios";

function Dashboard() {
  // user and account

  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/dashboard",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUser(() => res.data.user);

      if (res.data.user._id) {
        console.log(res.data.user._id);
        const response = await axios.post(
          "http://localhost:3000/api/v1/account/balance",

          {},

          {
            headers: {
              userId: res.data.user._id,
            },
          },
        );
        setAccount(response.data.balance);
        console.log(response.data);
      }
      //
    } catch (error) {
      setError(error.message);
      console.error("GET Error:", error);
    } finally {
      setIsLoading(false);
      // setError(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <p>....Loading</p>;
  // if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex h-14 justify-between shadow">
        <div className="ml-4 flex h-full flex-col justify-center">
          PayTM App
        </div>
        <div className="flex">
          <div className="mr-4 flex h-full flex-col justify-center capitalize">
            Hello {user?.firstName}
          </div>
          <div className="mr-2 mt-1 flex h-12 w-12 justify-center rounded-full bg-slate-200">
            <div className="flex h-full flex-col justify-center text-xl">
              {user?.firstName.split("").at(0)}
            </div>
          </div>
        </div>
      </div>
      <Balance value={account} />
      <Users />
    </>
  );
}

export default Dashboard;
// how can i  hit the two different http request in a react component , how can i handle the state and prevent re rendering !.
