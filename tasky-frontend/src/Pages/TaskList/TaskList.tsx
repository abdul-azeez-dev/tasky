import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { IUserState } from "../../store/store";
import { useParams } from "react-router-dom";
import { endpoint } from "../../config/config";
import { ITaskData } from "../../Hooks/useTasks";
import Status from "../../Components/Status/Status";

const TaskList = () => {
  const { userId } = useParams();
  const userData = useSelector((state: IUserState) => state.auth.user);
  const [taskList, setTaskList] = useState<ITaskData[] | []>([]);
  useEffect(() => {
    try {
      if (userData?.token && userId)
        fetch(`${endpoint}/fetchUserTask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth": userData?.token,
          },
          body: JSON.stringify({ uid: userId }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.tasks) setTaskList(data.tasks);
          });
    } catch (e) {
      console.log("Something went wrong");
    }
  }, [userData?.token, userId]);
  console.log(userId);
  return (
    <div className="TaskList m-3">
      <h2>Task list</h2>
      <ol>
        {taskList.map((task) => (
          <li className="m-3" key={task.task_id}>
            {task.task_name} <Status id={task.status} />
          </li>
        ))}
      </ol>
      {taskList.length < 1 && <p>No tasks found</p>}
    </div>
  );
};

export default TaskList;
