import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";

const AdminDashboard = () => {
  return (
    <div className="AdminDashboard">
      <Card>
        <Link to="/create-user">Create user</Link>
      </Card>
    </div>
  );
};
export default AdminDashboard;
