import { useState } from "react";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([
    {
      firstName: "Harkirat",
      lastName: "Singh",
      _id: 1,
    },
  ]);

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
          <User key={user} user={user} />
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
            {user.firstName[0]}
          </div>
        </div>
        <div className="h-ful flex flex-col justify-center">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="h-ful flex flex-col justify-center">
        {/* <Button label={"Send Money"} /> */}
      </div>
    </div>
  );
}
