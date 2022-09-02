import { useSelector } from "react-redux";
import type { IUserState } from "../store/store";

export const useAuth = () => {
  const userData = useSelector((state: IUserState) => state.auth.user);
  let localData = localStorage.getItem("token");
  if (localData && userData) return true;
  return false;
};
