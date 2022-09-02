import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import type { IUserState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authSlice";
import CustomRoutes from "./Components/Routes/CustomRoutes";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state: IUserState) => state.auth.user);

  useEffect(() => {
    let localData = localStorage.getItem("token");
    if (!userData && localData) {
      dispatch(login(JSON.parse(localData)));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
}

export default App;
