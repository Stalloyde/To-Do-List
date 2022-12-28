import _ from 'lodash';
import './style.css';
import {UI, addProjectBtn, addTaskBtn} from './UI.js';
import { getUnixTime } from 'date-fns';
import {storage} from './localStorage.js';

addProjectBtn.addEventListener("click", function () {
    UI.openProjectModal();
});

const closeProjectModalBtn = document.getElementById("close-project-modal");
closeProjectModalBtn.addEventListener("click", function () {
    UI.closeProjectModal()  
});

addTaskBtn.addEventListener("click", function () {
    UI.openTaskModal()
});

const closeTaskModalBtn = document.getElementById("close-task-modal");
closeTaskModalBtn.addEventListener("click", function () {
    UI.closeTaskModal()
});

storage.appendStorage();
storage.appendTaskStorage();