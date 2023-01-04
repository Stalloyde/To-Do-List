/* eslint-disable no-param-reassign */
/* eslint-disable no-self-assign */
import { addProjectName } from "./UI";
import storage from "./localStorage";

export const projects = [{
  name: "",
  id: "project0",
}];

function projectFactory(name, id, date) {
  name = name;
  id = id;
  date = date;
  return { name, id, date };
}

function addProject() {
  let projectCount = projects.length;
  const project = projectFactory(addProjectName.value, `project${projectCount}`, new Date());
  projectCount += 1;
  projects.push(project);
  storage.populateStorage(project);
}

function deleteProject(projectId) {
  projects.forEach((project) => {
    if (projectId === project.id) {
      storage.deleteStorage(project.id);
      projects.splice([projects.indexOf(project)], 1);
    }
  });
}

function editProject(projectId, newName) {
  projects.forEach((project) => {
    if (projectId === project.id) {
      project.name = newName;
      storage.editStorage(project, project.name);
    }
    return project.name;
  });
}

function mostRecentProject() {
  return projects[projects.length - 1];
}

function setCurrentProject(projectId) {
  let thisProject = {};

  projects.forEach((project) => {
    if (projectId === project.id) {
      thisProject = project;
    }
  });
  return thisProject;
}

export default {
  addProject,
  deleteProject,
  editProject,
  mostRecentProject,
  setCurrentProject,
};
