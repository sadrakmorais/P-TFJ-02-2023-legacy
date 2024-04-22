import taskContext from "@/contexts/taskContext";
import { TaskProps } from "@/@types/task";

type StoreType = {
  [key: string]: string;
};

const localStorageMock = (() => {
  let store: StoreType = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("taskContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a task to the state", () => {
    const task: TaskProps = {
      id: "1",
      title: "Task 1",
      description: "",
      created_by: null,
      status: "not-started",
    };
    taskContext.addTask(task);
    expect(taskContext.state.tasks).toHaveLength(1);
    expect(taskContext.state.tasks[0]).toEqual(task);
  });

  it("updates a task in the state", () => {
    const task: TaskProps = {
      id: "1",
      title: "Task 2",
      description: "",
      created_by: null,
      status: "not-started",
    };
    const updatedTask: TaskProps = { ...task, title: "Updated Task" };
    taskContext.addTask(task);
    taskContext.updateTask(task.id, updatedTask);
    expect(taskContext.state.tasks).toHaveLength(2);
    expect(taskContext.state.tasks[0]).toEqual(updatedTask);
  });

  it("deletes a task from the state", () => {
    const task1: TaskProps = {
      id: "1",
      title: "Task 1",
      description: "",
      created_by: null,
      status: "not-started",
    };
    const task2: TaskProps = {
      id: "2",
      title: "Task 2",
      description: "",
      created_by: null,
      status: "in-progress",
    };
    taskContext.addTask(task1);
    taskContext.addTask(task2);
    taskContext.deleteTask(task1.id);
    expect(taskContext.state.tasks).toHaveLength(3);
  });

  it("returns initial tasks from local storage", () => {
    const task1: TaskProps = {
      id: "1",
      title: "Task 1",
      description: "",
      created_by: null,
      status: "not-started",
    };
    const task2: TaskProps = {
      id: "2",
      title: "Task 2",
      description: "",
      created_by: null,
      status: "in-progress",
    };
    localStorage.setItem("tasks", JSON.stringify([task1, task2]));
    taskContext.getInitialTasks();
  });
});
