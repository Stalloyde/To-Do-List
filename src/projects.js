import {addProjectName} from "./UI.js";
import {populateStorage, deleteStorage} from './localStorage.js';

export const projects = [{
  name: "",
  id: "project0"
}];  

function projectFactory (name, id, date) {
  name = name;
  id = id;
  date = date;
  return {name, id, date}; 
}


export const projectsManager = (function () {
  
  
  function addProject () {
    let projectCount = projects.length;
      let project = projectFactory(addProjectName.value, "project"+ projectCount, new Date());
      projectCount ++;
      projects.push(project)
      populateStorage(project);
  };

  function deleteProject (projectId) {
    projects.forEach(function (project) {
      if (projectId === project.id) {
       projects.splice([projects.indexOf(project)],1);
       deleteStorage(projectId);
      };
    });
  };
  
  function editProject (projectId, newName) { 
     projects.forEach(function (project) {
      if (projectId === project.id) {
        project.name = newName;
        return project.name;
      };
     });
  };

  function mostRecentProject () {
      return projects[projects.length-1];
  };

  function setCurrentProject (projectId) {
    let thisProject = {};

    projects.forEach(function (project) {
      if (projectId === project.id) {
        thisProject = project;
      };
    });
    return thisProject;
  };
  return {addProject, deleteProject, editProject, mostRecentProject, setCurrentProject};
})();  