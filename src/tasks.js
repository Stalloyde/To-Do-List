import { get } from 'lodash';
import {storage} from './localStorage.js';
import {projectsManager} from './projects.js';
import {addTaskName, addTaskDate, addTaskDescription, currentProjectHeader} from './UI.js';


function taskFactory (name, description, dueDate, id, status) {
    name = name;
    description = description;
    dueDate = dueDate;
    id = id
    status = status
    return {name, description, dueDate, id, status};
}

export const tasksManager = (function () { 

    function getCurrentProject () {
        let currentProject = projectsManager.setCurrentProject(currentProjectHeader.id);
        return currentProject;
    };
    
    function addTask () {
        getCurrentProject();
        
        const currentProjectLength = Object.keys(getCurrentProject()).length;
        let taskCount = currentProjectLength-2;
        let task = taskFactory(addTaskName.value, addTaskDescription.value, addTaskDate.value, "task" + taskCount, "Not Complete");
        
        (function nameTaskProp () {
            getCurrentProject()["task" + taskCount] = task;
        })();
        
        storage.populateTaskStorage(getCurrentProject().id);
    };


    function getMostRecentTask () {
        getCurrentProject();
        const currentProjectValues = Object.values(getCurrentProject());
        const mostRecentTask = currentProjectValues[currentProjectValues.length-1]
        return mostRecentTask;
    };

    function getCurrentTask(taskId) {
        let currentTask = getCurrentProject()[taskId];
        return currentTask;
    }

    function deleteTask (taskId) {
        getCurrentProject()[taskId] = {};
    };

    function editTask (taskId, newTaskName, newTaskDescription, newTaskDate) {
        getCurrentTask(taskId).name = newTaskName;
        getCurrentTask(taskId).description = newTaskDescription;
        getCurrentTask(taskId).dueDate = newTaskDate;
    };

    function updateTaskStatus (taskId) {
        if (getCurrentTask(taskId).status ===  "Complete") {
            getCurrentTask(taskId).status = "Not Complete";
        } else {
            getCurrentTask(taskId).status = "Complete";
        };
        storage.populateTaskStorage(getCurrentProject().id);
    };
    return {getCurrentProject, addTask, getMostRecentTask, getCurrentTask, deleteTask, editTask, updateTaskStatus}
})();