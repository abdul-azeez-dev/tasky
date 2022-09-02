import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useTasks } from "./useTasks";

let globalAny: any = global;

// const unmockedFetch = global.fetch;
// beforeAll(() => {
//   Promise.resolve({
//     json: () => Promise.resolve({ tasks: ["Team meeting", "workshop", "new"] }),
//   });
// });
// afterAll(() => {
//   global.fetch = unmockedFetch;
// });
// const unmockedFetch = global.fetch;

// beforeAll(() => {
//   globalAny.fetch = () =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve({ tasks: ["Team meeting", "workshop", "new"] }),
//     });
// });

// afterAll(() => {
//   global.fetch = unmockedFetch;
// });

test("hook data initialized", () => {
  const { result } = renderHook(() => useTasks());
  expect(result.current.taskList).toStrictEqual([]);
});
test("data fetch works", async () => {
  globalAny.fetch = () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ tasks: ["Team meeting", "workshop", "newTask"] }),
    });
  const { result } = await renderHook(() => useTasks());
  await act(() => result.current.fetchTasks());
  expect(result.current.taskList).toStrictEqual([
    "Team meeting",
    "workshop",
    "newTask",
  ]);
});
test("hook data added", async () => {
  globalAny.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve({ tasks: ["New"] }),
    });
  const { result } = renderHook(() => useTasks());
  await act(() => result.current.addTask("New"));
  expect(result.current.taskList).toStrictEqual(["New"]);
  console.log(result.current.taskList)
});
