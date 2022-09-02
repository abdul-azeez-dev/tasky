import { useRef, useState } from "react";
import { DeleteIcon, EditIcon } from "../../Assets/Icons";
import Status from "../Status/Status";
import { ITaskData } from "../../Hooks/useTasks";
import "./TaskItem.css";

interface ITaskItem {
  task: ITaskData;
  deleteTask: (id: number) => void;
  editTask: (id: number, name: string, status: number) => void;
}

const TaskItem = ({ task, deleteTask, editTask }: ITaskItem) => {
  const [editMode, setEditMode] = useState(false);
  const statusSelect = useRef<HTMLSelectElement>(null);
  const modifyInput = useRef<HTMLInputElement>(null);

  const editHandler = () => {
    if (modifyInput.current?.value && statusSelect.current?.value) {
      editTask(
        task.task_id,
        modifyInput.current?.value,
        parseInt(statusSelect.current?.value)
      );
      setEditMode(false);
    }
  };

  if (editMode) {
    return (
      <div className="TaskItem">
        <input
          type="text"
          className="update-input"
          defaultValue={task.task_name}
          ref={modifyInput}
        />
        <select defaultValue={task.status} ref={statusSelect}>
          <option value={0}>New</option>
          <option value={1}>In-Progress</option>
          <option value={2}>Done</option>
        </select>
        <span>
          <button className="btn primary mr-3" onClick={editHandler}>
            Update
          </button>
          <button onClick={() => setEditMode(false)} className="btn danger">
            Cancel
          </button>
        </span>
      </div>
    );
  }

  return (
    <div className="TaskItem">
      <span className="task-details">
        #{task.task_id} - {task.task_name}
      </span>
      <span className="actions">
        <Status id={task.status} />
        <button onClick={() => deleteTask(task.task_id)}>
          <DeleteIcon />
        </button>
        <button onClick={() => setEditMode(true)}>
          <EditIcon />
        </button>
      </span>
    </div>
  );
};
export default TaskItem;
