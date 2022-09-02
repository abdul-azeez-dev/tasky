import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { IUserState } from "../../store/store";
import { endpoint } from "../../config/config";
import UserItem from "../../Components/UserItem/UserItem";

export interface IUsers {
  name: string;
  user_id: number;
}

const UserList = () => {
  const userData = useSelector((state: IUserState) => state.auth.user);
  const [users, setUsers] = useState<IUsers[] | null>(null);
  useEffect(() => {
    try {
      if (userData?.token && !users)
        fetch(`${endpoint}/fetchUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth": userData?.token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data[0].name) setUsers(data);
          });
    } catch (e) {
      console.log("Something went wrong");
    }
  }, []);
  const deleteUser = (userId: number) => {
    try {
      if (userData?.token && users)
        fetch(`${endpoint}/deleteUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth": userData?.token,
          },
          body: JSON.stringify({ empId: userId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data[0].name) setUsers(data);
          });
    } catch (e) {
      console.log("Something went wrong");
    }
  };
  return (
    <div className="UserList m-3">
      <h2>User list</h2>
      {users ? (
        <ol>
          {users.map((user) => (
            <UserItem key={user.user_id} user={user} deleteUser={deleteUser} />
          ))}
        </ol>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};
export default UserList;
