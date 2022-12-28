import { xor } from 'lodash';
import {projects} from './projects.js';
import {tasksManager} from './tasks.js';
import {UI} from "./UI.js";

export const storage = (function () {
    function populateStorage (project) {
        const stringProjects = JSON.stringify(project);
        localStorage.setItem(project.id, stringProjects);
    }

    function getStorage () {
        Object.keys(localStorage).forEach(function (project) {
            const destringProjects = JSON.parse(localStorage.getItem(project));
            projects.push(destringProjects);
        });

        projects.sort(function (a,b) {
            let x = new Date(a.date);
            let y = new Date(b.date);
            return x-y;
        });
    }

    function appendStorage () {
        getStorage();
        projects.forEach(function (project) {
            if (project.name !== "") {
                UI.appendNewProject(project);

                const currentProjectLength = Object.keys(project).length;
                let taskCount = currentProjectLength-3;
                for (let x = 1; x <= taskCount; x++) {
                    UI.appendNewTask(project[`task${x}`]);
                }
            };
        });
    };

    function appendTaskStorage() {
        const taskList = document.querySelectorAll(".task-list");
        taskList.forEach(function (task) {
            const taskNameDescriptionContainer = task.querySelector(".task-name-description-container");
            const dueDate = task.querySelector(".due-date");
            if (tasksManager.getCurrentTask(task.id).status === "Not Complete") {  
                taskNameDescriptionContainer.classList.remove("complete");
                dueDate.classList.remove("complete");
                task.classList.remove("complete");                   
            } else {
                taskNameDescriptionContainer.classList.add("complete");
                dueDate.classList.add("complete");  
                task.classList.add("complete");                    
            };
        });
    }

    function deleteStorage (projectId) {
        getStorage();
        projects.forEach(function (project) {    
            if (project.id === projectId) {
                localStorage.removeItem(projectId);
            };
        });
    }

    function editStorage (project) {
        const stringProjects = JSON.stringify(project);
        projects.forEach(function (item) {    
            if (project.id === item.id) {
                localStorage.setItem(project.id, stringProjects);
            };
        });
    }

    function populateTaskStorage (projectId) {
        projects.forEach(function (project) {
            if (projectId === project.id) {
                localStorage.setItem(project.id, JSON.stringify(project));
            };
        });
    };

    return {populateStorage, getStorage, appendStorage, appendTaskStorage, deleteStorage, editStorage, populateTaskStorage}
})();
