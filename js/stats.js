const ctx = document.querySelector("#MuscleGroups");


function createChart() {
  const canvas = document.getElementById("MuscleGroups");
  canvas.style.display = "block"; // Show the canvas when the chart is created
  new Chart(ctx, {
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
        data: [51, 67, 23, 45, 12, 88],
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
  })
}

function calculateChartData() {
    const muscleGroup = document.getElementById("muscleGroup").value;
    const bodyweight = document.getElementById("bodyWeight").value;
    const weight = document.getElementById("weight").value;
    const reps = document.getElementById("reps").value;

    if (!bodyweight || !weight || !reps < 0) {
      return 'error invalid input'
    }

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

    const muscleGroupIndex = {
      chest: 0,
      back: 1,
      biceps: 2,
      triceps: 3,
      shoulders: 4,
      legs: 5
    }

    if (muscleGroup in muscleGroupIndex) {
      MuscleGroups.data.datasets[0].data[muscleGroupIndex[muscleGroup]] = strengthRank;
    }


    // Update the chart data
    MuscleGroups.update();   
}