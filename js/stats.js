const ctx = document.querySelector("#MuscleGroups");

const MuscleGroups = new Chart(ctx, {
  type: "radar",
  data: {
    labels: [
      'Chest',
      'Back',
      'Biceps',
      'Triceps',
      'Shoulders',
      'Legs',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 90, 81, 56, 55],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  },
  options: {
    responsive: true
  }
});