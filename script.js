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
  let currentTaskIndex = null;
  let tasks = [];
  
  const createTaskHTML = (title, task, timestamp, isChecked = false) => `
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
  
  const renderTasks = () => {
    taskList.innerHTML = tasks.map(task => createTaskHTML(task.title, task.task, task.timestamp, task.isChecked)).join('');
  };
  
  const closeModal = () => {
    modalWindow.style.display = 'none';
    taskInput.value = '';
    titleInput.value = '';
  };
  
  closeBtn.addEventListener('click', closeModal);
  
  taskList.addEventListener('click', (e) => {
    const taskLi = e.target.closest('li');
    const taskIndex = Array.from(taskList.children).indexOf(taskLi);
  
    if (e.target.closest('.delete-btn') && confirm('Are you sure you want to delete this task?')) {
      tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
      renderTasks();
    } else if (e.target.closest('.edit-btn')) {
      // Check if the task is checked
      if (tasks[taskIndex].isChecked) {
        alert("You cannot edit a completed task.");
        return; // Prevent further execution
      }
      editTask(taskIndex);
    } else if (e.target.classList.contains('checkbox')) {
      tasks[taskIndex].isChecked = e.target.checked;
      renderTasks();
    }
  });
  
  const editTask = (index) => {
    currentTaskIndex = index;
    const { title, task } = tasks[index];
    taskInput.value = task;
    titleInput.value = title;
    modalWindow.style.display = 'block';
  };
  
  saveBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const task = taskInput.value.trim();
    if (!title || !task) {
      alert(`${!title ? 'Title' : 'Description'} is required`);
      return;
    }
  
    const timestamp = new Date().toLocaleString();
    if (currentTaskIndex !== null) {
      tasks[currentTaskIndex] = { title, task, timestamp, isChecked: tasks[currentTaskIndex].isChecked };
      currentTaskIndex = null;
    } else {
      tasks.push({ title, task, timestamp, isChecked: false });
    }
  
    renderTasks();
    closeModal();
  });
  
  addBtn.addEventListener('click', () => {
    modalWindow.style.display = 'block';
  });
  
  filterSelect.addEventListener('change', () => {
    renderTasks();
    const filterValue = filterSelect.value;
    Array.from(taskList.children).forEach(task => {
      const checkbox = task.querySelector('.checkbox');
      task.style.display = (filterValue === 'completed' && !checkbox.checked) ||
      (filterValue === 'incompleted' && checkbox.checked) ? 'none' : 'list-item';
    });
  });
  
  renderTasks();
  