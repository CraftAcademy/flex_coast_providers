import React from 'react'
import {
  FunnelChart,
  Tooltip,
  Funnel,
  LabelList,
  ResponsiveContainer,
} from 'recharts'

const WizardChart = ({ data }) => {
  const addsColor = (dataArr) => {
    let colors = [
      'rgba(255, 208, 156, 0.1)',
      'rgba(255, 208, 156, 0.2)',
      'rgba(255, 208, 156, 0.3)',
      'rgba(255, 208, 156, 0.4)',
      'rgba(255, 208, 156, 0.5)',
      'rgba(255, 208, 156, 0.6)',
      'rgba(255, 208, 156, 0.7)',
      'rgba(255, 208, 156, 0.8)',
      'rgba(255, 208, 156, 0.9)',
      'rgba(255, 208, 156, 1)',
    ]

    return dataArr?.map((object, index) => {
      return { ...object, fill: colors[index] }
    })
  }

  return (
    <ResponsiveContainer width={'50%'} height={350}>
      <FunnelChart >
        <Tooltip />
        <Funnel dataKey='value' data={addsColor(data)} isAnimationActive>
          <LabelList
            position='right'
            fill='#000'
            stroke='none'
            dataKey='name'
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  )
}

export default WizardChart
