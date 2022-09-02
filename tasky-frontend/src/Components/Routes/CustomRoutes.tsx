import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import type { IUserState } from "../../store/store";
import { useSelector } from "react-redux";
import ProtectedtRoute from "./ProtectedtRoute";
import Login from "../../Pages/Login/Login";
import HomeLayout from "../Layout/HomeLayout";
import AddTask from "../../Pages/AddTask/AddTask";
import CreateUser from "../../Pages/CreateUser/CreateUser";
import AdminDashboard from "../../Pages/AdminDashboard/AdminDashboard";
import UserList from "../../Pages/UserList/UserList";
import TaskList from "../../Pages/TaskList/TaskList";

const CustomRoutes = () => {
  const isAuth = useAuth();
  const userData = useSelector((state: IUserState) => state.auth.user);
  console.log("route component called");

  enum Roles {
    sadmin,
    admin,
    user,
  }

  // if (isAuth)
  //   return (
  //     <Routes>
  //       <Route path="/" element={<HomeLayout />}>
  //         {/* Route for superAdmin */}
  //         <Route element={<ProtectedtRoute role={Roles.sadmin} />}>
  //           <Route path="home" element={<CreateUser />} />
  //         </Route>
  //         {/* Route for admin */}
  //         <Route element={<ProtectedtRoute role={Roles.admin} />}>
  //           <Route path="add-task" element={<AddTask />} />
  //         </Route>
  //         {/* Route for user */}
  //         <Route element={<ProtectedtRoute role={Roles.user} />}>
  //           <Route path="home" element={<AddTask />} />
  //         </Route>
  //         <Route path="*" element={<>URL not found</>} />
  //       </Route>
  //     </Routes>
  //   );

  /* Route for user */
  if (isAuth && userData?.user === Roles.user)
    return (
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<AddTask />} />
          <Route path="/home" element={<AddTask />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    );
  if (isAuth && userData?.user === Roles.admin)
    return (
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<CreateUser />} />
          <Route path="/home" element={<CreateUser />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/tasks/:userId" element={<TaskList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    );
  if (isAuth && userData?.user === Roles.sadmin)
    return (
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<CreateUser />} />
          <Route path="home" element={<CreateUser />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    );
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default CustomRoutes;
