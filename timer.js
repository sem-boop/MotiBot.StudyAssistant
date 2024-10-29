// טיימר למידה
let timerInterval;
let timeLeft;
const POMODORO_TIME = 25 * 60; // 25 דקות
const SHORT_BREAK_TIME = 5 * 60; // 5 דקות

function createTimerView() {
    return `
        <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="space-y-6">
                <div class="flex justify-center gap-4 mb-8">
                    <button 
                        onclick="setTimerMode('pomodoro')"
                        class="px-4 py-2 rounded bg-blue-600 text-white"
                    >
                        פומודורו (25 דקות)
                    </button>
                    <button 
                        onclick="setTimerMode('break')"
                        class="px-4 py-2 rounded bg-green-600 text-white"
                    >
                        הפסקה (5 דקות)
                    </button>
                </div>

                <div class="text-6xl font-mono mb-8" id="timer-display">
                    25:00
                </div>

                <div class="flex justify-center gap-4">
                    <button 
                        id="start-timer"
                        onclick="toggleTimer()"
                        class="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        התחל
                    </button>
                    <button 
                        onclick="resetTimer()"
                        class="px-6 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                    >
                        אפס
                    </button>
                </div>

                <div class="mt-8 p-4 bg-blue-50 rounded-lg text-right">
                    <h3 class="font-bold mb-2">טיפ:</h3>
                    <p>שיטת פומודורו: עבוד 25 דקות ברצף, קח הפסקה של 5 דקות. חזור על התהליך 4 פעמים ואז קח הפסקה ארוכה של 15-30 דקות.</p>
                </div>
            </div>
        </div>
    `;
}

function initTimerHandlers() {
    timeLeft = POMODORO_TIME;
    updateTimerDisplay();
}

function setTimerMode(mode) {
    resetTimer();
    timeLeft = mode === 'pomodoro' ? POMODORO_TIME : SHORT_BREAK_TIME;
    updateTimerDisplay();
}

function toggleTimer() {
    const button = document.getElementById('start-timer');
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        button.textContent = 'המשך';
    } else {
        timerInterval = setInterval(updateTimer, 1000);
        button.textContent = 'עצור';
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        
        const message = timeLeft === POMODORO_TIME ? 
            'זמן להפסקה!' : 
            'חזרה ללמידה!';
            
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(message);
        }
        
        document.getElementById('start-timer').textContent = 'התחל';
    }
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeLeft = POMODORO_TIME;
    updateTimerDisplay();
    document.getElementById('start-timer').textContent = 'התחל';
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer-display').textContent = display;
}

// בקשת אישור להתראות
if ('Notification' in window) {
    Notification.requestPermission();
}
