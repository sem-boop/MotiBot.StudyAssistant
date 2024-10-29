// ניהול משימות
let tasks = [];

function createTasksView() {
    return `
        <div class="bg-white rounded-lg shadow p-6">
            <form id="task-form" class="mb-6">
                <div class="space-y-4">
                    <input 
                        type="text" 
                        id="task-name"
                        placeholder="שם המשימה"
                        class="w-full p-2 border rounded"
                        required
                    >
                    <input 
                        type="date" 
                        id="task-deadline"
                        class="w-full p-2 border rounded"
                        required
                    >
                    <button 
                        type="submit"
                        class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        הוסף משימה
                    </button>
                </div>
            </form>

            <div id="tasks-list" class="space-y-3">
                <!-- משימות יתווספו כאן דינמית -->
            </div>
        </div>
    `;
}

function initTasksHandlers() {
    // טעינת משימות
    loadTasks();
    renderTasks();

    // הגדרת מאזין לטופס
    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('task-name').value;
        const deadline = document.getElementById('task-deadline').value;
        
        addTask(name, deadline);
        document.getElementById('task-form').reset();
    });
}

function addTask(name, deadline) {
    const task = {
        id: Date.now(),
        name,
        deadline,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    showEncouragement();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        
        saveTasks();
        renderTasks();
        
        if (task.completed) {
            showEncouragement();
        }
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const tasksList = document.getElementById('tasks-list');
    if (!tasksList) return;

    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item p-4 border rounded flex items-center justify-between ${
            task.completed ? 'bg-green-50' : 'hover:bg-gray-50'
        }">
            <div class="flex items-center gap-3">
                <input 
                    type="checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask(${task.id})"
                    class="h-5 w-5 rounded"
                >
                <div>
                    <div class="${task.completed ? 'line-through text-gray-500' : 'font-medium'}">
                        ${task.name}
                    </div>
                    <div class="text-sm text-gray-500">
                        יעד: ${new Date(task.deadline).toLocaleDateString()}
                    </div>
                </div>
            </div>
            <button 
                onclick="deleteTask(${task.id})"
                class="delete-task text-red-500 hover:text-red-700"
            >
                ✕
            </button>
        </div>
    `).join('');

    updateStats();
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showEncouragement() {
    const encouragement = getRandomEncouragement();
    document.getElementById('daily-tip').textContent = encouragement;
}
