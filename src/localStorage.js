import {projects, projectsManager} from './projects.js';
import {UI} from "./UI.js";

export function populateStorage (arg) {
    const stringProjects = JSON.stringify(arg);
    localStorage.setItem("projects", stringProjects);
}

export function getStorage () {
    const destringProjects = JSON.parse(localStorage.getItem("projects"));
    for (const project in destringProjects) {
        if (destringProjects[project].name !== "") {
            projects.push(destringProjects[project]);
        };
    };

    for (const project in projects) {
        if (projects[project].name !== "") {
            UI.appendNewProject(projects[project]);
        };
    };

}

