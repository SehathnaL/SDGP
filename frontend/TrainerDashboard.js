// Get references to elements
const dateButtons = document.querySelectorAll('.date-selector button');
const dateInfo = document.querySelector('.date-info');
const scheduleTimes = document.querySelector('.schedule-times');
const candidateCards = document.querySelectorAll('.candidate-cards .card');
const searchInput = document.querySelector('.search-filter input');
const filterButton = document.querySelector('.filter-btn');

// Sample candidate data (replace with actual data)
const candidates = [
  { name: 'Jason Ruly', title: 'UI/UX Designer', image: 'https://via.placeholder.com/150', schedule: '09:00 - 11:00' },
  { name: 'Rendy Boy', title: 'Web Development', image: 'https://via.placeholder.com/150', schedule: '09:00 - 11:00' },
  { name: 'Shania Elin', title: 'Illustrator', image: 'https://via.placeholder.com/150', schedule: '09:00 - 11:00' },
  { name: 'Junior Key', title: 'Illustrator', image: 'https://via.placeholder.com/150', schedule: '13:00 - 14:00' },
  { name: 'Siti Alice', title: 'Copywriter', image: 'https://via.placeholder.com/150', schedule: '13:00 - 14:00' },
  { name: 'Bagas Oke', title: 'UI/UX Designer', image: 'https://via.placeholder.com/150', schedule: '13:00 - 14:00' },
  { name: 'Superman', title: 'Superhero', image: 'https://via.placeholder.com/150', schedule: '14:00 - 16:00' },
  { name: 'Susanti', title: 'Designer', image: 'https://via.placeholder.com/150', schedule: '14:00 - 16:00' },
  // Add more candidates as needed
];

// Sample schedule data (replace with actual data)
const scheduleData = {
  '15': [
    { time: '09:00 - 11:00', candidates: ['Jason Ruly', 'Rendy Boy', 'Shania Elin'] },
    { time: '13:00 - 14:00', candidates: ['Junior Key', 'Siti Alice', 'Bagas Oke'] },
    { time: '14:00 - 16:00', candidates: ['Superman', 'Susanti'] }, // Add more candidates
  ],
};

// Function to update the schedule display
function updateSchedule(date) {
  const day = date.getDate().toString();
  const scheduleForDay = scheduleData[day] || [];
  let scheduleHTML = '';

  if (scheduleForDay.length === 0) {
    scheduleHTML = '<p>No schedule for this day.</p>';
  } else {
    scheduleForDay.forEach(slot => {
      let avatarGroupHTML = '';
      slot.candidates.forEach(name => {
        const candidate = candidates.find(c => c.name === name);
        if (candidate) {
          avatarGroupHTML += `<img src="${candidate.image}" alt="${name}">`;
        }
      });
      scheduleHTML += `
        <div class="time-slot">
          <p>${slot.time}</p>
          <p>${slot.candidates.join(', ')}</p>
          <div class="avatar-group">${avatarGroupHTML}</div>
        </div>
      `;
    });
  }

  scheduleTimes.innerHTML = scheduleHTML;
}

// Function to update the date info
function updateDateInfo(date) {
  dateInfo.innerHTML = `<p>${date.toLocaleDateString()}</p><p>15 candidates</p>`;
  updateSchedule(date);
}

// Add click event listeners to date buttons
dateButtons.forEach(button => {
  button.addEventListener('click', () => {
    dateButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const selectedDate = new Date();
    selectedDate.setDate(parseInt(button.textContent));
    updateDateInfo(selectedDate);
  });
});

// Initial setup: Select the default date (e.g., the 15th)
const defaultDate = new Date();
defaultDate.setDate(15);
updateDateInfo(defaultDate);

// Search functionality
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  candidateCards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    if (name.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Filter functionality (you can expand on this)
filterButton.addEventListener('click', () => {
  // Implement filter logic here based on your requirements
  alert('Filter functionality not implemented yet.');
});