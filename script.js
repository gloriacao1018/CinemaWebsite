const monthYear = document.getElementById('month-year');
const datesContainer = document.getElementById('dates');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const monthSelect = document.getElementById('month-select');

let currentDate = new Date();

// Placeholder events for styling
const events = {};

// Populate events for every day of the month
for (let day = 1; day <= 30; day++) {
  const dateStr = `2024-11-${String(day).padStart(2, '0')}`;
  events[dateStr] = [
    { time: '2:00 PM', title: `Placeholder Movie ${day}-A` },
    { time: '5:30 PM', title: `Placeholder Movie ${day}-B` }
  ];
}


function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
  datesContainer.innerHTML = '';

  // Add blank spaces for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    datesContainer.innerHTML += `<div class="date blank"></div>`;
  }

  // Add days with events
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = events[dateStr] || [];
    let eventsHTML = dayEvents.map(
      (event) => `
        <div class="event-card">
          <span>${event.time}</span>
          <span>${event.title}</span>
        </div>
      `
    ).join('');

    datesContainer.innerHTML += `
      <div class="date">
        <span>${day}</span>
        ${eventsHTML}
      </div>`;
  }
}

function changeMonth(delta) {
  currentDate.setMonth(currentDate.getMonth() + delta);
  renderCalendar();
}

prevMonthButton.addEventListener('click', () => changeMonth(-1));
nextMonthButton.addEventListener('click', () => changeMonth(1));
monthSelect.addEventListener('change', (e) => {
  const selectedMonth = parseInt(e.target.value, 10);
  if (!isNaN(selectedMonth)) {
    currentDate.setMonth(selectedMonth);
    renderCalendar();
  }
});

// Initialize the calendar
renderCalendar();