let config;


async function loadConfig() {
  const response = await fetch("../config.json");
  config = await response.json();
}

async function createChart() {
  await loadConfig(); // load config before doing anything

  const canvas = document.getElementById("MuscleGroups");
  canvas.style.display = "block";

  const bodyweight = parseFloat(document.getElementById("bodyWeight").value);

  if (!bodyweight || bodyweight <= 0) {
    alert("Please enter a valid body weight.");
    return;
  }

  const chartData = new Array(config.muscles.length).fill(0);

  config.muscles.forEach((muscle, index) => {
    const weight = parseFloat(document.getElementById(`${muscle}Weight`).value) || 0;
    const reps = parseFloat(document.getElementById(`${muscle}Reps`).value) || 0;

    if (weight > 0 && reps > 0) {
      const estimated1RM = weight * (1 + reps / 30);
      chartData[index] = Math.min(
        (estimated1RM / bodyweight) * 100 * config.relativeMuscleMultiplier[muscle],
        100
      );
    }
  });

  if (!myChart) {
    myChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: config.muscles.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
        datasets: [{
          label: "Muscle Group Progress",
          data: chartData,
          fill: true,
          backgroundColor: config.chartOptions.backgroundColor,
          borderColor: config.chartOptions.borderColor,
          pointBackgroundColor: config.chartOptions.borderColor,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: config.chartOptions.borderColor
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            min: config.chartOptions.min,
            max: config.chartOptions.max,
            ticks: { stepSize: config.chartOptions.stepSize }
          }
        }
      }
    });
  } else {
    myChart.data.datasets[0].data = chartData;
    myChart.update();
  }

  document.getElementById("statsForm").style.display = "none";
}

const ctx = document.querySelector("#MuscleGroups");