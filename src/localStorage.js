import { xor } from 'lodash';
import {projects, projectsManager} from './projects.js';
import {UI} from "./UI.js";

export function populateStorage (project) {
    const stringProjects = JSON.stringify(project);
    localStorage.setItem(project.id, stringProjects);
}

export function getStorage () {
    Object.keys(localStorage).forEach(function (project) {
        const destringProjects = JSON.parse(localStorage.getItem(project));
        projects.push(destringProjects);
    });

    projects.sort(function (a,b) {
        let x = new Date(a.date)
        let y = new Date(b.date)
        return x-y;
    });
}

export function appendStorage () {
    projects.forEach(function (project) {
        if (project.name !== "") {
            UI.appendNewProject(project);
        };
    });
}

export function deleteStorage (projectId) {
    const destringProjects = JSON.parse(localStorage.getItem("projects"));
    
    for (const project in destringProjects) {
        if (destringProjects[project].id === projectId) {
            console.log(destringProjects[project].name)
            localStorage.removeItem(destringProjects[project].name);
        };
    }
}

