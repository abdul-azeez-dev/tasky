import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { IUserState } from "../../store/store";
import { endpoint } from "../../config/config";
import "./CreateUser.css";
// interface IformValues {
//   name: string;
//   type: number;
//   uname: string;
//   pwd: string;
// }
type IformValues = Record<"name" | "uname" | "pwd", string>;

const CreateUser = () => {
  const userData = useSelector((state: IUserState) => state.auth.user);
  let initialFormValue = {
    name: "",
    uname: "",
    pwd: "",
  };
  const [formValues, setFormValues] = useState<IformValues>(initialFormValue);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData?.token)
      fetch(`${endpoint}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth": userData?.token,
        },
        body: JSON.stringify(formValues),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);
          setFormValues(initialFormValue);
        });
    console.log(formValues);
  };
  return (
    <div className="CreateUser">
      <h3>Create {userData?.user === 0 ? "admin" : "user"}</h3>
      <form onSubmit={formHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formValues.name}
            onChange={(v) =>
              setFormValues((state) => ({ ...state, name: v.target.value }))
            }
            autoComplete="off"
            required
          />
          {/* need to create user mapping form if sadmin creates user*/}
          {/* so sadmin can only create admin and admin can create only user */}
          {/* <label htmlFor="type">User type</label>
          <select
            value={formValues.type}
            id="uname"
            onChange={(v) =>
              setFormValues((state) => ({ ...state, type: v.target.value }))
            }
          >
            <option value="1">Admin</option>
            <option value="2">User</option>
          </select> */}
        </div>

        <div className="form-group">
          <label htmlFor="uname">Username</label>
          <input
            type="text"
            id="uname"
            value={formValues.uname}
            onChange={(v) =>
              setFormValues((state) => ({ ...state, uname: v.target.value }))
            }
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            id="pwd"
            value={formValues.pwd}
            onChange={(v) =>
              setFormValues((state) => ({ ...state, pwd: v.target.value }))
            }
            required
          />
        </div>
        <button type="submit" className="btn primary">
          Create user
        </button>
      </form>
    </div>
  );
};
export default CreateUser;
