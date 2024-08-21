document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const filters = document.querySelectorAll('.filters button');

    let tasks = [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(task) {
        const taskId = Date.now();
        tasks.push({ id: taskId, name: task, completed: false });
        renderTasks();
    }

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${task.name}</span>
                <div>
                    <button class="complete-btn">✔️</button>
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">❌</button>
                </div>
            `;
            taskList.appendChild(li);

            li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task.id));
            li.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
        });
    }

    function toggleComplete(taskId) {
        const task = tasks.find(t => t.id === taskId);
        task.completed = !task.completed;
        renderTasks();
    }

    function editTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        const newTaskName = prompt('Edit Task:', task.name);
        if (newTaskName) {
            task.name = newTaskName;
            renderTasks();
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    filters.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.id.replace('Tasks', '').toLowerCase();
            renderTasks(filter);
        });
    });

    renderTasks();
});
