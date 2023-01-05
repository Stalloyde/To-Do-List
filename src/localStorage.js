import { indexOf, xor } from "lodash";
import projectsManager, { projects } from "./projects";
import tasksManager from "./tasks";
import UI from "./UI";

function populateStorage(project) {
  const stringProjects = JSON.stringify(project);
  localStorage.setItem(project.id, stringProjects);
}

function getStorage() {
  Object.keys(localStorage).forEach((project) => {
    const destringProjects = JSON.parse(localStorage.getItem(project));
    projects.push(destringProjects);
  });

  projects.sort((a, b) => {
    const x = new Date(a.date);
    const y = new Date(b.date);
    return x - y;
  });
}

function appendStorage() {
  getStorage();
  projects.forEach((project) => {
    if (project.name !== "") {
      UI.appendNewProject(project);
    }
  });
}

function deleteStorage(projectId) {
  projects.forEach((project) => {
    if (project.id === projectId) {
      localStorage.removeItem(projectId);
    }
  });
}

function editStorage(project) {
  const stringProjects = JSON.stringify(project);
  projects.forEach((item) => {
    if (project.id === item.id) {
      localStorage.setItem(project.id, stringProjects);
    }
  });
}

function populateTaskStorage(projectId) {
  projects.forEach((project) => {
    if (projectId === project.id) {
      localStorage.setItem(project.id, JSON.stringify(project));
    }
  });
}

function styleTaskStorage() {
  const taskList = document.querySelectorAll(".task-list");
  taskList.forEach((task) => {
    const taskNameDescriptionContainer = task.querySelector(
      ".task-name-description-container"
    );
    const dueDate = task.querySelector(".due-date");
    if (tasksManager.getCurrentTask(task.id).status === "Not Complete") {
      taskNameDescriptionContainer.classList.remove("complete");
      dueDate.classList.remove("complete");
      task.classList.remove("complete");
    } else {
      taskNameDescriptionContainer.classList.add("complete");
      dueDate.classList.add("complete");
      task.classList.add("complete");
    }
  });
}

function appendTaskStorage() {
  const currentProject = tasksManager.getCurrentProject();
  projects.forEach((project) => {
    const currentProjectLength = Object.keys(project).length;
    const taskCount = currentProjectLength - 3;
    if (project.id === currentProject.id) {
      for (let x = 1; x <= taskCount; x += 1) {
        UI.appendNewTask(project[`task${x}`]);
      }
    }
  });
  styleTaskStorage();
}

function editTaskStorage(task) {
  const currentProject = tasksManager.getCurrentProject();
  const currentTaskKey = task.id;
  const keysArray = Object.keys(currentProject);
  keysArray.forEach((key) => {
    if (key === currentTaskKey) {
      localStorage.setItem(currentProject.id, JSON.stringify(currentProject));
    }
  });
}

function deleteTaskStorage(task) {
  const currentProject = tasksManager.getCurrentProject();
  const currentTaskKey = task;

  const keysArray = Object.keys(currentProject);
  keysArray.forEach((key) => {
    if (key === currentTaskKey) {
      delete currentProject[key];
      localStorage.setItem(currentProject.id, JSON.stringify(currentProject));
    }
  });
}

export default {
  populateStorage,
  getStorage,
  appendStorage,
  deleteStorage,
  editStorage,
  populateTaskStorage,
  styleTaskStorage,
  appendTaskStorage,
  editTaskStorage,
  deleteTaskStorage,
};
