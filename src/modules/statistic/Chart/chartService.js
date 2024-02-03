export const data = {
  labels: ['12:00', '12:15', '12:30', '12:45', '13:00'],
  datasets: [
    {
      // label: 'Хэшрейт',
      // backgroundColor: '#2E90FA',
      data: [60,150,50,160,90,100,200,50,220],
      borderColor: '#2E90FA',
      borderWidth: 1,

      backgroundColor: (context) => {
        const bgColor = [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ];
        if(!context.chart.chartArea) {
          return;
        }

          const { ctx, data, chartArea: {top, bottom} } = context.chart;
          let gradientBg = ctx. createLinearGradient (0, top, 0, bottom);
          const colorTraches = 1 / (bgColor.length - 1)
          for (let i = 0; i < bgColor.length ; i++){
            gradientBg.addColorStop(0 + i * colorTraches, bgColor[i])
          }
          return gradientBg;
      },
      fill: {
        target: 'origin',
        above: '#dceafb',   // Area will be red above the origin
        below: 'rgb(0, 0, 255)'    // And blue below the origin
      },
    },


  ],

}
export const options = {
  responsive: true,
  plugins: {
    legend: {
        display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    },
  },
  scales: {
    x: {
      grid:{
        color: 'rgb(249 250 251)'
      }
    },
    y: {
      grid:{
        color: 'rgb(249 250 251)'
      },
      min: 0,
      max: 200,
      ticks: {
        stepSize: 50
      }
    },
  },

  tension: 0.4,
  // maintainAspectRatio: false
}
