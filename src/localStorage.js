import {projects, projectsManager} from './projects.js';
import {addProjectContainer, UI} from "./UI.js";


let refreshProjects = [{
}];

export function populateStorage () {
    refreshProjects.push(projectsManager.mostRecentProject());
    const stringProjects = JSON.stringify(refreshProjects);
    localStorage.setItem("projects", stringProjects);
    console.log(refreshProjects)
}

export function getStorage () {
    const destringProjects = JSON.parse(localStorage.getItem("projects"));
    for (const project in destringProjects) {
        if (destringProjects[project].name !== undefined) {
            projects.push(destringProjects[project]);
        };
    };

    for (const project in projects) {
        if (projects[project].name !== "") {
            UI.appendNewProject(projects[project]);
        };
    };

}