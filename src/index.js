import _ from "lodash";
import "./style.css";
import { getUnixTime } from "date-fns";
import UI, { addProjectBtn, addTaskBtn } from "./UI";
import storage from "./localStorage";

addProjectBtn.addEventListener("click", () => {
  UI.openProjectModal();
});

const closeProjectModalBtn = document.getElementById("close-project-modal");
closeProjectModalBtn.addEventListener("click", () => {
  UI.closeProjectModal();
});

addTaskBtn.addEventListener("click", () => {
  UI.openTaskModal();
});

const closeTaskModalBtn = document.getElementById("close-task-modal");
closeTaskModalBtn.addEventListener("click", () => {
  UI.closeTaskModal();
});

storage.appendStorage();
storage.appendTaskStorage();
