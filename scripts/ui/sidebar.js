const sidebar = document.getElementById("side-bar-div");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const toggleThemeBtn = document.getElementById("toggleTheme");

// Sidebar toggle
toggleSidebarBtn.addEventListener("click", () => {
  // If sidebar is hidden, show it
  if (sidebar.classList.contains("hidden")) {
    sidebar.classList.remove("hidden");
    toggleSidebarBtn.textContent = "☰ Hide Sidebar";
  } else {
    // If sidebar is visible, hide it
    sidebar.classList.add("hidden");
    toggleSidebarBtn.textContent = "👀 Show Sidebar";
    toggleSidebarBtn.classList.add("wiggle"); // playful eyes wiggle
    setTimeout(() => toggleSidebarBtn.classList.remove("wiggle"), 600); // remove after animation
  }
});

// Theme toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleThemeBtn.textContent = "☀️ Light Mode";
  } else {
    toggleThemeBtn.textContent = "🌑 Dark Mode";
  }
});
