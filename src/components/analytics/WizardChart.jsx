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
    return dataArr?.map((object, index) => {
      return { ...object, fill: `rgba(164, 227, 255, ${(index + 1) / 10})` }
    })
  }
  return (
    <ResponsiveContainer width='100%' height={350}>
      <FunnelChart data-cy='wizard-chart'>
        <Tooltip />
        <Funnel
          dataKey='value'
          data={addsColor(data)}
          isAnimationActive={false}>
          <LabelList
            position='right'
            fill='#333'
            stroke='none'
            dataKey='name'
            offset={5}
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  )
}

export default WizardChart
