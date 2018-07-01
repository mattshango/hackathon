import React from 'react'
import { Pie } from 'react-chartjs-2'

const Clothes = ({data}) => {
  return (
    <Pie data={data} options={{
      legend: {
          display: false
      },
      tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                return `${data.labels[tooltipItem.index]}: ${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]}/1000 days worn`;
            }
        }
      }, 
    }}/>
  )
}

export default Clothes