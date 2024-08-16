import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("hermoine");
  const [lastName, setLastName] = useState("h");
  const [isMail, setisMail] = useState("hermoine@gmail.com");
  const [password, setPassword] = useState("1234567890");
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-auto my-10 flex w-2/4 flex-col items-center justify-center">
        <p className="text-3xl font-bold">SIGNUP</p>
        <p className="my-2 text-xl font-normal text-gray-500">
          Enter your information to create your account!!
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const res = await axios.post(
              "http://localhost:3000/api/v1/user/signup",
              {
                firstName,
                lastName,
                userName: isMail,
                password,
              },
            );
            console.log(res);
            localStorage.setItem("token", res.data.token);
          }}
          className="flex w-[60%] flex-col py-2"
        >
          <label htmlFor="name" className="my-2 py-2 text-xl font-medium">
            First Name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="name"
            className="rounded-md bg-gray-300 px-1 py-2"
            placeholder="Enter your first name"
          />
          <label htmlFor="lastname" className="my-2 py-2 text-xl font-medium">
            Last Name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastname"
            className="rounded-md bg-gray-300 px-1 py-2"
            placeholder="Enter your last name"
          />
          <label htmlFor="email" className="my-2 py-2 text-xl font-medium">
            Your Email
          </label>
          <input
            value={isMail}
            onChange={(e) => setisMail(e.target.value)}
            id="email"
            type="email"
            className="rounded-md bg-gray-300 px-1 py-2"
            placeholder="Enter your email"
          />
          <label className="my-2 py-2 text-xl font-medium">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded-md bg-gray-300 px-1 py-2"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="my-10 rounded-lg bg-black px-2 py-2 text-white"
          >
            Sign Up
          </button>
        </form>
        <div>
          <p>
            Already you have an account{" "}
            <span>
              <a className="font-semibold underline" href="/signin">
                Login
              </a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
