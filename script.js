document.addEventListener('DOMContentLoaded', () => {
    const countdownContainer = document.querySelector('.countdown');
    const countdownForm = document.querySelector('.countdown-form');
    const savedCountdownsContainer = document.querySelector('.saved-countdowns');
  
    // Load saved countdowns from local storage
    function loadSavedCountdowns() {
      const savedCountdowns = JSON.parse(localStorage.getItem('countdowns')) || [];
  
      savedCountdownsContainer.innerHTML = '';
  
      savedCountdowns.forEach((savedCountdown, index) => {
        const savedCountdownItem = document.createElement('div');
        savedCountdownItem.classList.add('saved-countdown');
  
        const countdownName = document.createElement('span');
        countdownName.classList.add('countdown-name');
        countdownName.textContent = savedCountdown.name;
  
        const countdownTimer = document.createElement('div');
        countdownTimer.classList.add('countdown-item');
  
        const countdownDateTime = new Date(savedCountdown.date).getTime();
  
        countdown(savedCountdown.name, countdownDateTime, countdownTimer);
  
        const savedCountdownActions = document.createElement('div');
        savedCountdownActions.classList.add('saved-countdown-actions');
  
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editButton.style.backgroundColor = 'green';
        editButton.style.color = 'white';
        editButton.style.border = 'none';
        editButton.style.padding = '5px 10px';
        editButton.style.borderRadius = '5px';
        editButton.addEventListener('click', () => {
          const newName = prompt('Enter a new name for the countdown:');
          if (newName) {
            savedCountdown.name = newName;
            saveCountdowns(savedCountdowns);
            loadSavedCountdowns();
          }
        });
        editButton.addEventListener('mouseover', () => {
          editButton.style.backgroundColor = '#27ae60';
        });
        editButton.addEventListener('mouseout', () => {
          editButton.style.backgroundColor = 'green';
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
        deleteButton.style.backgroundColor = '#e74c3c';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.borderRadius = '5px';
        deleteButton.addEventListener('click', () => {
          savedCountdowns.splice(index, 1);
          saveCountdowns(savedCountdowns);
          loadSavedCountdowns();
        });
        deleteButton.addEventListener('mouseover', () => {
          deleteButton.style.backgroundColor = 'darkred';
        });
        deleteButton.addEventListener('mouseout', () => {
          deleteButton.style.backgroundColor = 'red';
        });
  
        savedCountdownActions.appendChild(editButton);
        savedCountdownActions.appendChild(deleteButton);
  
        savedCountdownItem.appendChild(countdownName);
        savedCountdownItem.appendChild(countdownTimer);
        savedCountdownItem.appendChild(savedCountdownActions);
  
        savedCountdownsContainer.appendChild(savedCountdownItem);
      });
    }
  
    // Save countdowns to local storage
    function saveCountdowns(countdowns) {
      localStorage.setItem('countdowns', JSON.stringify(countdowns));
    }
  
    // Add event listener to the countdown form
    countdownForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const countdownDateTime = countdownForm.querySelector('input[type="datetime-local"]');
      const targetDate = new Date(countdownDateTime.value).getTime();
  
      if (isNaN(targetDate)) {
        alert('Invalid date. Please enter a valid date and time.');
        return;
      }
  
      const countdownName = prompt('Enter a name for your countdown:');
      if (countdownName) {
        const savedCountdowns = JSON.parse(localStorage.getItem('countdowns')) || [];
        savedCountdowns.push({ name: countdownName, date: countdownDateTime.value });
        saveCountdowns(savedCountdowns);
        loadSavedCountdowns();
      }
  
      countdownDateTime.value = '';
    });
  
    loadSavedCountdowns();
  });
  
  function countdown(countdownName, targetDate, countdownContainer) {
    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      // Get the current date and time
      const now = new Date().getTime();
  
      // Calculate the remaining time
      const timeDifference = targetDate - now;
  
      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      // Display the countdown on the page
      countdownContainer.innerHTML = `
        <span class="days">${days}</span>
        <span>Days</span>
        <span class="hours">${hours}</span>
        <span>Hours</span>
        <span class="minutes">${minutes}</span>
        <span>Minutes</span>
        <span class="seconds">${seconds}</span>
        <span>Seconds</span>
      `;
  
      // Check if the countdown has reached zero
      if (timeDifference < 0) {
        clearInterval(countdownInterval);
        countdownContainer.textContent = 'Countdown Complete!';
      }
    }, 1000);
  }
  
const editButton = document.createElement('button');
editButton.classList.add('edit-button');
editButton.addEventListener('click', () => {
  const newName = prompt('Enter a new name for the countdown:');
  if (newName) {
    savedCountdown.name = newName;
    saveCountdowns(savedCountdowns);
    loadSavedCountdowns();
  }
});

const deleteButton = document.createElement('button');
deleteButton.classList.add('delete-button');
deleteButton.addEventListener('click', () => {
  savedCountdowns.splice(index, 1);
  saveCountdowns(savedCountdowns);
  loadSavedCountdowns();
});

savedCountdownActions.appendChild(editButton);
savedCountdownActions.appendChild(deleteButton);