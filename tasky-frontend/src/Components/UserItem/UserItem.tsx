import { Link } from "react-router-dom";
import { DeleteIcon } from "../../Assets/Icons";
import type { IUsers } from "../../Pages/UserList/UserList";
import "./UserItem.css";

interface IUserItem {
  user: IUsers;
  deleteUser: (id: number) => void;
}
const UserItem = ({ user, deleteUser }: IUserItem) => {
  const deleteHandler = () => {
    if (window.confirm("Do you really want to delete user?"))
      deleteUser(user.user_id);
  };
  return (
    <div className="UserItem m-3">
      <Link to={`/tasks/${user.user_id}`}>{user.name}</Link>
      <button onClick={deleteHandler}>
        <DeleteIcon />
      </button>
    </div>
  );
};
export default UserItem;
