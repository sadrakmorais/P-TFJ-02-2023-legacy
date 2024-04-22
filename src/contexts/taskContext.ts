import { reactive, computed } from "vue";
import { TaskProps } from "../@types/task";
import userContext from "./userContext";

type TaskState = {
  tasks: TaskProps[];
};

const localStorageKey = "tasks";

function getInitialTasks(): TaskProps[] {
  const tasksJson = localStorage.getItem(localStorageKey);
  return tasksJson ? JSON.parse(tasksJson) : [];
}

const state: TaskState = reactive({
  tasks: getInitialTasks(),
});

function saveTasks() {
  localStorage.setItem(localStorageKey, JSON.stringify(state.tasks));
}

function addTask(task: TaskProps) {
  state.tasks.push(task);
  saveTasks();
}

function updateTask(taskId: string, updatedTask: TaskProps) {
  const index = state.tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    state.tasks[index] = updatedTask;
    saveTasks();
  }
}

function deleteTask(taskId: string) {
  const index = state.tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    state.tasks.splice(index, 1);
    saveTasks();
  }
}

const filteredTasks = computed(() => {
  const loggedInUser = userContext.state.user;
  if (loggedInUser) {
    return {
      notStarted: state.tasks.filter(
        (task) =>
          task.created_by === loggedInUser.email &&
          task.status === "not-started"
      ),
      inProgress: state.tasks.filter(
        (task) =>
          task.created_by === loggedInUser.email &&
          task.status === "in-progress"
      ),
      finished: state.tasks.filter(
        (task) =>
          task.created_by === loggedInUser.email && task.status === "finished"
      ),
    };
  } else {
    return {
      notStarted: [],
      inProgress: [],
      finished: [],
    };
  }
});

export default {
  state,
  addTask,
  updateTask,
  deleteTask,
  getInitialTasks,
  filteredTasks,
};
