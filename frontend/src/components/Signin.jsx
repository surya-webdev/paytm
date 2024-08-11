function Signin() {
  return (
    <div className="mx-auto my-10 flex w-2/4 flex-col items-center justify-center">
      <p className="text-3xl font-bold">SIGNIN</p>
      <p className="my-2 text-xl font-normal text-gray-500">
        Enter your information to login in your account!!
      </p>

      <form className="flex w-[60%] flex-col py-2">
        <label htmlFor="email" className="my-2 py-2 text-xl font-medium">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          className="rounded-md bg-gray-300 px-1 py-2"
          placeholder="Enter your email"
        />
        <label className="my-2 py-2 text-xl font-medium">Password</label>
        <input
          type="password"
          className="rounded-md bg-gray-300 px-1 py-2"
          placeholder="Enter your password"
        />
        <button
          type="submit"
          className="my-10 rounded-lg bg-black px-2 py-2 text-white"
        >
          Login
        </button>
      </form>
      <div>
        <p>
          Create your own account{" "}
          <span>
            <a className="font-semibold underline" href="/">
              Signup
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signin;
