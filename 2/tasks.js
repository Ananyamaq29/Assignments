document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (!validateForm()) {
        return;
    }
    addTask();
    this.reset();
});

function validateForm() {
    const title = document.getElementById('title').value;
    const dueDate = document.getElementById('due-date').value;
    if (title.trim() === '' || dueDate.trim() === '') {
        displayError('Title and Due Date are required.');
        return false;
    }
    clearError();
    return true;
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    if (!errorMessage) {
        const errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.textContent = message;
        document.getElementById('task-input').appendChild(errorDiv);
    } else {
        errorMessage.textContent = message;
    }
}

function clearError() {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');
    taskItem.className = priority;

    const taskContent = document.createElement('div');
    taskContent.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Due: ${dueDate}</p>
        <p>Priority: ${priority.charAt(0).toUpperCase() + priority.slice(1)}</p>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    });

    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            taskItem.style.textDecoration = 'line-through';
        } else {
            taskItem.style.textDecoration = 'none';
        }
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(completeCheckbox);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}
