import "./Status.css";

interface IStatus {
  id: number;
}
const Status = ({ id }: IStatus) => {
  const statusNames: Record<number, string> = {
    0: "New",
    1: "In-Progress",
    2: "Done",
  };
  return <span className={`Status ${statusNames[id]}`}>{statusNames[id]}</span>;
};
export default Status;
