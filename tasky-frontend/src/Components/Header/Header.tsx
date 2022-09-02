import { useDispatch, useSelector } from "react-redux";
import type { IUserState } from "../../store/store";
import { logout } from "../../store/authSlice";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: IUserState) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  return (
    <div className="Header">
      <nav>
        {userData?.user !== 2 && <Link to="/create-user">Create user</Link>}
        {userData?.user === 1 && <Link to="/user-list">User List</Link>}
      </nav>
      <div className="user-details">
        <span className="user-name">Welcome {userData?.name}!</span>
        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;
