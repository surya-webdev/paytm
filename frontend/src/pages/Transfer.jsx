import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Transfer = ({ user }) => {
  //
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [currUser, setCurrUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/user/send",
          {},
          {
            headers: {
              id,
            },
          },
        );
        // console.log(res.data);
        setCurrUser(() => res.data.user);
      } catch (error) {
        console.error("ERROR", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [id]);

  if (isLoading) return <p>....Loading</p>;

  return (
    <div className="flex h-screen justify-center bg-gray-100">
      <div className="flex h-full flex-col justify-center">
        <div className="text-card-foreground h-min w-96 max-w-md space-y-8 rounded-lg border bg-white p-4 shadow-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-center text-3xl font-bold">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <span className="text-2xl text-white">
                  {currUser.firstName.split("")[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{currUser.firstName}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={() => {
                  async function getdata() {
                    const response = await axios.post(
                      "http://localhost:3000/api/v1/account/transfer",
                      {
                        to: id,
                        amount,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );
                    if (response.data.status) {
                      setAmount(() => 0);

                      // alert("PAYMENT SUCESS");
                    }
                    console.log(response.data);
                  }
                  getdata();
                }}
                className="ring-offset-background h-10 w-full justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
