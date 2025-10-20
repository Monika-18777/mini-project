const form = document.getElementById('fitnessForm');
const historyList = document.getElementById('historyList');
const ctx = document.getElementById('fitnessChart').getContext('2d');

let fitnessData = JSON.parse(localStorage.getItem('fitnessData')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const steps = document.getElementById('steps').value;
  const calories = document.getElementById('calories').value;
  const water = document.getElementById('water').value;
  const sleep = document.getElementById('sleep').value;

  const entry = { steps, calories, water, sleep, date: new Date().toLocaleDateString() };
  fitnessData.push(entry);
  localStorage.setItem('fitnessData', JSON.stringify(fitnessData));

  updateHistory();
  updateChart();
  form.reset();
});

function updateHistory() {
  historyList.innerHTML = '';
  fitnessData.slice(-5).forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.date}: Steps ${entry.steps}, Calories ${entry.calories}, Water ${entry.water}L, Sleep ${entry.sleep}h`;
    historyList.appendChild(li);
  });
}

function updateChart() {
  const labels = fitnessData.map(e => e.date);
  const steps = fitnessData.map(e => e.steps);
  const calories = fitnessData.map(e => e.calories);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Steps', data: steps, borderColor: 'blue', fill: false },
        { label: 'Calories', data: calories, borderColor: 'red', fill: false }
      ]
    },
    options: { responsive: true }
  });
}

updateHistory();
updateChart();
