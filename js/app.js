// מערך טיפים
const tips = [
    "השתמש בטכניקת פומודורו: 25 דקות למידה, 5 דקות הפסקה",
    "חלק משימות גדולות למשימות קטנות יותר",
    "קבע יעדים יומיים קטנים וברי השגה",
    "צור סביבת למידה נקייה מהסחות דעת",
    "תגמל את עצמך על כל התקדמות, גם אם קטנה",
    "הסבר את החומר לאחרים כדי לחזק את ההבנה",
    "עשה הפסקות קצרות בין נושאים",
    "צור סיכומים תמציתיים מהחומר הנלמד",
    "התחל מהמשימות הקשות כשאתה רענן"
];

// מערך הודעות עידוד
const encouragements = [
    "כל הכבוד! אתה מתקדם נהדר! 🌟",
    "המשך כך! ההתמדה שלך מרשימה! 💪",
    "צעד אחר צעד, אתה מתקרב למטרה! 🎯",
    "אתה עושה עבודה נהדרת! 👏",
    "תמשיך ככה, אתה בדרך הנכונה! ⭐"
];

// ניהול תצוגה
function switchView(view) {
    const content = document.getElementById('dynamic-content');
    const navButtons = document.querySelectorAll('nav button');
    
    // עדכון כפתורי הניווט
    navButtons.forEach(button => {
        button.classList.remove('bg-blue-100', 'text-blue-700');
        if (button.textContent.includes(getViewName(view))) {
            button.classList.add('bg-blue-100', 'text-blue-700');
        }
    });

    // טעינת התוכן המתאים
    switch(view) {
        case 'tasks':
            content.innerHTML = createTasksView();
            initTasksHandlers();
            break;
        case 'timer':
            content.innerHTML = createTimerView();
            initTimerHandlers();
            break;
        case 'stats':
            content.innerHTML = createStatsView();
            updateStats();
            break;
    }
}

function getViewName(view) {
    switch(view) {
        case 'tasks': return 'משימות';
        case 'timer': return 'טיימר';
        case 'stats': return 'סטטיסטיקות';
        default: return '';
    }
}

// פונקציות עזר
function getRandomTip() {
    return tips[Math.floor(Math.random() * tips.length)];
}

function getRandomEncouragement() {
    return encouragements[Math.floor(Math.random() * encouragements.length)];
}

// אתחול
document.addEventListener('DOMContentLoaded', () => {
    // הצגת טיפ יומי
    document.getElementById('daily-tip').textContent = getRandomTip();
    
    // טעינת משימות מהאחסון המקומי
    loadTasks();
    
    // הצגת תצוגת ברירת המחדל
    switchView('tasks');

    // הגדרת טיימר לעדכון טיפ יומי
    setInterval(() => {
        document.getElementById('daily-tip').textContent = getRandomTip();
    }, 1000 * 60 * 60); // כל שעה
});
