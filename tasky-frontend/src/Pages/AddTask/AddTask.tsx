import { useEffect, useState } from "react";
import TaskItem from "../../Components/TaskItem/TaskItem";
import { useTasks } from "../../Hooks/useTasks";
import "./AddTask.css";

const AddTask = () => {
  const { addTask, removeTask, fetchTasks, modifyTask, taskList } = useTasks();
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);
  const addTaskHandler = () => {
    addTask(taskInput);
    setTaskInput("");
  };

  return (
    <div className="AddTask">
      <input
        type="text"
        value={taskInput}
        onChange={(el) => setTaskInput(el.target.value)}
        className="task-name mr-3"
      />
      <button
        onClick={addTaskHandler}
        disabled={taskInput === "" ? true : false}
        className="btn primary"
      >
        Add task
      </button>
      {taskList.length > 0 ? (
        <div className="task-list">
          <h3>Tasks</h3>
          {taskList.map((task) => (
            <TaskItem
              task={task}
              key={task.task_id.toString()}
              deleteTask={removeTask}
              editTask={modifyTask}
            />
          ))}
          {/* <ol>
            {taskList.map((task, index) => (
              <li key={index.toString()}>
                {task} <button onClick={() => removeTask(task)}>remove</button>
              </li>
            ))}
          </ol> */}
        </div>
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};
export default AddTask;
