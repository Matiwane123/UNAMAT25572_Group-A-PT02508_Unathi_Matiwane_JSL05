// scripts/main.js

// Selectors
const addTaskBtn = document.getElementById("add-new-task-btn");
const newTaskModal = document.querySelector(".modal-overlay");
const cancelAddBtn = document.getElementById("cancel-add-btn");
const createTaskForm = document.getElementById("new-task-modal-window");

// Local Storage Key
const STORAGE_KEY = "kanbanTasks";

// Initial tasks (seed data)
const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },
  {
    id: 4,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 5,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 6,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

// Load tasks from localStorage on startup
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
  }
  loadTasks();
});

// Open modal
addTaskBtn.addEventListener("click", () => {
  newTaskModal.showModal();
});

// Close modal
cancelAddBtn.addEventListener("click", () => {
  newTaskModal.close();
});

// Handle form submission
createTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;

  if (!title) return; // Prevent empty tasks

  const newTask = { title, description, status };

  // Save to localStorage
  saveTask(newTask);

  // Render immediately
  renderTask(newTask);

  // Update counts
  updateColumnCounts();

  // Reset & close modal
  createTaskForm.reset();
  newTaskModal.close();
});

// Save task to localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  tasks.push(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  tasks.forEach((task) => renderTask(task));
  updateColumnCounts();
}

// Render a task card into the correct column
function renderTask(task) {
  const container = document.querySelector(
    `[data-status="${task.status}"] .tasks-container`,
  );

  if (!container) {
    console.error("No container found for status:", task.status);
    return;
  }

  const card = document.createElement("div");
  card.className = "task-card";
  card.innerHTML = `
    <h5>${task.title}</h5>
    <p>${task.description || ""}</p>
  `;

  // Optional: open task detail modal on click
  card.addEventListener("click", () => openTaskModal(task));

  container.appendChild(card);
}

// Open task detail modal
function openTaskModal(task) {
  const taskModal = document.getElementById("task-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  taskModal.showModal();

  closeModalBtn.addEventListener("click", () => {
    taskModal.close();
  });
}

// Update column headers with counts
function updateColumnCounts() {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const counts = { todo: 3, doing: 2, done: 2 };

  tasks.forEach((task) => {
    if (counts[task.status] !== undefined) {
      counts[task.status]++;
    }
  });

  document.querySelector('[data-status="todo"] .columnHeader').textContent =
    `TODO (${counts.todo})`;
  document.querySelector('[data-status="doing"] .columnHeader').textContent =
    `DOING (${counts.doing})`;
  document.querySelector('[data-status="done"] .columnHeader').textContent =
    `DONE (${counts.done})`;
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("side-bar-div");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");

    // Update button text
    if (sidebar.classList.contains("hidden")) {
      toggleBtn.textContent = "☰ Show Sidebar";
    } else {
      toggleBtn.textContent = "☰ Hide Sidebar";
    }
  });
});

const toggleThemeBtn = document.getElementById("toggleTheme");

// Theme toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Change button text/icon depending on mode
  if (document.body.classList.contains("dark-mode")) {
    toggleThemeBtn.textContent = "☀️ Light Mode";
  } else {
    toggleThemeBtn.textContent = "🌑 Dark Mode";
  }
});
