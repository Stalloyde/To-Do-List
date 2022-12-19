import {addProjectName} from "./UI.js";

export const projects = [{
  name: "",
  id: "project0"
}];  

function projectFactory (name, id) {
  name = name;
  id = id;
  return {name, id}; 
}


export const projectsManager = (function () {
  let projectCount = 1;
  
  function addProject () {
      let project = projectFactory(addProjectName.value, "project"+ projectCount);
      projectCount ++;
      projects.push(project);
  };

  function deleteProject (projectId) {
    projects.forEach(function (project) {
      if (projectId === project.id) {
       projects.splice([projects.indexOf(project)],1);
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