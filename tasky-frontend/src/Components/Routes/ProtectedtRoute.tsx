import { Navigate, Outlet } from "react-router-dom";
import type { IUserState } from "../../store/store";
import { useSelector } from "react-redux";
import Header from "../Header/Header";

interface IProtectedtRoute {
  role: number;
}
const ProtectedtRoute = ({ role }: IProtectedtRoute) => {
  const userData = useSelector((state: IUserState) => state.auth.user);
  console.log("role", userData?.user, role);
  if (userData?.user === role) return <Outlet />;
  return <></>;
};
export default ProtectedtRoute;

function Test() {
  console.log("test caled");
  return <p>Hello</p>;
}
