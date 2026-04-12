import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "../utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "../ui/render.js";
import { resetForm } from "./formUtils.js";

export function addNewTask() {
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;
  const overlay = document.querySelector(".modal-overlay");

  if (!title) return;

  const tasks = loadTasksFromStorage();
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    description,
    status,
  };

  const updatedTasks = [...tasks, newTask];
  saveTasksToStorage(updatedTasks);

  clearExistingTasks();
  renderTasks(updatedTasks);
  resetForm();
  overlay.close();
}

// Load tasks on startup
export function initTasks() {
  const tasks = loadTasksFromStorage();
  clearExistingTasks();
  renderTasks(tasks);
}

// Hook up events
export function setupTaskEvents() {
  const addTaskBtn = document.getElementById("add-new-task-btn");
  const newTaskModal = document.querySelector(".modal-overlay");
  const cancelAddBtn = document.getElementById("cancel-add-btn");
  const createTaskForm = document.getElementById("new-task-modal-window");

  // Open modal
  addTaskBtn.addEventListener("click", () => newTaskModal.showModal());

  // Close modal
  cancelAddBtn.addEventListener("click", () => newTaskModal.close());

  // Handle form submission
  createTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewTask();
  });
}
