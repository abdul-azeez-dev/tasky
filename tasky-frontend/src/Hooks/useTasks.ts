import { useState } from "react";
import { useSelector } from "react-redux";
import type { IUserState } from "../store/store";
import { endpoint } from "../config/config";

export interface ITaskData {
  task_id: number;
  task_name: string;
  status: number;
}
interface ModifyData {
  id: number;
  name: string;
  status: number;
}
type UpdateData = string | number | ModifyData;
export const useTasks = () => {
  const [taskList, setTaskList] = useState<ITaskData[]>([
    // { task_id: 1, task_name: "test1", status: 0 },
    // { task_id: 3, task_name: "test2", status: 0 },
  ]);
  const userData = useSelector((state: IUserState) => state.auth.user);
  const fetchTasks = () => {
    let response;
    if (userData?.token) {
      fetch(`${endpoint}/tasks`, {
        headers: {
          "x-auth": userData?.token,
        },
      })
        .then((res) => (response = res.json()))
        .then((data) => setTaskList(data.tasks));
      return response;
    }
  };

  const updateTask = (operation: string, ipData: UpdateData) => {
    if (userData?.token) {
      fetch(`${endpoint}/${operation}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth": userData?.token,
        },
        body: JSON.stringify({ task: ipData }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTaskList(data.tasks);
        });
    } else {
      alert("Session out! Reloading the page");
      window.location.href = "/";
    }
  };

  const addTask = (taskInput: string) => {
    if (!taskList.some((t) => t.task_name === taskInput)) {
      updateTask("add", taskInput);
    }
  };

  const removeTask = (task: number) => {
    updateTask("remove", task);
  };
  const modifyTask = (id: number, name: string, status: number) => {
    updateTask("modify", { id, name, status });
  };
  return {
    fetchTasks,
    addTask,
    removeTask,
    modifyTask,
    setTaskList,
    taskList,
    endpoint,
  };
};
