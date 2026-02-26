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
      label: 'Muscle Group Progress',
      data: [1, 1, 1, 1, 1, 1],
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
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {stepsize: 20}
      }
    }
  }
});


function calculateChartData() {
    const muscleGroup = document.getElementById("muscleGroup").value;
    const bodyweight = document.getElementById("bodyWeight").value;
    const weight = document.getElementById("weight").value;
    const reps = document.getElementById("reps").value;

    const relativeMuscleMultiplier = {
        "chest": 0.7,
        "back": 0.6,
        "biceps": 1.0,
        "triceps": 0.9,
        "shoulders": 1.0,
        "legs": 0.45
    };
    const estimated1RM = weight * (1 + reps / 30);
    const strengthRank = (estimated1RM / bodyweight) * 100 * relativeMuscleMultiplier[muscleGroup];
    
    // Add function if rank goes above 100 to cap it at 100

    switch(muscleGroup) {
        case "chest":
            MuscleGroups.data.datasets[0].data[0] = strengthRank;
            break;
        case "back":
            MuscleGroups.data.datasets[0].data[1] = strengthRank;
            break;
        case "biceps":
            MuscleGroups.data.datasets[0].data[2] = strengthRank;
            break;
        case "triceps":
            MuscleGroups.data.datasets[0].data[3] = strengthRank;
            break;
        case "shoulders":
            MuscleGroups.data.datasets[0].data[4] = strengthRank;
            break;
        case "legs":
            MuscleGroups.data.datasets[0].data[5] = strengthRank;
            break;
    }

    // Update the chart data
    MuscleGroups.update();

    
}