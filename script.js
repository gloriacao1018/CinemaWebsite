const monthYear = document.getElementById('month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const timeSelect = document.getElementById('time-select');

let currentDate = new Date();

const events = {};

for (let year = 2024; year <= 2027; year++) {
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= 30; day++) {
      const dateStr = `${String(year).padStart(2, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      events[dateStr] = [
        { time: '2:00 PM', title: `Placeholder Movie ${day}-A` },
        { time: '5:30 PM', title: `Placeholder Movie ${day}-B` }
      ];
    }
  }
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
  // Clear the entire calendar grid
  const calendarGrid = document.querySelector('.calendar-grid');
  calendarGrid.innerHTML = '';

  // Add weekday headers
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdays.forEach((day) => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.textContent = day;
    calendarGrid.appendChild(dayDiv);
  });

  // Add blank spaces for days before the first of the month
  for (let i = 0; i < firstDay; i++) {
    const blankDiv = document.createElement('div');
    blankDiv.classList.add('date', 'blank');
    calendarGrid.appendChild(blankDiv);
  }

  // Add days with events
  for (let day = 1; day <= daysInMonth; day++) {
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');

    // Add the day number
    const daySpan = document.createElement('span');
    daySpan.textContent = day;
    dateDiv.appendChild(daySpan);

    // Add events for the day
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = events[dateStr] || [];
    dayEvents.forEach((event) => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
      
      const eventTime = document.createElement('span');
      eventTime.textContent = event.time;

      const eventTitle = document.createElement('span');
      eventTitle.textContent = event.title;

      eventCard.appendChild(eventTime);
      eventCard.appendChild(eventTitle);
      dateDiv.appendChild(eventCard);
    });

    // Append the date div to the calendar grid
    calendarGrid.appendChild(dateDiv);
  }

  // Add blank spaces for days after the last of the month
  const totalCells = firstDay + daysInMonth;
  const remainingCells = 7 - (totalCells % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      const blankDiv = document.createElement('div');
      blankDiv.classList.add('date', 'blank');
      calendarGrid.appendChild(blankDiv);
    }
  }
}

function changeMonth(delta) {
  currentDate.setMonth(currentDate.getMonth() + delta);
  renderCalendar();
}

prevMonthButton.addEventListener('click', () => changeMonth(-1));
nextMonthButton.addEventListener('click', () => changeMonth(1));
timeSelect.addEventListener('change', (e) => {
  const selectedMonth = parseInt(e.target.value, 10);
  if (!isNaN(selectedMonth)) {
    currentDate.setMonth(selectedMonth);
    renderCalendar();
  }
});

// Initialize the calendar
renderCalendar();