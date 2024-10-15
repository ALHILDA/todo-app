
// function select(selector){
//   return  document.getElementById(selector);
// }
// const addBtn = select('addBtnId');
// const filterSelect =select('filterSelectId');
// const taskList = select('taskListId');
// const modalWindow =select('modalWindowId');
// const saveBtn = select('saveBtnId');
// const closeBtn = select('closeBtnId');
// const titleInput = select('taskTitleId');
// const todo = select('todoListId');
// const time = select('timeStampId');
// const taskInput =select('task-input');
// let currentTask

// function createTaskHTML(title, task, timestamp) {
//   return `
//     <li>
//       <div class="task-title">${title}</div>
//       <div class="task-item">
//         <input class="checkbox" type="checkbox">
//         <span class="task-text" >${task}</span>
//         <button class="edit-btn">
//           <img class="todo-controls"src="./Asset/images/draw.png"/>
//         </button>
//         <button class="delete-btn">
//           <img class="todo-controls" src="./Asset/images/bin.png"/>
//         </button>
//       </div>
//       <div class="timestamp">${timestamp}</div>
//     </li>
//   `;
// }
// closeBtn.addEventListener('click', () => {
//   modalWindow.style.display = 'none';
//   taskInput.value = '';
//   titleInput.value = '';
// });

// taskList.addEventListener('click', (e) => {
//   if (e.target.closest('.delete-btn')) {
//     const taskLi = e.target.closest('li');
//     const confirmDelete = confirm('Are you sure you want to delete this task?');
//     if (confirmDelete) {
//       taskLi.remove();
//     }
//   } else if (e.target.closest('.edit-btn')) {
//     editTask(e);
//   } else if (e.target.classList.contains('checkbox')) {
//     const taskText = e.target.parentNode.querySelector('.task-text');
//     const taskTitle = e.target.parentNode.parentNode.querySelector('.task-title');
//     const timestamp = e.target.parentNode.parentNode.querySelector('.timestamp');
//     taskText.style.textDecoration = e.target.checked ? 'line-through' : 'none';
//     taskTitle.style.textDecoration = e.target.checked ? 'line-through' : 'none';
//     timestamp.style.textDecoration = e.target.checked ? 'line-through' : 'none';
//   }
// });

// function editTask(e) {
//   const taskLi = e.target.closest('li');
//   const taskText = taskLi.querySelector('.task-text').textContent;
//   const taskTitle = taskLi.querySelector('.task-title').textContent;
//   taskInput.value = taskText;
//   titleInput.value = taskTitle;
//   modalWindow.style.display = 'block';
//   currentTask = taskLi;
// }

// saveBtn.addEventListener('click', () => {
//   if (titleInput.value.trim() === '') {
//     alert('Title is required');
//     return false;
//   }

//   if (taskInput.value.trim() === '') {
//     alert('Description is required');
//     return false;
//   }

//   const title = titleInput.value;
//   const task = taskInput.value;
//   const timestamp = new Date().toLocaleString();

//   if (currentTask) {
//     currentTask.querySelector('.task-title').textContent = title;
//     currentTask.querySelector('.task-text').textContent = task;
//     currentTask.querySelector('.timestamp').textContent = timestamp;
//     currentTask = null;
//   } else {
//     const taskHTML = createTaskHTML(title, task, timestamp);
//     taskList.insertAdjacentHTML('beforeend', taskHTML);
//   }

//   modalWindow.style.display = 'none';
//   taskInput.value = '';
//   titleInput.value = '';
//   todo.style.display = 'block';
// });

// addBtn.addEventListener('click', () => {
//   modalWindow.style.display = 'block';
// });

// filterSelect.addEventListener('change', () => {
//   const filterValue = filterSelect.value;
//   const tasks = taskList.children;
//   for (let i = 0; i < tasks.length; i++) {
//     const task = tasks[i];
//     const checkbox = task.querySelector('.checkbox');
//     if (filterValue === 'completed' && !checkbox.checked) {
//       task.style.visibility = 'hidden';
//     } else if (filterValue === 'incompleted' && checkbox.checked) {
//       task.style.visibility = 'hidden';
//     } else {
//       task.style.visibility = 'visible';
//     }
//   }
// });

function select(selector) {
  return document.getElementById(selector);
}

const addBtn = select('addBtnId');
const filterSelect = select('filterSelectId');
const taskList = select('taskListId');
const modalWindow = select('modalWindowId');
const saveBtn = select('saveBtnId');
const closeBtn = select('closeBtnId');
const titleInput = select('taskTitleId');
const taskInput = select('task-input');
let currentTaskIndex = null; // Use index instead of a DOM element
let tasks = [];

function createTaskHTML(title, task, timestamp, isChecked = false) {
  return `
    <li>
      <div class="task-title" style="text-decoration: ${isChecked ? 'line-through' : 'none'};">${title}</div>
      <div class="task-item">
        <input class="checkbox" type="checkbox" ${isChecked ? 'checked' : ''}>
        <span class="task-text" style="text-decoration: ${isChecked ? 'line-through' : 'none'};">${task}</span>
        <button class="edit-btn">
          <img class="todo-controls" src="./Asset/images/draw.png"/>
        </button>
        <button class="delete-btn">
          <img class="todo-controls" src="./Asset/images/bin.png"/>
        </button>
      </div>
      <div class="timestamp" style="text-decoration: ${isChecked ? 'line-through' : 'none'};">${timestamp}</div>
    </li>
  `;
}

function renderTasks() {
  taskList.innerHTML = tasks.map((task, index) => createTaskHTML(task.title, task.task, task.timestamp, task.isChecked)).join('');
}

closeBtn.addEventListener('click', () => {
  modalWindow.style.display = 'none';
  taskInput.value = '';
  titleInput.value = '';
});

taskList.addEventListener('click', (e) => {
  if (e.target.closest('.delete-btn')) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const taskIndex = Array.from(taskList.children).indexOf(e.target.closest('li'));
      tasks.splice(taskIndex, 1); // Remove the task from the array
      renderTasks();
    }
  } else if (e.target.closest('.edit-btn')) {
    const taskIndex = Array.from(taskList.children).indexOf(e.target.closest('li'));
    editTask(taskIndex);
  } else if (e.target.classList.contains('checkbox')) {
    const taskIndex = Array.from(taskList.children).indexOf(e.target.closest('li'));
    tasks[taskIndex].isChecked = e.target.checked; // Update the task's checked status
    renderTasks(); // Re-render the task list
  }
});

function editTask(index) {
  currentTaskIndex = index;
  const task = tasks[index];
  taskInput.value = task.task;
  titleInput.value = task.title;
  modalWindow.style.display = 'block';
}

saveBtn.addEventListener('click', () => {
  if (titleInput.value.trim() === '') {
    alert('Title is required');
    return false;
  }

  if (taskInput.value.trim() === '') {
    alert('Description is required');
    return false;
  }

  const title = titleInput.value;
  const task = taskInput.value;
  const timestamp = new Date().toLocaleString();

  if (currentTaskIndex !== null) {
    // Update the existing task
    tasks[currentTaskIndex] = { title, task, timestamp, isChecked: tasks[currentTaskIndex].isChecked };
    currentTaskIndex = null;
  } else {
    // Add a new task
    tasks.push({ title, task, timestamp, isChecked: false });
  }

  renderTasks();
  modalWindow.style.display = 'none';
  taskInput.value = '';
  titleInput.value = '';
});

addBtn.addEventListener('click', () => {
  modalWindow.style.display = 'block';
});

filterSelect.addEventListener('change', () => {
  const filterValue = filterSelect.value;
  renderTasks(); // Render all tasks

  // Apply filtering
  const tasksArray = Array.from(taskList.children);
  tasksArray.forEach(task => {
    const checkbox = task.querySelector('.checkbox');
    if ((filterValue === 'completed' && !checkbox.checked) ||
        (filterValue === 'incompleted' && checkbox.checked)) {
      task.style.display = 'none';
    } else {
      task.style.display = 'list-item';
    }
  });
});

// Initial render
renderTasks();
